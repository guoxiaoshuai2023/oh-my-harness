#!/usr/bin/env python3
"""Structural rule-preservation checks for router refactors.

This validator checks the traceability artifacts that can be checked
mechanically: source block coverage, rule-ledger mapping, strong-force
preservation, and duplicate coverage evidence. It is stricter than the router
fixture smoke check, but it is still not a full semantic equivalence verifier.
Human or evaluator review must still judge whether the target wording actually
preserves the original rule meaning.
"""

from __future__ import annotations

import argparse
import dataclasses
import re
import sys
from collections import Counter, defaultdict
from pathlib import Path


SOURCE_ID_RE = re.compile(r"\b[A-Z][A-Z0-9_-]*-SRC-\d+\b")
RULE_ID_RE = re.compile(r"\b[A-Z][A-Z0-9_-]*-RULE-\d+\b")
SOURCE_HEADING_RE = re.compile(r"^###\s+([A-Z][A-Z0-9_-]*-SRC-\d+)\s*$", re.MULTILINE)
RULE_HEADING_RE = re.compile(r"^###\s+([A-Z][A-Z0-9_-]*-RULE-\d+)\s*$", re.MULTILINE)
KNOWN_FORCES = ("MUST NOT", "MUST", "STOP", "SHOULD", "CONTEXT")
STRONG_FORCES = {"MUST", "MUST NOT", "STOP"}
DUPLICATE_EQUIVALENCE_TERMS = ("force", "trigger", "stop", "forbidden", "required", "safety")


@dataclasses.dataclass(frozen=True)
class SourceBlock:
    block_id: str
    force: str


@dataclasses.dataclass(frozen=True)
class CoverageRow:
    line_number: int
    source_id: str
    kind: str
    rule_id: str | None
    force: str
    rationale: str


@dataclasses.dataclass(frozen=True)
class LedgerEntry:
    rule_id: str
    source_ids: tuple[str, ...]
    original_force: str
    target_force: str
    force_preserved: str
    fidelity_judgment: str


def split_markdown_row(line: str) -> list[str]:
    raw = line.strip()
    if raw.startswith("|"):
        raw = raw[1:]
    if raw.endswith("|"):
        raw = raw[:-1]

    cells: list[str] = []
    current: list[str] = []
    escaped = False
    for char in raw:
        if char == "\\" and not escaped:
            escaped = True
            current.append(char)
            continue
        if char == "|" and not escaped:
            cells.append("".join(current).strip())
            current = []
            continue
        current.append(char)
        escaped = False
    cells.append("".join(current).strip())
    return cells


def clean_cell(cell: str) -> str:
    cleaned = cell.replace(r"\|", "|").strip()
    if cleaned.startswith("`") and cleaned.endswith("`"):
        cleaned = cleaned[1:-1]
    return cleaned.strip()


def is_separator_row(cells: list[str]) -> bool:
    return all(set(cell.strip()) <= {"-", ":", " "} for cell in cells)


def extract_force(text: str) -> str:
    upper = text.upper()
    for force in KNOWN_FORCES:
        if force in upper:
            return force
    return ""


def extract_first(pattern: re.Pattern[str], text: str) -> str | None:
    match = pattern.search(text)
    return match.group(0) if match else None


def split_heading_sections(text: str, pattern: re.Pattern[str]) -> list[tuple[str, str]]:
    matches = list(pattern.finditer(text))
    sections: list[tuple[str, str]] = []
    for index, match in enumerate(matches):
        end = matches[index + 1].start() if index + 1 < len(matches) else len(text)
        sections.append((match.group(1), text[match.end() : end]))
    return sections


def parse_snapshot(path: Path) -> dict[str, SourceBlock]:
    text = path.read_text(encoding="utf-8")
    blocks: dict[str, SourceBlock] = {}
    for block_id, section in split_heading_sections(text, SOURCE_HEADING_RE):
        force_match = re.search(r"^- Force guess:\s*`?([^`\n]+)`?\s*$", section, re.MULTILINE)
        force = extract_force(force_match.group(1) if force_match else "")
        blocks[block_id] = SourceBlock(block_id=block_id, force=force)
    return blocks


