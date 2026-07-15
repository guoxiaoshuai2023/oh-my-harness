#!/usr/bin/env python3
"""Validate tracked repository paths without exposing matched content."""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path, PurePosixPath
import re
import stat
import subprocess
import sys


LOCAL_PATH_PATTERNS = (
    re.compile(r"/Users/[^/\s]+/"),
    re.compile(r"/home/[^/\s]+/"),
    re.compile(r"[A-Za-z]:\\Users\\[^\\\s]+\\"),
    re.compile(r"/private/var/folders/[^\s]+"),
)


@dataclass(frozen=True, order=True)
class Finding:
    rule_id: str
    path: str


def is_public_surface(path: str) -> bool:
    return (
        path in {"README.md", "AGENTS.md"}
        or path.startswith("docs/")
        or path.startswith("task-docs/_harness/")
        or path.startswith("examples/")
        or path.startswith(".codex/agents/")
    )


def evaluate(root: Path, tracked_paths: list[str]) -> list[Finding]:
    findings: set[Finding] = set()
    for relative_path in tracked_paths:
        path = PurePosixPath(relative_path)
        if path.is_absolute() or ".." in path.parts:
            continue

        if relative_path.startswith("task-docs/history/"):
            findings.add(Finding("RH001", relative_path))
        if relative_path.startswith("task-docs/work/"):
            findings.add(Finding("RH002", relative_path))
        if len(path.parts) == 2 and path.parts[0] == "task-docs" and path.suffix == ".md":
            findings.add(Finding("RH003", relative_path))

        if not is_public_surface(relative_path):
            continue
        candidate = root.joinpath(*path.parts)
        try:
            if not stat.S_ISREG(candidate.lstat().st_mode):
                findings.add(Finding("RH004", relative_path))
                continue
            data = candidate.read_bytes()
        except OSError:
            findings.add(Finding("RH004", relative_path))
            continue
        if b"\0" in data:
            continue
        text = data.decode("utf-8", errors="ignore")
        if any(pattern.search(text) for pattern in LOCAL_PATH_PATTERNS):
            findings.add(Finding("RH004", relative_path))

    return sorted(findings)


def tracked_paths(root: Path) -> list[str]:
    completed = subprocess.run(
        ["git", "-C", str(root), "ls-files", "-z"],
        check=True,
        capture_output=True,
    )
    return sorted(path for path in completed.stdout.decode().split("\0") if path)


def render(findings: list[Finding]) -> str:
    if not findings:
        return "repository hygiene checks passed (RH001-RH004)"
    return "\n".join(f"{finding.rule_id} {finding.path}" for finding in findings)


def main() -> int:
    root = Path(
        subprocess.check_output(
            ["git", "rev-parse", "--show-toplevel"],
            text=True,
        ).strip()
    )
    findings = evaluate(root, tracked_paths(root))
    print(render(findings))
    return 1 if findings else 0


if __name__ == "__main__":
    sys.exit(main())
