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
