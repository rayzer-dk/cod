# Danskdag 1.9.1

Audit-fix release: see `docs/release-1.9.1.md`.

Start with Home → A1 → choice answers → Start lesson. The ordered route offers the next topic after completion and shows completed/mastered counts. Expand the level's lesson list for order and checkmarks; Progress lists completed lessons by level. Settings stores an optional name and the material level without resetting progress. Numbers and Reading adds 7 lessons / 42 exercises, a spoken 0–9999 cardinal-number converter and three short A1 texts. First-tap speech waits for delayed voice discovery. See `docs/release-1.9.0.md` for validation and limits.

Ukrainian–Danish and Russian–Danish practice for phone and desktop, with grammar as the main route. The browser application is dependency-free and hosted as a public Site. A small Worker serves the app and authenticated progress snapshots.

## Learning

The grammar, situation and conversation routes contain 68 lessons with 408 authored exercises: 40 grammar lessons (four each at A1, A2 and B1; fourteen each at B2 and C1), 12 everyday-situation lessons and sixteen conversation lessons. The grammar route covers word order, articles, agreement, pronouns, tense, subordinate clauses, passive voice, conditionals and precise professional phrasing. A1–C1 labels describe exercise difficulty; this is not a complete CEFR or certified DU3 course.

Three modes are available independently of the material level: multiple choice, mixed practice (including writing, listening and sentence assembly), and typed answers without options. Gap exercises include a Russian meaning to resolve context. Sentence tokens support pointer dragging, clicking and arrow-key reordering. Answers accept authored variants and verified vocabulary synonyms with the same Russian meaning. Case and common sentence punctuation are ignored; Danish letters æ, ø and å remain significant. Other valid free-form translations may need additional accepted variants. After a typed mismatch, learners may compare their answer with the model and explicitly self-check it. This removes an immediate retry but awards no automatic score, XP or verified independent recall; assisted review returns after ten minutes. Curly apostrophes and ordinary hyphen variants are normalized without ignoring word order or Danish letters.

Every answer receives an explanation. Incorrect initial answers return once at the end of the session and remain due after ten minutes, even if corrected immediately. Independent scheduled recall uses FSRS-6 and a 1–90-day product interval cap. Recognition does not receive a successful model update; first recognition returns after ten minutes, or one day when prior recall exists. Early correct practice does not postpone a future review. Help and immediate retries are recorded separately from independent recall. Difficult words and bookmarks can be trained separately. XP, experience levels, eight achievements, lesson attempts and best scores are saved; 80% marks a topic as consolidated.

Conversation notes explain eight spoken/written distinctions and twelve expressions, including shortened forms and register. These spellings illustrate informal usage, not phonetic transcription.

## Practice Memory

The home and review pages offer an adaptive plan: due items first, up to six initial tasks, then at most two new items. The daily new-item allowance is 3, 6 or 10 (default 6), using Copenhagen dates. Due work can consume the whole batch; future cards are not used to fill it. Manual marks and personal words receive priority, followed by current-level grammar and imported vocabulary. Nearby priority tiers diversify new material, while two new senses from the same family are never introduced together. These are product heuristics, not research-validated optimal settings.

New planned material has a short preview with translation, authored context, notes and associations where available. The preview itself grants no memory credit. Subsequent scheduled sessions adapt from choices to sentence building to typed answers. A contextual gap is used only when an authored example and translation exist and exactly one whole-word occurrence can be removed without exposing the answer elsewhere. Manual exercise modes remain independently available.

Opening a rule or association, showing listening text, or using “Не помню” records help. Giving up reveals feedback and counts as an error. Recognition, independent recall, and repeated daily recall have separate counters. The last metric requires at least two additional due independent recalls, each at least 24 hours after the previous independent recall, with the latest attempt also independent and correct. It measures task performance, not conversational proficiency. A prompt invites learners to say their own phrase without pretending to evaluate free speech.

The method page explains the procedure and links original research. Evidence and its limits are documented in `docs/memory-evidence.md`. No experiment has validated Danskdag itself or its exact intervals. Learning also needs meaningful reading, listening and conversation.

Existing version-one state remains valid; missing new settings receive defaults, old review data is retained without inferring its historical response type, and optional evidence survives JSON export/import. New preview and attempt metadata also survive unfinished-session restoration.

