# Task 2 Reopened Boundary v7 Read-Only Recovery Addendum

Identity: `adaptive-main-thread-orchestration-task-2-contract-20260712-v7`

This addendum incorporates v4/v5/v6 and resolves review v3 SHA `dced5686a7ae55e314924619752108862269364fbbfeba150af0c76258bd2d4e`.

For the recovery cycle, the four candidate files and their hashes recorded in v6 are strictly read-only. The producer has zero implementation write authority. It may only verify the new launch baseline, current candidate bytes, T2R-AC1 through T2R-AC11, validations, and protected state, then return a fresh report.

Any candidate hash mismatch or newly perceived content defect requires immediate `STOP` and return to the main-thread boundary owner. The producer must not diagnose a replacement design, edit a candidate, normalize content, or repair any file under v7.

The only authorized repository writes in this cycle are main-thread gate artifacts: launch baseline v2, producer report v2, Result QA v2, and conditional main-thread acceptance. All v6 baseline requirements, Task 1 evidence rows, calibration binding, fresh independent QA, and Task 3 block remain unchanged.
