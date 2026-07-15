from __future__ import annotations

import importlib.util
from pathlib import Path
import sys
import tempfile
import unittest


ROOT = Path(__file__).resolve().parents[2]
SPEC = importlib.util.spec_from_file_location(
    "check_repository_hygiene",
    ROOT / "tools/check_repository_hygiene.py",
)
assert SPEC and SPEC.loader
CHECKER = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = CHECKER
SPEC.loader.exec_module(CHECKER)


class RepositoryHygieneTest(unittest.TestCase):
    def test_rules_use_only_tracked_paths_and_fixed_public_surfaces(self):
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            files = {
                "task-docs/history/run/report.md": "run",
                "task-docs/work/note.md": "work",
                "task-docs/one-off-plan.md": "plan",
                "docs/public.md": "machine path /Users/private-name/project",
                "src/internal.md": "machine path /Users/ignored/project",
                "task-docs/work/untracked.md": "not passed to checker",
            }
            for name, content in files.items():
                path = root / name
                path.parent.mkdir(parents=True, exist_ok=True)
                path.write_text(content, encoding="utf-8")

            tracked = [name for name in files if name != "task-docs/work/untracked.md"]
            findings = CHECKER.evaluate(root, tracked)
            self.assertEqual(
                [(finding.rule_id, finding.path) for finding in findings],
                [
                    ("RH001", "task-docs/history/run/report.md"),
                    ("RH002", "task-docs/work/note.md"),
                    ("RH003", "task-docs/one-off-plan.md"),
                    ("RH004", "docs/public.md"),
                ],
            )

    def test_rh004_output_never_contains_matched_content(self):
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            path = root / "README.md"
            path.write_text("private marker /Users/do-not-print/project", encoding="utf-8")
            findings = CHECKER.evaluate(root, ["README.md"])
            output = CHECKER.render(findings)
            self.assertEqual(output, "RH004 README.md")
            self.assertNotIn("do-not-print", output)
            self.assertNotIn("/Users/", output)

    def test_clean_tracked_tree_passes(self):
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            path = root / "task-docs/_harness/protocol.md"
            path.parent.mkdir(parents=True)
            path.write_text("portable protocol", encoding="utf-8")
            findings = CHECKER.evaluate(root, ["task-docs/_harness/protocol.md"])
            self.assertEqual(CHECKER.render(findings), "repository hygiene checks passed (RH001-RH004)")

    def test_public_surface_symlink_is_not_followed(self):
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            outside = root / "outside.txt"
            outside.write_text("/Users/do-not-read/project", encoding="utf-8")
            docs = root / "docs"
            docs.mkdir()
            (docs / "linked.md").symlink_to(outside)
            findings = CHECKER.evaluate(root, ["docs/linked.md"])
            self.assertEqual(CHECKER.render(findings), "RH004 docs/linked.md")


if __name__ == "__main__":
    unittest.main()
