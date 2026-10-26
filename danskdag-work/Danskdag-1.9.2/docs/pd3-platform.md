# PD3 platform notes

Code: `dist/pd3-page.mjs` (controller), `pd3-views.mjs` and `pd3-practice-views.mjs` (HTML), `pd3-reader-view.mjs` (reader markup and DOM updates),
`pd3-audio.mjs` (sentence-by-sentence reader), `pd3-diff.mjs` (dictation comparison), `pd3-writing-check.mjs`, `pd3-store.mjs`, `pd3-data.mjs` (content aggregator), `pd3.css`.

Storage: `localStorage['danskdag.pd3.v1']` only. It is separate from the learner's progress, cloud sync and hashes. "Скачать копию PD3 / Загрузить" in the hub exports and merges it.
Voice recordings are never stored: they live in memory (blob URL) and are cleared on leaving the page, hiding the tab or closing it.

Reader: one `SpeechSynthesisUtterance` per sentence. The current word comes from `boundary` events; when none arrives within 700 ms the reader estimates word times
from character counts and the rate, and calibrates the estimate with the measured duration of finished sentences. Pause is cancel plus restart of the current sentence.
Only one sound at a time: the reader claims the output through `claimSpeech()` in `speech.mjs`, and `speak()`/`stopSpeech()` stop it.

Recorded audio (optional): a text may carry `audio:{src,marks:[{s,e},...]}` (seconds per sentence, same length as `sentences`). The page then plays the file and highlights by `timeupdate`.
Put the files in `dist/` (for example `dist/audio/<id>.mp3`); `tools/asset-types.mjs` gives `audio/mpeg`, `audio/ogg`, `audio/wav` and stores them as binary in the hosted worker.
Limits: the standalone `Danskdag.html` does not embed audio files (`media-src blob:`), so there the reader always uses the device voice; the hosted service worker does not
precache audio and the hosted worker does not answer HTTP range requests. A file that fails to load falls back to the device voice.
