# Task 3 Contract Review v6 Disposition

Identity: `universal-harness-adoption-task-3-contract-review-disposition-20260713-v6`

Decision: `ACCEPT FINDING; REVISE VALIDATION ONLY`

The main thread independently reproduced the CLI behavior and inspected the shell sequence. The finding is supported: the no-argument CLI returns exit 2 with an exact usage line on stderr and empty stdout, but Contract v6 does not freeze that observable contract. Its temporary README block also allows a later successful cleanup check to mask an earlier failed assertion.

Failure classification: `contract ambiguity / insufficiently discriminating validation`. This is not a requirements or Plan v5 gap, does not require a candidate-document change, and does not authorize implementation writes or Task 4.

Revision boundary:

- retain all closed v6 authority, AC, routes, dependency bindings, zero-write scope, launch-baseline requirement, mapped-source impact, and downstream-chain requirements;
- add the exact CLI command and expected `exit=2`, empty stdout, and exact stderr usage line;
- run generated README and CLI assertions in a fail-fast subshell, always clean the owned OS temporary directory, verify cleanup, and propagate either validation or cleanup failure;
- introduce no other requirement, path, implementation preference, or workflow stage.
