# Danskdag learning tools implementation plan

Goal: add reviewed learning references, spoken support and clear progress navigation while restoring the original dark theme.
Architecture: retain vanilla modules, current lesson/task schema, local/cloud progress format and authenticated Worker. New content modules are disjoint from presentation; the root integrates them through course.mjs and a reference view.
Spec: docs/superpowers/specs/2026-10-24-danskdag-learning-tools.md

Task 1: Review uploaded XLSX/PDF content into document-vocabulary.mjs, forms-data.mjs and patterns-data.mjs, with provenance, tests and finite accepted variants. Delegate independent data modules to bounded workers. Do not change original imported IDs or blindly trust transliterations.
Task 2: Implement pure lesson navigation helpers with behavioral tests: completed below80 distinct from mastered, next unattempted before improvement, graceful no-next/all-complete, stable routes. Render next action and collapsed completed lists in route/grammar/conversation/result screens.
Task 3: Implement a reference hub with search, tabs, paginated verb table and responsive adjective/particle/expression cards. Each Danish form has a dedicated audio control using existing speak-text behavior. Optional coarse language is manual browsing, not automatically introduced.
Task 4: Add separate audio controls to Danish choices; optional form help is never an unrecorded answer reveal. Exercise labels clarify the requested grammatical form. Verify choice speech cannot select an answer and expert mode hides form help until feedback.
Task 5: Restore exact forest theme variables, generate a corrected SVG and PNG app icon, fix tab text overflow. UI-only changes get visual QA rather than tests mirroring CSS.
Task 6: Integrate deduplicated new sources; run full tests, content/ID checks and an independent review. QA at 360px/20px, dark theme, lesson folding/navigation, tables and audio click routing. Finalize1.5.0, build exact Worker and publish private. Prepare actual full-source ZIP if downloadable deliverable is supplied, not a rebuilt reduced app.

Review focus: stale progress IDs, unearned recall via help, incompatible verb auxiliary meanings, unsafe public personal notes, nested interactive elements and mobile width.
