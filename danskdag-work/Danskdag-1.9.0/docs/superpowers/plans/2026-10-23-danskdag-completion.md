# Danskdag 1.4.0 implementation plan

Goal: finish vocabulary context, visual learning, advanced/conversation content and answer handling while preserving progress.

Spec: docs/superpowers/specs/2026-10-23-danskdag-completion.md

## Global constraints

Same private Site and version-one progress key. No paid AI, replacement speech, secret client keys or artificial proficiency claims. Authored supplements leave source vocabulary unchanged. Illustrations are auditable SVG/code assets. Plain Russian UI, accessible mobile/dark themes, no decorative emoji.

## Review focus

Every verified imported entry must have real context and semantic association. Incorrect spellings and word order must remain wrong. A learner disputing an answer must not gain verified recall or unearned XP. New lessons and aliases cannot invalidate old progress. A concurrent/offline device must retain local data without overwriting a newer cloud snapshot silently.

## Tasks

Author four disjoint supplement modules, indexed by stable vocabulary ID. Each exports an array of id/exampleDa/exampleRu/association and optional authored alternatives or context-gap metadata. Validate complete coverage and field quality, then merge through a single catalog adapter.

Author an additional curriculum module with 20 advanced and 12 conversational lessons, six items each. Export advancedLessons and extraConversationLessons; root integrates them into course and existing views after data integrity checks.

Implement visual vocabulary with local original SVG scenes, explicit semantic mappings and an illustrated dictionary filter. Render images in study/detail/feedback without exposing answers during recall. Add the same visual support to personal contexts only when an authored mapping exists.

Improve grading via safe normalization and explicit alternatives. Add a different-formulation review flow that preserves the original grade unless the learner explicitly self-checks; store the result as assisted evidence. Add behavioral tests before logic changes.

Investigate Sites Worker identity/storage support. If implementable without unrelated framework dependencies, add authenticated versioned progress snapshots and recoverable conflict handling; run storage/concurrency tests and verify hosted authenticated access. Keep local data as an offline outbox.

Run complete tests and content checks, independent review, browser QA, update documentation/version and publish the verified package.