## Meanings and word classes

The “Значения слов” section adds 28 word families with 113 original contextual examples and ten word-class lessons with 40 examples. Including six illustrated vocabulary lessons, the original expansion had 128 lessons and 693 exercises. Homonyms, polysemy, verb/preposition constructions and easily confused words have separate category filters and a Danish/Russian search. Each sense shows its word class, a usage cue, translation, audio control and saved/difficult marks. Primary dictionary links are available with the examples. Content sources and taxonomy notes are documented in `docs/word-class-sources.md`, `docs/meanings-sources.md` and the data modules.

Practice asks what a form means in the presented Danish context or which class a highlighted whole word belongs to. Multiple-choice answers come from the same meaning family or competing classes. Expert mode accepts explicitly authored Russian variants and Danish/Russian class names. Focused recognition and translating an identical sentence have independent review identities, so a noun/verb classification task cannot replace a translation task. New lesson scores, XP and scheduled repetitions use the existing progress engine and storage format.

The word-class overview teaches ten common instructional groups. Danish descriptions vary in their taxonomy: sound imitations may be separate, and some systems analyze articles within pronouns. The app distinguishes a word’s lexical class from its function; for example, an adjective used adverbially is explained as such. Sense labels are contextual glosses, not exhaustive dictionary definitions or one-to-one translations of discourse particles.

## Imported and personal vocabulary

The supplied workbook `Збережені переклади.xlsx` was read without changing its contents. Of 1,117 nonempty source rows, 853 unique vocabulary entries were extracted and 165 duplicate occurrences merged. Some rows yield more than one entry, so these categories are not an arithmetic partition. There are 838 verified entries eligible for exercises and 15 explicitly marked entries kept searchable for checking. Another 121 ambiguous records or unrelated notes are visible in the review section and excluded from exercises; 17 headings were skipped. Clear translation errors were corrected. Source-row references and original text remain in the data module for audit. No personal medical instructions are turned into language tasks.

All 838 verified imported entries include an authored Danish example, Russian translation and semantic association. Each supports a contextual gap in adaptive practice. Supplements are keyed by original IDs; raw imported text remains unchanged, and reviewed corrections are applied only to the practice view. Users can add or edit personal words with their own explanation and association. Dictionary entries are deduplicated across sources while retaining aliases for saved marks and review schedules.

`tools/import-vocabulary.py` reproducibly imports the supplied XLSX or the parsed source JSON into `dist/vocabulary.mjs`. The workbook itself is not packaged with the website. Review output before replacing vocabulary data.

## Progress, sound and appearance

The current browser stores progress, personal words and the unfinished session in localStorage. Existing version-one progress and original lesson IDs are preserved. A pre-upgrade snapshot is retained; unreadable original data can be downloaded for recovery. Validated JSON export/import transfers progress between browsers, with confirmation before replacement. Completed progress, personal words and settings synchronize through a private per-account D1 snapshot. A new device uses the same account and Site address. The unfinished session stays device-local. Revision-based writes prevent a stale device from silently replacing newer progress; divergent versions require an explicit choice, with a local recovery copy retained before replacement. An active lesson or form defers incoming changes. Temporary failures retain local changes for retry. JSON export remains available as a separate backup. Clearing browser data removes the device copy, including any changes not yet synchronized.

Speech uses an installed Danish browser/system synthesis voice, with three speeds. Voices may become available asynchronously. When no Danish voice exists, the interface explains the limitation and listening tasks can show text. Optional microphone recording is available for manual comparison only. No pronunciation score, analytics or paid AI API is used. Audio stays in the tab memory and is cleared on closing the coach, leaving the page or hiding the tab. Capture requires browser permission and supported APIs. Replacement speech was explicitly deferred; the existing device voice remains. Quality and offline availability of the voice depend on the device.

Light and dark themes share one system font family. Reading sizes are 16, 18 or 20 px. The layout supports phones, desktop, keyboard focus and reduced motion. Installation is offered when supported; the hosted app caches verified static assets after its first online load; progress APIs are never cached. The independent Danskdag.html contains its assets and does not connect to cloud progress.

## Source and verification