def find_table(text: str, required_headers: set[str]) -> tuple[list[str], list[tuple[int, list[str]]]]:
    lines = text.splitlines()
    for index, line in enumerate(lines):
        if not line.strip().startswith("|"):
            continue
        header = [clean_cell(cell).lower() for cell in split_markdown_row(line)]
        if not required_headers.issubset(set(header)):
            continue

        rows: list[tuple[int, list[str]]] = []
        for row_index in range(index + 1, len(lines)):
            row_line = lines[row_index]
            if not row_line.strip().startswith("|"):
                if rows:
                    break
                continue
            cells = split_markdown_row(row_line)
            if is_separator_row(cells):
                continue
            rows.append((row_index + 1, [clean_cell(cell) for cell in cells]))
        return header, rows

    return [], []


def classify_coverage(value: str) -> tuple[str, str | None]:
    lowered = value.lower()
    rule_id = extract_first(RULE_ID_RE, value)
    unresolved_template = "rule id:" in lowered and "non-normative" in lowered and "duplicate covered by" in lowered
    if unresolved_template:
        return "unresolved", rule_id
    if "duplicate covered by" in lowered and rule_id:
        return "duplicate", rule_id
    if "non-normative" in lowered:
        return "non-normative", None
    if "rule id" in lowered and rule_id:
        return "rule", rule_id
    return "unknown", rule_id


def parse_coverage(path: Path) -> tuple[list[CoverageRow], list[str]]:
    text = path.read_text(encoding="utf-8")
    header, table_rows = find_table(
        text,
        {
            "source block id",
            "classification",
            "force",
            "coverage rationale",
        },
    )
    failures: list[str] = []
    if not header:
        return [], [f"no coverage table found in {path}"]

    source_index = header.index("source block id")
    classification_index = header.index("classification")
    force_index = header.index("force")
    rationale_index = header.index("coverage rationale")

    rows: list[CoverageRow] = []
    for line_number, cells in table_rows:
        if len(cells) <= max(source_index, classification_index, force_index, rationale_index):
            failures.append(f"{path}:{line_number}: coverage row has too few columns")
            continue

        source_id = extract_first(SOURCE_ID_RE, cells[source_index])
        if not source_id:
            failures.append(f"{path}:{line_number}: missing source block ID")
            continue

        kind, rule_id = classify_coverage(cells[classification_index])
        force = extract_force(cells[force_index])
        rows.append(
            CoverageRow(
                line_number=line_number,
                source_id=source_id,
                kind=kind,
                rule_id=rule_id,
                force=force,
                rationale=cells[rationale_index],
            )
        )

    return rows, failures


def ledger_field(section: str, name: str) -> str:
    match = re.search(rf"^-\s+{re.escape(name)}:\s*(.*)$", section, re.MULTILINE)
    return match.group(1).strip() if match else ""


def parse_ledger(path: Path) -> tuple[dict[str, LedgerEntry], list[str]]:
    text = path.read_text(encoding="utf-8")
    entries: dict[str, LedgerEntry] = {}
    failures: list[str] = []

    for rule_id, section in split_heading_sections(text, RULE_HEADING_RE):
        source_field = ledger_field(section, "Source block ID(s)")
        source_ids = tuple(SOURCE_ID_RE.findall(source_field))
        original_force = extract_force(ledger_field(section, "Original force"))
        target_force = extract_force(ledger_field(section, "Target force"))
        force_preserved = ledger_field(section, "Force preserved").lower()
        fidelity_judgment = ledger_field(section, "Fidelity judgment").upper()

        if not source_ids:
            failures.append(f"{path}: {rule_id} missing Source block ID(s)")
        if not original_force:
            failures.append(f"{path}: {rule_id} missing Original force")
        if not target_force:
            failures.append(f"{path}: {rule_id} missing Target force")
        if not force_preserved:
            failures.append(f"{path}: {rule_id} missing Force preserved")
        if not fidelity_judgment:
            failures.append(f"{path}: {rule_id} missing Fidelity judgment")

        entries[rule_id] = LedgerEntry(
            rule_id=rule_id,
            source_ids=source_ids,
            original_force=original_force,
            target_force=target_force,
            force_preserved=force_preserved,
            fidelity_judgment=fidelity_judgment,
        )

    if not entries:
        failures.append(f"no ledger rule entries found in {path}")

    return entries, failures


