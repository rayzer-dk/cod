# PD3 platform notes

Code: `dist/pd3-page.mjs` (controller), `pd3-views.mjs` and `pd3-practice-views.mjs` (HTML), `pd3-reader-view.mjs` (reader markup and DOM updates),
`pd3-audio.mjs` (sentence-by-sentence reader), `pd3-diff.mjs` (dictation comparison), `pd3-writing-check.mjs`, `pd3-store.mjs`, `pd3-data.mjs` (content aggregator), `pd3.css`.

Storage: since 1.9.3 PD3 results are the optional field `state.pd3` of the learner's progress (`danskdag.progress.v1`): they are part of the JSON export/import, recovery copies, cloud sync, tab merging (`pd3-merge.mjs`), the "Прогресс" page, XP, streak and the day goal (`awardPd3` in `engine.mjs`). The schema and its size limits (about 256 KB, drafts shortened, at most 300 records per map) live in `engine.mjs`, so the Worker validates the same data; the field is absent until PD3 is first used, so existing progress files and hashes are unchanged.
The old key `danskdag.pd3.v1` (1.9.2) is migrated once at start (`pd3-migrate.mjs`): merged into `state.pd3`, copied to `danskdag.pd3.v1.migrated`, removed only after the progress was saved. "Скачать копию PD3 / Загрузить" in the hub work with `state.pd3`; the file format is unchanged (new optional fields: `plan`, `stats`, `xp`).
XP: first completion and each improvement of the best result pay a share of the activity's worth (`PD3_XP`), nothing below 30 %, at most 60 XP a day from PD3; `state.pd3.xp` remembers what was paid. Hub additions: exam plan (`plan.examDate`, `pd3-progress.mjs` rule), frequent dictation mistakes (`stats.dictation`), "add to my words" in the reader (`pd3-vocab.mjs`).
Voice recordings are never stored: they live in memory (blob URL) and are cleared on leaving the page, hiding the tab or closing it.

Reader: one `SpeechSynthesisUtterance` per sentence. The current word comes from `boundary` events; when none arrives within 700 ms the reader estimates word times
from character counts and the rate, and calibrates the estimate with the measured duration of finished sentences. Pause is cancel plus restart of the current sentence.
Only one sound at a time: the reader claims the output through `claimSpeech()` in `speech.mjs`, and `speak()`/`stopSpeech()` stop it.

Recorded audio (optional): a text may carry `audio:{src,marks:[{s,e},...]}` (seconds per sentence, same length as `sentences`). The page then plays the file and highlights by `timeupdate`.
Put the files in `dist/` (for example `dist/audio/<id>.mp3`); `tools/asset-types.mjs` gives `audio/mpeg`, `audio/ogg`, `audio/wav` and stores them as binary in the hosted worker.
Limits: the standalone `Danskdag.html` does not embed audio files (`media-src blob:`), so there the reader always uses the device voice; the hosted service worker does not
precache audio and the hosted worker does not answer HTTP range requests. A file that fails to load falls back to the device voice.

## QA follow-up notes

- Dictation comparison: invisible characters (ZWSP, soft hyphen, LRM/RLM, bidi controls) are removed before tokenising; the score is capped at 99% while anything is wrong; an input too large for the alignment table returns `tooLong` (the page asks to shorten it) instead of throwing. The field length is 1.5 times the reference.
- Unfinished task: `danskdag.pd3.run.v1` (device-only, not in the shared progress, the PD3 copy or the cloud) keeps a dictation text, used listens, reading/listening answers and an exam (answers, task, absolute deadline) for 24 hours or until the task is checked, left or reopened; see `dist/pd3-run.mjs`.
- Word counter of the writing meter (`countWords`): `hej,med,dig` (commas without spaces) counts as one word; this is left as is. The dictation comparison splits such text at the commas.
- The monologue timer starts when the recording has started; without a microphone it starts anyway and says "таймер идёт без записи".

## Dictation cards in the spaced repetition (state.pd3.spell)

Sentences written wrongly in a dictation (`misspelled` / `missing` words of `dist/pd3-diff.mjs`) become cards of the ordinary FSRS repetition.

- Storage: optional `state.pd3.spell = [{id,dictId,idx,words,count,lastAt}]`, newest first, at most 200 records, at most 5 words (40 characters) each. `id` is always `spell-<dictId>-<idx>` and is also the key of the card in `state.reviews`. Texts and translations are not stored: they come from `pd3-dictation-data.mjs`. The field is absent until the first mistake, so progress that never used it (and its hash) is unchanged. Validator and size ceiling: `pd3CleanSpell`, `validatePd3`, `sealPd3` in `engine.mjs`; merge by id (larger `count`, newest `lastAt`, union of words): `mergeSpell` in `pd3-spell.mjs`, used by `mergePd3` (pd3-store.mjs) and `mergePd3Tabs` (pd3-merge.mjs).
- Source: `checkDictation` (pd3-page.mjs) calls `spellFindings` and `deps.spell.record` (app.mjs, `recordSpell` in pd3-spell.mjs) only for a non-empty check. Only sentences the learner tried (sentences mode: something typed; text mode: at least one word found) and that have wrong or missing words are recorded. Every mistake is an "Again" of the card (`recordAttempt` with `correct:false`: due in 10 minutes, FSRS memory lowered, a lapse). A later error-free dictation does not touch the record.
- Catalogue: `getCatalog` adds `{kind:'dictation', source:'pd3', tag:'Диктант-карточка', spellWords}` items for the records (cache signature includes them). They are in `getWordEntries` (own entry, never merged with a word of the same text) and so in the plan, "Знакомые слова" and the review page, but not in lessons, `trainingPool` or "Мои слова". `memory.mjs`: they do not count as the day's new words.
- Task: `kind:'dictate'`, `dictMode:'listen'` (sentence is read aloud, the learner writes it; correct = `compareDictation(...).exact`) or `'cloze'` (no Danish voice: one problem word hidden, that word is typed). The first listening is free, each further one (`SPELL_FREE_LISTENS`) is help and gives an "assisted" answer. `restoreSession` validates both forms; `session.plays` is optional.
- UI: PD3 hub ("На повторении из диктантов: N", "Повторить сейчас" starts `practice-spell`), progress page line, notice after a dictation check.
- The Worker bundle (`dist/server/index.js`) contains an older copy of `engine.mjs`: it must be rebuilt (`tools/build-worker.mjs`) at release so that it knows the `spell` field (until then the field travels as an unknown PD3 field).
