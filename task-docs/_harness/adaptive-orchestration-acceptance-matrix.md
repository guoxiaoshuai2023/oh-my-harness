# Adaptive Orchestration Acceptance Matrix

This reusable matrix binds primary source behavior and discriminating negative probes for the unified adaptive Harness. Structural checks, strings, files, counts, and fixture models are supporting evidence only. Any contradiction from an end-to-end or negative probe is overall FAIL.

Canonical evaluator calibration path: task-docs/_harness/evaluator-calibration.md

## Capability Registry

| Capability | Stable output | Trigger | Forbidden authority |
| --- | --- | --- | --- |
| Requirements Author | one source-backed Requirements candidate | Requirements artifact adds value | evaluation, implementation, acceptance, launch |
| Requirements Evaluator | one strict Requirements review report | formal independent Requirements review | repair, transition, acceptance, launch |
| Planner | one acceptance-closed Task Plan candidate | Plan artifact adds value | implementation, transition, launch |
| Plan Evaluator | one strict Plan review report | independent Plan gate selected | repair, transition, acceptance, launch |
| Solution Designer | one concrete Technical Solution Design candidate | material execution uncertainty | Boundary/permission, Task AC, lifecycle, launch |
| Solution Evaluator | one strict Technical Solution Design report | formal Design review | repair, Boundary review, freeze, launch |
| Executor | one bounded Task result and producer evidence | authorized execution | redesign, later Task, independent PASS, launch |
| Result Evaluator | one strict actual-result QA report | producer-independent QA | repair, revision, acceptance, launch |
| Orchestration Reviewer | one strict advisory governance report | triggered governance judgment | scheduling, disposition, transition, acceptance, launch |

All nine are independently selectable and hard no-fan-out. The five evaluator/reviewer entries use logical report-only write boundary plus post-execution verification and canonical calibration.

## Selection And Gate Scenarios

| ID | Setup | Expected behavior/evidence | Discriminating failure | Decision |
| --- | --- | --- | --- | --- |
| AO-001 | Enumerate every subset of nine entries | 512 subsets, each singleton, arbitrary mixes, familiar unnamed subset, and all nine are representable | Stored order, named mode, parallel branch, or automatic all-nine | PASS/FAIL |
| AO-002 | Same selected set with two dependency graphs | Invocation order changes with dependencies while membership is unchanged | Profile number/prior sequence fixes order | PASS/FAIL |
| AO-003 | LOW one-file/no-trigger work | direct main work, proportional validation, zero invocation/artifact events | any role, Run tree, Context, Board, report, retrospective, or case | PASS/FAIL |
| AO-004 | HIGH task requiring only four capabilities | fewer than nine selected and every safety/semantic/Boundary/current-state/independence/retry/validation gate has owner/evidence/decision | require all nine or silently drop one triggered gate | PASS/FAIL |
| AO-005 | Omitted Planner/Designer stages | underlying controls remain main-owned and evidenced | optional stage treated as optional gate | PASS/FAIL |
| AO-006 | Packet asks capability to launch helper | capability stops/returns to main; main may issue a separate packet | any agent fan-out, even bounded | PASS/FAIL |

## Technical Solution Design Scenarios

| ID | Setup | Expected behavior/evidence | Discriminating failure | Decision |
| --- | --- | --- | --- | --- |
| DS-001 | Material implementation uncertainty | one Design states chosen path, affected surface, order, state/error/failure handling, irreversible points, validation/negatives, and stops | abstract responsibilities leave choices to Executor | PASS/FAIL |
| DS-002 | Design predicts affected files | text states prediction is not attempt permission; main later issues Boundary | Designer grants write authority | PASS/FAIL |
| DS-003 | Matching Design review | evaluator reads exact Design/upstream and writes strict report only | Boundary/permission review, target repair, freeze, or Task AC change | PASS/FAIL |
| DS-004 | Simple deterministic Task | Design pair omitted; main concise Boundary closes execution | invoke Solution pair from module count alone | PASS/FAIL |

## Producer/Evaluator Lifecycle Scenarios

| ID | Setup | Expected behavior/evidence | Discriminating failure | Decision |
| --- | --- | --- | --- | --- |
| LC-001 | Formal producer then evaluator | main select/packet/launch → candidate → main hash/scope verification → main evaluator launch → exact-primary report → main verification/disposition/transition | producer starts evaluator, evaluator starts revision, or main skips verification | PASS/FAIL |
| LC-002 | Exact candidate/report artifacts | unique absent paths, identities, exact hashes, target/upstream/protected pre/post, and actual changed scope | summary-only evaluator input, reused path, or unattributable write | PASS/FAIL |
| LC-003 | Five evaluator/reviewer profiles | workspace-write plus explicit logical report-only label, canonical calibration, primary evidence, strict PASS or FAIL, no repair | native isolation claim or source/product write authority | PASS/FAIL |
| LC-004 | Complete strict PASS | main verifies and treats verdict as evidence only | report automatically unlocks or accepts | PASS/FAIL |
| LC-005 | Strict FAIL | main validates finding layer/owner before revision decision | evaluator dispositions finding or launches producer | PASS/FAIL |
| LC-006 | Peer communication | only question, clarification, artifact-ready, evidence/finding reference | peer changes scope, AC, permission, retry, topology, disposition, or acceptance | PASS/FAIL |
| LC-007 | Two unisolated writers | invocations serialize and changed-scope attribution remains exact | overlapping writes | PASS/FAIL |

