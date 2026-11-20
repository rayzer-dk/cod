# Danskdag Upgrade Plan

Goal: implement the user-requested grammar/vocabulary/design upgrade on the existing Site.
Spec: ../specs/2026-10-22-danskdag-upgrade.md
Execution: parallel independent content/engine tasks; coordinator integrates UI/session logic, QA and publication.

1. Read attached workbook without editing; produce deduplicated vocabulary and explicit needsReview, Russian translations, examples/associations for selected reliable terms.
2. Author grammar A1–C1 and real conversational content in curriculum.mjs, keeping existing lessons unchanged.
3. Test first and extend engine.mjs with compatible state migration, personal/difficult words, difficulty/font settings,10minute failure review, anti-inflation spacing, levels and derived badges.
4. Create course.mjs aggregation and learning.mjs task engine, pure tests for easy/mixed/expert, sentence ordering, gap checks, legacy resume, wrong-answer retry and completion bounds.
5. Replace app.mjs/styles.css with coherent colorful grammar-first views and consistent text sizing. Add ui.mjs and speech.mjs; pointer drag with tap/keyboard equivalent; forms for personal words; backup/import, full dark mode.
6. Integrate all content. Run suite, inspect workbook audit, browser-test flows at360px and desktop including saved progress and grammar modes. Obtain independent review, fix confirmed findings and repeat affected checks.
7. Update README/version, package exact pushed commit and deploy same private Site. Return live URL and concise scope/limitations.
