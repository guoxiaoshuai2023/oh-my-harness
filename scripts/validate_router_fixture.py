#!/usr/bin/env python3
"""Smoke/coverage check for router trigger, route, and ledger-rule mentions.

This is not a semantic equivalence verifier and is not proof of rule
preservation, force preservation, duplicate equivalence, evaluator review, or
main-thread review.
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path


RULE_RE = re.compile(r"^###\s+([A-Z][A-Z0-9_-]*-RULE-\d+)\s*$", re.MULTILINE)


def split_markdown_row(line: str) -> list[str]:
    raw = line.strip()
    if raw.startswith("|"):
        raw = raw[1:]
    if raw.endswith("|"):
        raw = raw[:-1]
    return [cell.strip() for cell in raw.split("|")]


def clean_cell(cell: str) -> str:
    cell = cell.strip()
    if cell.startswith("`") and cell.endswith("`"):
        cell = cell[1:-1]
    return cell.strip()


def extract_router_rows(router_text: str) -> list[tuple[str, str]]:
    lines = router_text.splitlines()
    rows: list[tuple[str, str]] = []
    in_table = False

    for line in lines:
        if not line.strip().startswith("|"):
            if in_table:
                break
            continue

        cells = split_markdown_row(line)
        normalized = [cell.lower() for cell in cells]

        if "trigger" in normalized and "route" in normalized:
            in_table = True
            continue

        if not in_table:
            continue

        if all(set(cell) <= {"-", ":", " "} for cell in cells):
            continue

        if len(cells) < 2:
            continue

        trigger = clean_cell(cells[0])
        route = clean_cell(cells[1])
        if trigger and route:
            rows.append((trigger, route))

    return rows


def extract_rules(ledger_text: str) -> list[str]:
    return sorted(set(RULE_RE.findall(ledger_text)))


def validate(router: Path, fixture: Path, ledger: Path | None) -> list[str]:
    router_text = router.read_text(encoding="utf-8")
    fixture_text = fixture.read_text(encoding="utf-8")
    router_rows = extract_router_rows(router_text)
    failures: list[str] = []

    if not router_rows:
        failures.append(f"no routing table rows found in {router}")
        return failures

    base = router.parent
    for trigger, route in router_rows:
        if trigger not in fixture_text:
            failures.append(f"missing trigger in fixture: {trigger}")
        if route not in fixture_text:
            failures.append(f"missing route in fixture: {route}")
        route_path = (base / route).resolve()
        if not route_path.exists():
            failures.append(f"route path does not exist: {route}")

    if ledger:
        ledger_text = ledger.read_text(encoding="utf-8")
        for rule in extract_rules(ledger_text):
            if rule not in fixture_text:
                failures.append(f"missing ledger rule in fixture: {rule}")

    return failures


def main() -> int:
    parser = argparse.ArgumentParser(
        description=__doc__,
        epilog=(
            "This smoke/coverage check confirms string/path mentions only. "
            "It does not replace rule ledger review, force preservation review, "
            "duplicate equivalence judgment, evaluator review, or main-thread review."
        ),
    )
    parser.add_argument("--router", type=Path, default=Path("AGENTS.md"))
    parser.add_argument("--fixture", type=Path, required=True)
    parser.add_argument("--ledger", type=Path)
    args = parser.parse_args()

    failures = validate(args.router, args.fixture, args.ledger)
    if failures:
        for failure in failures:
            print(failure, file=sys.stderr)
        return 1

    print(
        "router fixture smoke/coverage check passed; this is not semantic "
        "equivalence or rule-preservation proof"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