def validate(snapshot: Path, coverage: Path, ledger: Path) -> tuple[list[str], dict[str, int]]:
    failures: list[str] = []
    source_blocks = parse_snapshot(snapshot)
    coverage_rows, coverage_failures = parse_coverage(coverage)
    ledger_entries, ledger_failures = parse_ledger(ledger)
    failures.extend(coverage_failures)
    failures.extend(ledger_failures)

    if not source_blocks:
        failures.append(f"no source blocks found in {snapshot}")

    coverage_by_source: dict[str, CoverageRow] = {}
    coverage_counts = Counter(row.source_id for row in coverage_rows)
    for source_id, count in coverage_counts.items():
        if count > 1:
            failures.append(f"source block covered more than once: {source_id}")

    for row in coverage_rows:
        coverage_by_source.setdefault(row.source_id, row)
        if row.source_id not in source_blocks:
            failures.append(f"coverage references unknown source block: {row.source_id}")
        elif source_blocks[row.source_id].force and row.force != source_blocks[row.source_id].force:
            failures.append(
                f"coverage force mismatch for {row.source_id}: "
                f"snapshot={source_blocks[row.source_id].force} coverage={row.force or 'missing'}"
            )
        if row.kind in {"unknown", "unresolved"}:
            failures.append(f"coverage row for {row.source_id} has unresolved classification")
        if not row.force:
            failures.append(f"coverage row for {row.source_id} is missing force")
        if row.kind == "non-normative" and row.force in STRONG_FORCES:
            failures.append(f"strong-force source block cannot be non-normative: {row.source_id}")

    missing_sources = sorted(set(source_blocks) - set(coverage_counts))
    for source_id in missing_sources:
        failures.append(f"source block missing from coverage: {source_id}")

    extra_sources = sorted(set(coverage_counts) - set(source_blocks))
    for source_id in extra_sources:
        failures.append(f"coverage has source block not present in snapshot: {source_id}")

    coverage_rule_ids = {row.rule_id for row in coverage_rows if row.kind == "rule" and row.rule_id}
    duplicate_rule_ids = {row.rule_id for row in coverage_rows if row.kind == "duplicate" and row.rule_id}
    ledger_rule_ids = set(ledger_entries)

    for rule_id in sorted(coverage_rule_ids - ledger_rule_ids):
        failures.append(f"coverage Rule ID missing from ledger: {rule_id}")
    for rule_id in sorted(duplicate_rule_ids - coverage_rule_ids):
        failures.append(f"duplicate target Rule ID has no primary coverage row: {rule_id}")
    for rule_id in sorted(ledger_rule_ids - coverage_rule_ids):
        failures.append(f"ledger Rule ID not referenced by primary coverage Rule ID rows: {rule_id}")

    ledger_sources_by_rule: dict[str, set[str]] = {rule_id: set(entry.source_ids) for rule_id, entry in ledger_entries.items()}
    ledger_rules_by_source: dict[str, list[str]] = defaultdict(list)
    for rule_id, entry in ledger_entries.items():
        for source_id in entry.source_ids:
            ledger_rules_by_source[source_id].append(rule_id)
            if source_id not in source_blocks:
                failures.append(f"ledger {rule_id} references unknown source block: {source_id}")
            row = coverage_by_source.get(source_id)
            if not row:
                continue
            if row.kind == "non-normative":
                failures.append(f"ledger {rule_id} references non-normative source block: {source_id}")
            elif row.rule_id != rule_id:
                failures.append(
                    f"ledger {rule_id} source mismatch for {source_id}: "
                    f"coverage maps it to {row.rule_id or row.kind}"
                )

    for row in coverage_rows:
        if row.kind not in {"rule", "duplicate"} or not row.rule_id:
            continue
        if row.source_id not in ledger_sources_by_rule.get(row.rule_id, set()):
            failures.append(f"coverage {row.source_id} -> {row.rule_id} missing from ledger Source block ID(s)")

    for source_id, rule_ids in ledger_rules_by_source.items():
        if len(rule_ids) > 1:
            failures.append(f"source block appears in multiple ledger rules: {source_id} -> {', '.join(sorted(rule_ids))}")

    for row in coverage_rows:
        if row.kind != "duplicate" or not row.rule_id:
            continue
        if row.rule_id not in ledger_entries:
            failures.append(f"duplicate source {row.source_id} references missing ledger rule: {row.rule_id}")
            continue
        rationale = row.rationale.lower()
        if not all(term in rationale for term in DUPLICATE_EQUIVALENCE_TERMS):
            failures.append(
                f"duplicate source {row.source_id} must explicitly assert equivalence across "
                "force, trigger, stop condition, forbidden action, required action, and safety boundary"
            )

    for rule_id, entry in ledger_entries.items():
        source_forces = {coverage_by_source[source_id].force for source_id in entry.source_ids if source_id in coverage_by_source}
        if source_forces and (entry.original_force not in source_forces or len(source_forces) > 1):
            failures.append(
                f"ledger {rule_id} original force does not match covered source forces: "
                f"ledger={entry.original_force or 'missing'} coverage={', '.join(sorted(source_forces))}"
            )
        if entry.original_force in STRONG_FORCES:
            if entry.target_force != entry.original_force:
                failures.append(
                    f"strong force downgraded for {rule_id}: original={entry.original_force} target={entry.target_force or 'missing'}"
                )
            if entry.force_preserved != "yes":
                failures.append(f"strong force not marked preserved for {rule_id}")
            if entry.fidelity_judgment != "PRESERVED":
                failures.append(f"strong force fidelity is not PRESERVED for {rule_id}: {entry.fidelity_judgment or 'missing'}")

    summary = {
        "source_blocks": len(source_blocks),
        "coverage_rows": len(coverage_rows),
        "ledger_rules": len(ledger_entries),
        "duplicate_rows": sum(1 for row in coverage_rows if row.kind == "duplicate"),
        "strong_rules": sum(1 for entry in ledger_entries.values() if entry.original_force in STRONG_FORCES),
    }
    return failures, summary


def main() -> int:
    parser = argparse.ArgumentParser(
        description=__doc__,
        epilog=(
            "This is a structural validator for traceability artifacts. It does "
            "not replace semantic equivalence review of the migrated wording."
        ),
    )
    parser.add_argument("--snapshot", type=Path, required=True, help="Source snapshot generated before router rewrite.")
    parser.add_argument("--coverage", type=Path, required=True, help="Source coverage manifest.")
    parser.add_argument("--ledger", type=Path, required=True, help="Rule preservation ledger.")
    args = parser.parse_args()

    failures, summary = validate(args.snapshot, args.coverage, args.ledger)
    if failures:
        for failure in failures:
            print(failure, file=sys.stderr)
        return 1

    print("rule preservation structural check passed")
    print(f"source blocks: {summary['source_blocks']}")
    print(f"coverage rows: {summary['coverage_rows']}")
    print(f"ledger rules: {summary['ledger_rules']}")
    print(f"duplicate rows: {summary['duplicate_rows']}")
    print(f"strong-force ledger rules: {summary['strong_rules']}")
    print("semantic equivalence still requires ledger/evaluator/main-thread review")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