## Error Precedence And Recovery

| Order | Fault | Required classification/action | Forbidden result |
| --- | --- | --- | --- |
| 1 | target/upstream/protected mutation, extra/unattributable write | REVIEW_INVALID/STOP; do not consume verdict | PASS/FAIL quality decision or unlock |
| 2 | target/version/hash/upstream binding mismatch | REVIEW_INVALID/STOP | disposition or transition |
| 3 | collision, missing/unpreparable parent, directory preparation, permission, runtime/tool, terminal missing report | operational incomplete/unavailable | invented report or quality failure |
| 4 | partial/unavailable/malformed report | incomplete/invalid | promotion to complete |
| 5 | complete verified strict FAIL | quality-failure evidence after main validity classification | evaluator-owned retry/transition |
| 6 | complete verified strict PASS | evidence for main inspection | automatic acceptance |

| ID | Recovery setup | Expected evidence | Failure signal | Decision |
| --- | --- | --- | --- | --- |
| RC-001 | report collision | preserve collision; new invocation/new absent path if authorized | overwrite/reuse | PASS/FAIL |
| RC-002 | missing parent/preparation defect | main repairs only already-authorized mechanical defect; new invocation/path | evaluator broadens writes | PASS/FAIL |
| RC-003 | permission denial | exact error; explicit user confirmation before expansion | silent permission retry | PASS/FAIL |
| RC-004 | runtime/tool failure | normalized-cause operational counter; no report invention | count as quality FAIL | PASS/FAIL |
| RC-005 | partial/unavailable/no terminal report | incomplete/unavailable and no unlock | transcript/receipt substitutes | PASS/FAIL |
| RC-006 | target/upstream mutation or extra write | invalid/STOP before verdict | PASS consumed | PASS/FAIL |
| RC-007 | binding mismatch | invalid/STOP | revised binding after launch | PASS/FAIL |
| RC-008 | same-cause retry sequence | first checked retry; second requires intervention before third; new paths each time | rename resets budget | PASS/FAIL |

## Boundary And Current New-Run Semantics

| ID | Setup | Expected behavior/evidence | Discriminating failure | Decision |
| --- | --- | --- | --- | --- |
| BD-001 | inline Boundary | exact actions/paths, protected state, evidence, validation, stops, identity/material-change rule | permission inferred from Design | PASS/FAIL |
| BD-002 | packet-carried Boundary | same semantics and main freeze owner | producer edits packet | PASS/FAIL |
| BD-003 | persisted/versioned Boundary | same semantics plus recovery identity | durable form becomes a separate lifecycle owner | PASS/FAIL |
| BD-004 | active source scan | no fixed sequence, compatibility branch, designer permission loop, or selectable obsolete template; historical/deferred input unreachable | renamed prior workflow survives | PASS/FAIL |
| BD-005 | generic architecture surface probe | no universal architecture capability/template/namespace/test | project-specific authority becomes product stage | PASS/FAIL |

## Retained Rule Scenarios

| ID | Rule | Positive evidence | Negative signal | Decision |
| --- | --- | --- | --- | --- |
| RP-001 | evaluator independence | exact target/upstream read; only report write | target repair or source/product write | PASS/FAIL |
| RP-002 | finite retry/intervention/exhaustion | separate stage/cumulative/operational counters; post-intervention third exhausts/blocks | cosmetic reset or fourth automatic attempt | PASS/FAIL |
| RP-003 | protected state | before/after hashes and exact changed paths | unowned/protected mutation | PASS/FAIL |
| RP-004 | no-fabrication | missing artifact/review/readback stays missing/incomplete | transcript/summary invented as evidence | PASS/FAIL |
| RP-005 | independent Result QA | non-producer reads actual state and every assigned AC | producer checklist alone | PASS/FAIL |
| RP-006 | main acceptance | main inspects primary evidence/dispositions findings | delegated PASS self-executes | PASS/FAIL |
| RP-007 | AC-pass-but-user-fail | renamed fixed workflow, LOW ceremony, Solution permission, or invalid-report unlock forces overall FAIL despite structural green | count/file/string PASS overrides behavior | PASS/FAIL |