`dist/` contains the browser application. `tools/build-worker.mjs` emits its asset bundle and progress API in `dist/server/index.js`; `.openai/hosting.json` declares the D1 binding, and `drizzle/` contains the schema migration. `worker/progress.mjs` checks the trusted Site identity, validates bounded snapshots and performs atomic revision checks. No user identity is accepted from request bodies. `engine.mjs` handles state, legacy review timing and achievements; `memory.mjs` handles evidence, adaptive planning and memory counters; `learning.mjs` handles tasks and resumable sessions; `course.mjs` combines stable original content, grammar/conversation material and vocabulary; UI templates and speech support are separate modules.

Run `node --test tests/*.test.mjs`. Tests cover state migration and validation, XP idempotence, review timing, sessions and legacy writing migration, token order, retry bounds, accepted synonyms, content integrity and vocabulary exclusion. Browser QA covers a complete grammar lesson with intentional error/retry, expert C1 input, preserved progress and personal words after reload, unfinished-session protection, pointer dragging and keyboard reordering, both themes, missing-voice fallback and a 360 px phone layout with 20 px reading size. New-section QA also covers a complete five-sense fyr session with an intentional error and delayed retry, persisted 80% score after reload, expert class answers in Russian and Danish, typed focus-task resume, whole-word highlighting, desktop navigation/search and a 360 px dark phone layout at 20 px reading size without horizontal overflow. Actual audio playback cannot be verified on the QA device because it has no Danish voice.

Grammar and register reference checks: https://sproget.dk/typiske-problemer/saetninger/, https://sproget.dk/typiske-problemer/ledsaetninger/, https://sproget.dk/typiske-problemer/hans-hendes-eller-sin/ and https://ordnet.dk/ddo/. Speech references: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis and https://wicg.github.io/speech-api/. Exercises and associations were authored for this app.

Memory-practice browser QA covers preview/resume after reload, a complete adaptive batch containing legacy independent recall, a hinted correct answer and a give-up/retry; recognition-only results, daily new-item limit and its persisted setting; and review, study, exercise and method screens at 360 px in dark theme with 20 px reading size. The method interval label wraps at narrow widths. The 1.3.0 suite had 70 passing tests; the current suite additionally covers full vocabulary enrichment, advanced answer alternatives, self-check evidence, cloud conflicts, recovery, account isolation and API validation. Independent review additionally exercised 3,600 verified-entry/stage combinations.


## Illustrated vocabulary and 1.4.0 validation

Thirty-six original local SVG scenes support six visual lessons and 45 matched dictionary entries. Illustrations appear during study, dictionary detail and answer feedback; they do not expose the answer during independent recall. Mappings are explicit and avoid ambiguous meanings such as fyr. Build them with `node tools/build-illustrations.mjs` when the source drawing changes.

The 1.4.0 content review covered all 783 newly enriched imported entries, all 192 supplementary grammar/conversation items and all 36 visual entries. It corrected a noun article, two missing accepted gap alternatives, a register overstatement and several imported teaching glosses. Primary references and editorial limits appear in `docs/extended-curriculum-sources.md` and `docs/vocabulary-enrichment-sources.md`. Associations are optional semantic memory cues, not claims about etymology.

New browser QA completed a C1 lesson with six typed correct answers, including om as an accepted alternative to hvorvidt and an explicit som sentence variant; verified 60 XP and achievements; and verified a separate self-checked answer earns zero XP and remains assisted after reload. At 360 px with dark theme and 20 px reading size, the settings and continuity panel remain readable with document scroll width equal to client width (345 px excluding the scrollbar). Desktop review also checked illustrated dictionary cards and study/detail/feedback placement. Credited sessions are discarded on restoration, so reloading a completed result does not offer the completed lesson as unfinished. Hosted account continuity requires the platform's trusted identity gateway; automated tests use two isolated account identities and concurrent revisions. They do not substitute for a real two-device authenticated acceptance test.

Build for hosting with `npm run build` after setting the source manifest to Worker mode. Run `npm test` before publication. The first hosted load requires internet. Recorded native speech and open-ended semantic grading are not provided.


## Version 1.5.0

