# Compact language implementation plan

Goal: broader everyday practice in a phone-friendly reference.
Spec: ../specs/2026-10-24-compact-language.md

1. Add failing disclosure/mobile verb rendering contracts. Replace expanded reference cards with accessible details rows and compact verb form list; reduce dictionary/course spacing without shrinking touch targets. Run targeted tests and browser QA.
2. Add daily and spoken authored data with independent integrity tests and primary language source notes. Integrate them in the catalog and filtered reference training; coarse expressions remain manual only. Verify unique IDs, existing progress IDs and filtering/training.
3. Audit actual learning engine, grammar form choices/audio and lesson navigation against user requests and primary research. Fix confirmed gaps. Report finite scope and the separate need for live speaking/listening.
4. Run complete tests, fresh code review, build HTML/Worker/PWA, test final archive and publish. Save complete versioned ZIP.

Review focus: 360px and font20 overflow; native details versus independent audio; no duplicate headword IDs; coarse speech excluded from scheduler; new catalogue survives offline bundle and state migration.

Progress: source opened at a69b81d. Existing user authorization covers implementation/publish of this ongoing app; source helper owns commits. Content/research delegated in disjoint files, UI/integration implemented inline.


Implementation record: 468 daily entries and 90 spoken entries integrated. Spoken lessons split into 18 sets of five because ordinary sessions are limited to six; all lesson items are now reachable and covered by a regression contract. Review found one P2 disclosure/focus loss on reference bookmarks; reproduced in browser (open0/focusBODY), fixed with in-place updates and rechecked (open1/focusbutton). Full automated suite:152 passed. New noun distractors now prefer the same word class, after reproducing a simple word paired with unrelated sentence choices. Final build/archive/browser verification recorded separately in release audit.
