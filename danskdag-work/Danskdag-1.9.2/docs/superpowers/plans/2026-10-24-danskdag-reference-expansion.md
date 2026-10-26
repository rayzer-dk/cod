# Danskdag reference expansion implementation plan

Goal: add browsable everyday vocabulary and a tense overview using existing learning tools.
Architecture: common-words.mjs owns reviewed lexical data and contextual training items; course.mjs integrates stable items. reference-view.mjs owns filtered cards and reuses formLessons for tense cards. app.mjs owns transient category selection and navigation.
Spec: docs/superpowers/specs/2026-10-24-danskdag-reference-expansion.md
Constraints: vanilla JavaScript, Node.js 20+, existing progress keys and lesson IDs, no new dependencies or speech provider, unchanged Site audience.

Task 1: Write and run failing schema/catalog tests; add common word categories, explicit noun forms and original examples; integrate the contextual items with catalog/deduplication. Check noun irregulars and sensitive grammatical distinctions against primary Danish references.
Task 2: Write and run failing reference rendering tests; implement category-before-pagination, searchable inflections, independent audio and example save/train controls. Add tense cards from the five existing lessons with actual lesson actions. Add Grammar/My Words shortcuts and responsive styles.
Task 3: Run full tests and browser checks for category/search reset, no matches, form audio, saved/training behavior, tense lesson navigation and 360px typography. Review source changes, update version/docs, build and publish with Sites preserving access. Produce and verify a complete ZIP from the published commit.

Review focus: same spelling across word classes, noun form accuracy, stale pagination after category changes, search matching hidden IDs instead of visible text, and accidental duplicate memory records.
Execution: inline; use the Site source helper for the final commit, source synchronization and package.