The original forest-green dark canvas/panels and coral accent return from version 1.0. The app icon, manifest PNGs, favicon and header flag now use a white Danish cross on a red field. A sun/moon button in the header switches themes immediately and persists the preference. Mobile level labels wrap inside adequately sized horizontal tabs instead of overlapping. Mobile navigation uses short readable labels with full accessible names.

The reference hub has 114 explicitly reviewed verbs, 40 adjective/quantity paradigms, 20 construction families with 84 bilingual examples, and 12 optional informal/coarse expressions with register, neutral alternatives and contextual translations. Verb forms include infinitive, present, past, perfect, pluperfect and imperative, with context-sensitive auxiliary notes. It is a curated selection from the uploaded PDF plus checked common additions, not certification of every 500 PDF entry. Six form lessons and 10 quantity/particle lessons add 96 exercises. The source vocabulary is extended by 331 reviewed contextual words from the two uploaded XLSX documents; 711 source rows have a complete added/duplicate/review/excluded audit. Old 838 verified imported entries remain intact; the total verified file vocabulary is 1,169. The dictionary has 1,868 deduplicated entries including sentence/classification tasks, not 1,868 distinct headwords or word families.

Every Danish answer option and sentence-bank tile has an independent speech button. A speaker click does not select an answer. Additional audio controls cover examples, comparison forms, register notes, feedback and reference tables through the same installed-device speech engine. No replacement voice or native recordings were introduced; voice availability/quality remains device-dependent. Russian translations are excluded from Danish speech. New form tasks name the requested form and offer a closed form-help panel in nonexpert modes; opening it marks assisted evidence. Expert recall hides that panel until after submission.

Completed lesson cards show a check and percentage, with a distinct mastery tint at 80 percent. Attempted lessons fold into a closed completed section; new topics stay visible. Direct next-topic controls and a result-screen next-lesson action avoid scanning a long completed list. Recommendation follows the nearest level and prefers fresh topics over improvement work within that level. Fully mastered routes show an explicit completed/review action rather than restarting automatically.

Installation guidance is included for Android, iPhone and desktop. Copy-link is available in settings; it does not change the Site audience or grant access. Publishing preserves the existing Site audience. Access is managed separately in Sites settings.

The full source download contains this same browser application, all local illustration assets, tests, data, Worker build and database migration. Local startup uses Node.js 20 or newer and tools/start-local.mjs, binds only 127.0.0.1, and keeps progress in that browser. Local serving deliberately does not impersonate a hosted account or expose the cloud progress API. Export/import JSON transfers progress explicitly between the hosted origin and localhost. It is not an APK or a native Windows executable.


## Version 1.5.1

The reference hub now has separate Common Words and Tenses tabs, with direct shortcuts from Grammar and My Words. The practical list has 101 curated words and combinations in six categories: 25 nouns, 20 adverbs, 23 pronouns, 12 prepositions, 12 conjunctions and nine question words/combinations. Each noun has four explicit forms including en/et; headwords, forms and contextual examples have independent audio buttons. This is not a corpus-ranked top-frequency list or a complete inventory of common Danish words. Existing verb (114) and adjective/quantity (40) tables are reused through links, with verb-group filtering.

Save and Train Example use stable contextual example IDs. Existing dictionary deduplication shares identical sentence aliases, so earlier progress and saved marks stay usable. The file vocabulary remains 1,169 verified entries; the merged dictionary now has 1,962 entries including sentences/classification tasks, not 1,962 unique headwords.

Five tense cards reuse the existing present, past, perfect, pluperfect and future lessons and their reviewed examples. They link to those lessons instead of duplicating them. Infinitive/imperative are described as forms rather than tenses. Search/category filters apply before pagination, with page reset when a category changes. Search excludes hidden IDs and, for tense cards, incorrect exercise options. Linguistic scope and sources are recorded in docs/common-reference-sources.md.


## Version 1.5.2

The complete app is built as the root Danskdag.html. It embeds the same 128 lessons, 693 lesson exercises, dictionary modules, reference tools, CSS and 40 SVG/PNG assets. Opening it needs a modern browser and JavaScript, with no Node.js, server, ChatGPT subscription or API key. A strict document CSP blocks external runtime connections. Cloud synchronization and service-worker registration are disabled in this edition; progress remains in that browser and JSON transfers are explicit. File-URL storage behavior varies, so export before moving/updating the file or clearing browser data. System speech still depends on an installed Danish voice and may itself require a connection.