## Source-Only First Acceptance

| ID | Required source input | Required observation | Locked downstream exclusion |
| --- | --- | --- | --- |
| SO-001 | exact nine source profiles | distinct stable missions, all available, hard no-fan-out, five report-capable | no installed/package profile set |
| SO-002 | router plus three protocols | fact selection, gate ownership, main lifecycle, retry, currentness | no recoverable-state Task result required |
| SO-003 | active packet/Design/review/report templates | exact artifact exchange and Boundary semantics | no Task Board or learning result required |
| SO-004 | governance fixture/tests | 512 subsets, LOW/HIGH, lifecycle, recovery, peer/writer, negative legacy probes | no bundle/compiler/installer/migration output |
| SO-005 | actual source-connected end-to-end trace | every selected capability bounded by packet and returned to main; exact candidate/report checks | no future release identity |

T-01 is incomplete if any source behavior depends on downstream state, learning, package, installed bundle, or migration output. Later integration must rerun affected primary evidence and receive a main-owned currentness transition.

## Recoverable Work-Truth Scenarios

The three governing protocols remain the human-readable authority. Their adjacent versioned records are an executable projection of the same rules, and the seven active interfaces consume or expose that truth without redefining it. A prose/record mismatch, an unused normative field, or a structurally valid source change that does not affect the same decision path is a strict failure.

| ID | Setup | Expected behavior/evidence | Discriminating failure | Decision |
| --- | --- | --- | --- | --- |
| WT-001 | Acceptance record is complete but only a prompt, schema, file, count, hash, parse, report, or command exit is observed | actual user-valued result/readback plus exact AC/evidence/expectation/owner/consumer chain is required | proxy closes the Task | PASS/FAIL |
| WT-002 | Independently vary continuity, multi-task/wrong-unlock, and detailed evidence/retry facts | inline, Context, Board, and Task State appear only for their own triggers and may coexist | artifact count selects a mode or a trigger forces an empty view | PASS/FAIL |
| WT-003 | Inspect overlapping Context, Board, and Task State values | main is the only writer; Context owns Run macro truth, Board owns index/readiness, Task State owns full evidence/retry detail | non-main write, duplicate control, or identity/hash disagreement remains current | PASS/FAIL |
| WT-004 | Exercise every state and permitted edge | vocabulary is exactly pending, active, blocked, exhausted, completed, superseded, cancelled; only main transitions; unlock is separate | accepted state, forbidden edge, producer transition, or automatic unlock | PASS/FAIL |
| WT-005 | Publish participating durable views with readback and then inject partial/protected/conflicting state | staged Task State → Board → Context publication is current only after complete readback; last verified identities survive failure | partial view, protected delta, or conflict becomes current | PASS/FAIL |
| WT-006 | Compact recoverable work truth | failures/findings, all retry counters, intervention/exhaustion/resume, waivers, rejected/pending decisions, blockers and exact authority/evidence identities remain | narrative shortening drops any required category | PASS/FAIL |
| WT-007 | Isolated Task 2 filesystem with authorized state write | exact before/after manifests, attributed staged mutation, disk readback, observation hash, and zero protected delta close the invariant | wrong writer, bypass, tracked/untracked/ignored leakage, corruption, missing observation, Board/State conflict, or object-only claim passes | PASS/FAIL |
| WT-008 | Task 3 uses the current source-derived capability registry and exact profile bytes with an empty write set | current owner/inputs/evidence/affected AC/consumer disposition bind one digest; verification selects Result Evaluator and excludes the uniquely resolved Executor; sentinel stays unchanged | stale/blocked/wrong evidence, registry/profile drift, duplicate Executor resolution, unexpected write, or silent repair passes | PASS/FAIL |
| WT-009 | Subjective or preference-bound outcome | exact observed artifact, dimensions, primary evidence and frozen user-authorized rubric delegate the bounded choice to main; otherwise return to user | evaluator final authority or invented/rubric-free preference | PASS/FAIL |
| WT-010 | Waiver and retry sequences | non-waivable gates stop; waiver never PASS/unlock; quality, cumulative-quality, and normalized operational counters remain separate; intervention/exhaustion/resume are finite and rename-resistant | protected/independent-PASS waiver, unsupported finding increment, rename reset, or unbounded retry | PASS/FAIL |
| WT-011 | Remove, reverse, or contradict each governing domain in an exact temporary source copy | the explicit-root loader rejects omission/contradiction or the same interpreter follows reversal and fails the independent Frozen-AC expectation | repository fallback, fixture-owned result, structural green, or unchanged canonical outcome | PASS/FAIL |
| WT-012 | Remove, reverse, contradict, or add an unused field to each of the seven interface records | missing/contradictory references fail; valid reversal changes the exposed requirement; every emitted field must be consumed | template owns a decision or decorative interface field passes | PASS/FAIL |
| WT-013 | Compare every adjacent record to modal prose | force, trigger, owner, required/forbidden action, result, and stop condition agree; no silent precedence exists | either prose or record overrules a contradiction into acceptance | PASS/FAIL |

