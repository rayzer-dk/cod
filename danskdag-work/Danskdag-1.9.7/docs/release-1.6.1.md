# Danskdag 1.6.1 verification

25 October 2026: 161 automated tests pass; 79 JavaScript modules pass syntax checks. Worker build contains 87 assets and retains the same Site/D1 identity and public audience. Temporary QA modules/pages and static-only preview configuration are removed. The complete HTML embeds 41 modules and 40 images.

12 new B2/C1 lessons contain 72 independent response tasks and 144 authored complete accepted responses. The full course contains 158 lessons and 855 fixed exercises; merged dictionary has 2,591 entries including sentences and word-class tasks. Existing lesson IDs, state/session keys, retries, backup/import and review accounting remain unchanged.

Fresh independent code review reported no confirmed important bugs or useful minor findings. It checked task language/cues, expert model hiding, escaped partner audio, finite alternatives, restoration, ID collisions, three intro modes and next-roleplay routing. It did not claim a complete native-language audit.

Browser checks through the managed preview at 360px / font 20: document client/scroll widths match 345/345. An expert B2 session showed the partner line and goal with no model/options before submission; all six full replies were accepted, 60 XP and completion were retained after reload, and the next roleplay kept expert mode. The complete HTML edition then booted with offline=true and exercised C1 easy mode with four independent Danish option audio controls, no horizontal overflow, and a compact 18.8px goal. Partner audio text matched the interlocutor rather than the expected reply. This validates controls/data/routing, not audible voice quality or speaking proficiency.

Current assessment is finite model matching plus explicit learner self-check for other valid paraphrases. No semantic AI grader, microphone, native speech assessment or verified CEFR attainment is claimed. Source/level scope is documented in dialogue-sources.md. Native Windows/phone installation and live two-device cloud synchronization were not repeated in this change.