The original Windows launcher now opens HTML and checks for incomplete extraction. Danskdag.ico and the optional Create Shortcut command create an independent HTML shortcut with built-in Windows PowerShell/WSH, without changing execution policy. Windows-native shell behavior could not be executed in the Linux QA environment; the self-contained HTML was tested interactively in the browser.

The hosted app adds a versioned static-only service worker. Install verifies each cached response against the built asset SHA-256, rejecting redirects, sign-in pages and altered responses. Requests outside the static manifest, progress API calls and non-GET requests are not intercepted. It cleans up only its own static cache names. Offline readiness is shown in settings. First opening and updates require connectivity; cache persistence and installation depend on browser support and storage retention.

Use npm run build to regenerate the HTML, service worker and Worker bundle together; the build requires Node.js 20+. tools/build-offline.mjs also builds just the HTML from the source. The zero-dependency bundler supports the app's acyclic named-import/named-export graph and fails for external imports, cycles and unavailable named exports. It preserves readable source names and does not evaluate encoded executable code.

Requirement coverage and remaining limitations are documented in docs/requirements-status.md.


## Version 1.6.0

Adds 468 original bilingual everyday lemmas across 18 practical situations, 90 conversation phrases across nine situations and 18 short lessons of five phrases, plus 18 extra coarse comprehension entries (30 in that manual reference). All new ordinary items are in the saved/difficult/review catalogue. Filter a situation and train a small batch; the existing modes, review intervals, progress keys and backup/import remain unchanged. The course now contains 146 lessons and 783 fixed exercises. The merged dictionary has 2,510 entries, including full sentences and word-class tasks rather than that many unique headwords.

Reference entries start as compact rows; examples, forms and notes open on demand. Audio stays available outside the disclosure. Saving/difficult marking updates in place and preserves disclosure/focus. Mobile verbs show vertical named forms while desktop keeps the comparative table. Mobile navigation includes direct reference/speech/meaning shortcuts. Dictionary cards hide lengthy examples until the word detail, and lesson spacing is denser. New word choices prioritize distractors from the same word class instead of unrelated full sentences. Danish fragments in teaching notes and the V2 examples have audio; reduced written spellings remain display-only. This Latin-script segmentation is scoped to bilingual teaching notes, not a general language detector.

The complete HTML and hosted Worker/PWA are built from the same source. New sources and limits: `docs/daily-lexicon-sources.md`, `docs/spoken-danish-sources.md`, `docs/learning-evidence-2026-10-24.md`. This remains a finite editorial collection, not complete frequency coverage or a certified conversational curriculum. System speech quality/native connected speech and spontaneous speaking assessment are unchanged.


## Version 1.6.1

Adds twelve six-item contextual reply lessons (six B2, six C1), with 72 independent micro-dialogues and 144 complete authored accepted responses. Situations cover workplace, social plans, faulty purchases, housing, calls and opinions. A partner's Danish line has separate speech and an optional translated hint. The learner answers a concrete communicative task in Danish. Expert mode does not expose the model until submission; easy offers Danish replies; mixed also trains sentence assembly. The intro lets learners select the mode, and the next-roleplay action carries it forward within roleplay lessons.

Existing session schemas, progress keys, task limits, retries and review accounting remain intact. Finite authored alternatives and learner self-check are used; this does not implement open-ended semantic grading, speech recognition or CEFR assessment. Counts: 158 lessons, 855 fixed exercises, 2,591 merged dictionary entries including full sentences/classification tasks. Sources and limits are in `docs/dialogue-sources.md`.


## Version 1.7.0

Memory scheduling now uses the published FSRS-6 equations with default weights and target retention 0.9. Only a due, unassisted first typed retrieval receives a Good update. A first unassisted failure receives Again; help and immediate retries never create successful recall evidence. Errors return after ten minutes; long intervals are rounded and capped at 1–90 days. These are product policies, not a guarantee of retention. Early practice preserves the scheduled state. Old due dates remain unchanged until the next due independent attempt; old box intervals provide a conservative seed. All original IDs and version-one progress keys remain.