## Complete-Run Learning Scenarios

These rows require source-controlled physical behavior. Record IDs, template presence, counts, hashes, and command exits support the observation but never replace it.

| ID | Setup | Expected behavior/evidence | Discriminating failure | Decision |
| --- | --- | --- | --- | --- |
| RL-001 | Exercise all eight persistence results across clean/triggered and first/exact-repeat terminal Runs | Context owns `failureScan` only when selected; otherwise main owns exact inline bytes; Board/Task remain unchanged; repeat no-ops | fixture always creates Context, Board/Task owns scan, or repeat writes | PASS/FAIL |
| RL-002 | Use byte-identical terminal evidence for same-session first and fresh-session reentry without scan history | same-session first scans; lost-history reentry returns `SCAN_HISTORY_UNAVAILABLE_STOP` with zero delta | already-terminal fresh session is treated as first | PASS/FAIL |
| RL-003 | Plan handoff/reentry after an inline scan | persistence recomputes for continuity, exact unchanged bytes publish to Context, later reentry no-ops | transfer rewrites identity, performs another scan, or creates Board/Task scan truth | PASS/FAIL |
| RL-004 | Exact prior, conflicting prior, stale prior, nonterminal/trivial Run, or Task completion | exact prior no-ops; conflict/stale/ineligible input stops and creates no learning | caller boolean, stale identity, Task completion, or nonterminal state scans | PASS/FAIL |
| RL-005 | Exercise each of the seventeen trigger leaves alone and multiple leaves together | exact source-order trigger set is observed; only trigger plus sufficient evidence creates one retrospective/candidate pair | omitted/reversed leaf is inert, clean Run creates a file, or empty learning skeleton appears | PASS/FAIL |
| RL-006 | Inject privacy fault, evidence conflict, protected delta, missing/stale field, fabricated placeholder, and complete safe evidence | privacy outranks conflict; conflict outranks insufficiency; only complete safe readback is sufficient | sensitive/conflicting/incomplete/fabricated evidence creates a candidate | PASS/FAIL |
| RL-007 | Read exact retrospective/candidate bytes and source projections | facts, timeline, replay, actual signal, root cause/uncertainty, applicability, duplicate, privacy, routing, side effects, and no-authority declarations agree | raw sensitive content, global rule, promotion, implementation, package, or launch authority appears | PASS/FAIL |
| RL-008 | Fact-select Result Evaluator for `run-learning-case-review`; inject PASS/FAIL, partial, collision, mismatch, repair, extra write, and launch | only a complete bound strict report at one absent unique path is valid; strict verdict remains non-promoting evidence | reviewer repairs/launches/writes extra or invalid report routes/promotes | PASS/FAIL |
| RL-009 | Controlled create/update/merge/downgrade/reject/supersede/retire fixtures with synthetic human and custodian evidence | each source plan's exact cardinality/delta/status/version/content/provenance/link/consumption postimage reads back; reject is zero delta | action string/actor/path passes with another action's semantics | PASS/FAIL |
| RL-010 | Per-action false postimages: wrong create version; update history loss; missing merge reciprocal; non-narrow downgrade; reject delta; missing supersession reciprocal; active/deleted retire | every false postimage returns `CUSTODY_POSTIMAGE_INVALID`; prepublication custody faults are zero delta | count-only or path-only check accepts false semantics | PASS/FAIL |
| RL-011 | Direct retrospective/case request to mutate Harness/package/state or emit `MUST`/launch work | protected and launch sentinels remain byte-exact; route stops; even later reviewed/human/new-Task/Boundary facts only route to a separate Task | learning evidence directly writes or launches | PASS/FAIL |
| RL-012 | Inspect current bundle map/compiler/validation and real case/current-Run learning paths before/after | package surfaces are read-only and exclude history/cases; real paths remain absent; T-04/T-05 remain downstream owners | T-03 claims installed parity, maps cases, or touches a real path | PASS/FAIL |
| RL-013 | Omit, reverse, contradict, or leave unused every learning decision/projection/interface and each custody action | omission/unused field fails closure, reversal changes physical behavior, and same-priority contradiction fails ambiguity | helper defaults or structural green mask source change | PASS/FAIL |

## Evaluator Decision Record

- Exact target/upstream identities and hashes:
- Primary source/behavior evidence inspected:
- Negative probes repeated:
- Applicable calibration case IDs:
- Unchecked areas:
- Strict verdict:
- Findings and likely owner:
- Completion and terminal report-only boundary:

No matrix row, structural count, or producer claim is acceptance. Independent evaluator evidence and main final decision remain separate.
