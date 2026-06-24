#!/usr/bin/env python3
"""Create source snapshot and coverage draft artifacts for an AGENTS.md file."""

from __future__ import annotations

import argparse
import dataclasses
import datetime as dt
import hashlib
import re
from pathlib import Path


HEADING_RE = re.compile(r"^(#{1,6})\s+(.+?)\s*$")
LIST_RE = re.compile(r"^\s*(?:[-*+]|\d+[.)])\s+")
FENCE_RE = re.compile(r"^\s*(```|~~~)")
TABLE_RE = re.compile(r"^\s*\|.*\|\s*$")


@dataclasses.dataclass(frozen=True)
class Block:
    block_id: str
    kind: str
    heading_context: str
    text: str
    force: str


def sha256_text(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def is_heading(line: str) -> bool:
    return bool(HEADING_RE.match(line))


def is_list_item(line: str) -> bool:
    return bool(LIST_RE.match(line))


def is_fence(line: str) -> bool:
    return bool(FENCE_RE.match(line))


def is_table_row(line: str) -> bool:
    return bool(TABLE_RE.match(line))


def force_guess(text: str) -> str:
    normalized = " ".join(text.strip().split())
    upper = normalized.upper()
    if re.search(r"(^|\n)\s*-?\s*STOP\b", upper) or re.search(r"\bMUST\s+STOP\b|\bSTOP\s+(BEFORE|IF)\b", upper):
        return "STOP"
    if any(token in upper for token in ("MUST NOT", "DO NOT", "NEVER", "FORBIDDEN", "PROHIBITED")):
        return "MUST NOT"
    if any(token in upper for token in ("MUST", "REQUIRED", "REQUIRE ", "REQUIRES ")):
        return "MUST"
    if any(token in upper for token in ("SHOULD", "PREFER", "RECOMMENDED")):
        return "SHOULD"
    return "CONTEXT"


def update_heading_stack(stack: list[tuple[int, str]], marker: str, title: str) -> list[tuple[int, str]]:
    level = len(marker)
    stack = [(existing_level, existing_title) for existing_level, existing_title in stack if existing_level < level]
    stack.append((level, title.strip()))
    return stack


def heading_context(stack: list[tuple[int, str]]) -> str:
    return " > ".join(title for _, title in stack) if stack else "(root)"


def collect_paragraph(lines: list[str], start: int) -> tuple[str, int]:
    parts: list[str] = []
    index = start
    while index < len(lines):
        line = lines[index]
        if not line.strip():
            break
        if is_heading(line) or is_list_item(line) or is_fence(line) or is_table_row(line):
            break
        parts.append(line.rstrip())
        index += 1
    return "\n".join(parts), index


def collect_list_item(lines: list[str], start: int) -> tuple[str, int]:
    parts = [lines[start].rstrip()]
    index = start + 1
    while index < len(lines):
        line = lines[index]
        if not line.strip():
            break
        if is_heading(line) or is_fence(line) or is_list_item(line):
            break
        parts.append(line.rstrip())
        index += 1
    return "\n".join(parts), index


def collect_fence(lines: list[str], start: int) -> tuple[str, int]:
    parts = [lines[start].rstrip()]
    fence = FENCE_RE.match(lines[start]).group(1)  # type: ignore[union-attr]
    index = start + 1
    while index < len(lines):
        parts.append(lines[index].rstrip())
        if lines[index].strip().startswith(fence):
            index += 1
            break
        index += 1
    return "\n".join(parts), index


def parse_blocks(text: str, prefix: str) -> list[Block]:
    lines = text.splitlines()
    blocks: list[Block] = []
    stack: list[tuple[int, str]] = []
    index = 0

    def add_block(kind: str, content: str) -> None:
        if not content.strip():
            return
        block_id = f"{prefix}-{len(blocks) + 1:04d}"
        blocks.append(
            Block(
                block_id=block_id,
                kind=kind,
                heading_context=heading_context(stack),
                text=content.rstrip(),
                force=force_guess(content),
            )
        )

    while index < len(lines):
        line = lines[index]
        if not line.strip():
            index += 1
            continue

        heading_match = HEADING_RE.match(line)
        if heading_match:
            stack = update_heading_stack(stack, heading_match.group(1), heading_match.group(2))
            add_block("heading", line.rstrip())
            index += 1
            continue

        if is_fence(line):
            content, index = collect_fence(lines, index)
            add_block("code", content)
            continue

        if is_list_item(line):
            content, index = collect_list_item(lines, index)
            add_block("list-item", content)
            continue

        if is_table_row(line):
            add_block("table-row", line.rstrip())
            index += 1
            continue

        content, next_index = collect_paragraph(lines, index)
        add_block("paragraph", content)
        index = max(next_index, index + 1)

    return blocks


def fenced(text: str) -> str:
    return f"````text\n{text}\n````"


def table_escape(text: str) -> str:
    return " ".join(text.replace("|", r"\|").split())


def render_snapshot(source_path: Path, source_text: str, blocks: list[Block]) -> str:
    captured_at = dt.datetime.now(dt.timezone.utc).isoformat()
    lines = [
        f"# AGENTS.md Source Snapshot - {captured_at[:10]}",
        "",
        "## Snapshot Metadata",
        "",
        f"- Source path: `{source_path}`",
        f"- SHA-256: `{sha256_text(source_text)}`",
        f"- Captured at: `{captured_at}`",
        f"- Source block count: `{len(blocks)}`",
        "",
        "## Source Blocks",
        "",
    ]
    for block in blocks:
        lines.extend(
            [
                f"### {block.block_id}",
                "",
                f"- Type: `{block.kind}`",
                f"- Heading context: `{block.heading_context}`",
                f"- Force guess: `{block.force}`",
                "- Original excerpt:",
                fenced(block.text),
                "",
            ]
        )
    return "\n".join(lines).rstrip() + "\n"


def render_coverage(source_path: Path, source_text: str, blocks: list[Block]) -> str:
    today = dt.datetime.now(dt.timezone.utc).date().isoformat()
    lines = [
        f"# Source Coverage Manifest Draft - {today}",
        "",
        f"This draft covers source blocks from `{source_path}`.",
        "",
        "## Coverage Summary",
        "",
        f"- Source SHA-256: `{sha256_text(source_text)}`",
        f"- Source block rows: `{len(blocks)}`",
        "- Rule ID rows: `TBD`",
        "- Non-normative rows: `TBD`",
        "- Duplicate coverage rows: `TBD`",
        "- Duplicate coverage policy: fill before rewriting the router.",
        "",
        "## Coverage Rows",
        "",
        "| Source block ID | Original heading/context | Original excerpt | Classification | Force | Coverage rationale |",
        "| --- | --- | --- | --- | --- | --- |",
    ]
    for block in blocks:
        lines.append(
            "| `{}` | {} | {} | TBD | `{}` | TBD |".format(
                block.block_id,
                table_escape(block.heading_context),
                table_escape(block.text[:180]),
                block.force,
            )
        )
    return "\n".join(lines).rstrip() + "\n"


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source", type=Path, help="Path to AGENTS.md or another Markdown instruction file.")
    parser.add_argument("--snapshot", type=Path, help="Write a source snapshot Markdown artifact.")
    parser.add_argument("--coverage", type=Path, help="Write a source coverage draft Markdown artifact.")
    parser.add_argument("--prefix", default="AGENTS-SRC", help="Source block ID prefix.")
    args = parser.parse_args()

    source_text = args.source.read_text(encoding="utf-8")
    blocks = parse_blocks(source_text, args.prefix)

    if args.snapshot:
        args.snapshot.parent.mkdir(parents=True, exist_ok=True)
        args.snapshot.write_text(render_snapshot(args.source, source_text, blocks), encoding="utf-8")

    if args.coverage:
        args.coverage.parent.mkdir(parents=True, exist_ok=True)
        args.coverage.write_text(render_coverage(args.source, source_text, blocks), encoding="utf-8")

    if not args.snapshot and not args.coverage:
        print(render_snapshot(args.source, source_text, blocks), end="")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