Thirty existing everyday words now have two explicitly authored context tasks each (60 new sentences), including inflected surface forms. Contexts rotate on due independent retrieval. A separate metric counts words recalled in two different contexts on different elapsed days. This is evidence about these tasks, not measurement of conversational transfer.

Ten pronunciation guides cover vowel contrasts, length, soft d, stød, stress, rhythm and weak/reduced forms. They support whole, slow and chunk playback, plus an optional 20-second record–playback–compare loop. Checkpoints are manual and grant no XP. Installed Danish voices can be selected in settings; changing voice provider remains deferred. Native dictionary audio is linked for comparison because TTS cannot reliably represent every phonetic detail. Microphone permission denial and unsupported browsers retain text/listen practice. Recording never enters progress, exports, cloud requests or persistent storage.

Primary references and numerical parity fixtures appear in docs/adaptive-review-sources.md, docs/learning-contexts-sources.md, docs/pronunciation-sources.md and docs/methods-1.7.0.md. The third-party FSRS notice is included in this full distribution.


## Version 1.7.1

Speech controls immediately acknowledge taps and distinguish preparation, actual speech, completion and failure. Feedback follows browser utterance events; changing or cancelling speech clears the previous control and late old events cannot overwrite the active indicator. A ten-second startup timeout handles silent engines. Reduced-motion preferences suppress animated movement while retaining colour and text feedback. Danish phrases are single text-and-speaker buttons, including authored notes and generated example controls. Sound buttons have at least 44-pixel tap targets. Exercise choice rows and token controls retain their separate answer and audio actions.

The full meaning/class footer row is a semantic button. Meaning, class, lesson and dictionary card backgrounds open their primary action, while embedded audio, bookmark, form, disclosure and link controls stay independent. Text selection does not navigate. Reference rows retain full-row disclosure. The existing informal catalogue is now labelled «Сленг и ругательства» and its shortcut is visible from «Живая речь». Existing vocabulary and progress identities are unchanged.


## Version 1.7.2

The header flag and adjacent heading are a single home button with a minimum 44-pixel tap height, a «На главную» accessible label/tooltip and the existing keyboard focus style. It uses the existing home navigation and does not reset saved learning state.

## Version 1.7.3

The entire upper-left brand and header home button show an accent background and outline for 500 ms after activation, surviving the immediate home-page render. Repeated taps restart the feedback; both themes and reduced motion are supported.

Hosted HTML is now a coherent generated bundle. Entry navigation prefers a verified app response from the network and falls back to the installed offline copy. `/open` opens the same app and browser progress while avoiding old entry caches. Future service-worker replacements offer an explicit update button that saves progress and the unfinished session before reload. There is no automatic reload or browser-data reset. See `docs/release-1.7.3.md` for validation and limits.

## Version 1.8.0

Ukrainian is the default teaching language, including vocabulary meanings, grammar explanations, exercise choices and accessible labels. Settings retain Russian as an explicit choice. Both languages use the same app logic and stable content identities. An AST-based build step embeds the authored Ukrainian catalogue from `locales/uk/`; there is no runtime translation service. The small vendored Acorn parser is used only at build time and carries its MIT notice in `tools/vendor/ACORN-LICENSE.txt`.

Changing language saves progress and resumes unfinished built-in tasks with corresponding translated prompts and answers. Typed input and personal-word text are preserved literally. The historical `ru` content field remains the internal base-language slot for file/state compatibility. Legacy cloud hashes are recognized before upgrading their metadata, avoiding false conflicts caused only by the new setting.

Speaker buttons retain a visible half-second tap background and playback/error states. Opening a dialog clears background audio feedback and makes the app behind it inert. The app content has its own stacking context; background hover effects cannot sit over the dialog. Compact mobile shortcuts stack icons above labels to fit Ukrainian text at a 20 px reading setting.

Update checks use uncached `/api/release` metadata on opening, focus, reconnect and return to the tab. Settings include a manual check. A newer release offers a safe explicit reload through `/open`; current release and failed network checks have different feedback. The self-contained app needs only six shell files cached for installation, rather than dozens of unused source modules. The release does not force open forms or lessons to reload. See `docs/release-1.8.0.md` for evidence and limits.
