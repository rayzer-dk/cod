# Language-learning methods audit — 24 October 2026

This is a bounded review of the existing exercise engine, grammar/form content,
memory accounting, speech controls and lesson navigation. It is not an evaluation
of learner outcomes. Research supports several component methods; it does not
establish that Danskdag itself improves conversational proficiency.

## Primary research and the limits of the inference

| Study and original source | Finding relevant to the product | What it does not establish |
| --- | --- | --- |
| Karpicke & Roediger (2008), *The Critical Importance of Retrieval for Learning*, Science 319, 966–968. [Publisher](https://doi.org/10.1126/science.1152408); [original abstract](https://pubmed.ncbi.nlm.nih.gov/18276894/). | Repeated retrieval of learned foreign-language word pairs improved delayed recall compared with further study without further tests. Continue asking learners to retrieve successfully learned material. | It does not validate this app's interval ladder, grammar curriculum, audio or fluency claims. This audit consulted the original abstract, not the full paper. |
| Cepeda et al. (2008), *Spacing Effects in Learning: A Temporal Ridgeline of Optimal Retention*, Psychological Science 19, 1095–1102. [Author page](https://www.yorku.ca/ncepeda/publications/CVRWP2008.html); [author-hosted paper](https://laplab.ucsd.edu/articles/Cepeda%20et%20al%202008_psychsci.pdf). | In a large experiment, effective spacing depended on the eventual retention interval; longer is not invariably better. Distribute practice over time. | The study used trivia facts. It does not prescribe 10 minutes or 1/3/7/14/30 days for Danish learning. The precise ladder remains a product heuristic. |
| Bird (2010), *Effects of distributed practice on the acquisition of second language English syntax*, Applied Psycholinguistics 31, 635–650. [Publisher](https://doi.org/10.1017/S0142716410000172). | Distributed practice of English tense/aspect distinctions produced better long-term test scores than massed practice. Spacing can also apply to grammar. | English syntax test results do not demonstrate transfer to spontaneous Danish conversation. This audit consulted the publisher's abstract. |
| Hulstijn & Laufer (2001), *Some Empirical Evidence for the Involvement Load Hypothesis in Vocabulary Acquisition*, Language Learning 51, 539–558. [Publisher](https://doi.org/10.1111/0023-8333.00164); [authors' institution, original abstract](https://cris.haifa.ac.il/en/publications/some-empirical-evidence-for-the-involvement-load-hypothesis-in-vo/). | Two EFL experiments compared reading, reading plus filling gaps, and composition using target words. Retention was highest for composition and lowest for reading. Active evaluation and use deserve practice opportunities. | Time on task differed. The design does not isolate context alone or prove that putting any word into one sentence improves learning. This audit consulted the original abstract. |
| Lightbown & Spada (1990), *Focus-on-Form and Corrective Feedback in Communicative Language Teaching*, SSLA 12, 429–448. [Publisher](https://doi.org/10.1017/S0272263100009517). | Four intact classes of children in intensive English instruction differed in grammatical accuracy, with some evidence relating those differences to teachers' focus on form. Form can receive attention within communicative teaching. | This was not a randomized app trial; accuracy differences did not correlate with listening-comprehension performance. The finding does not make multiple choice equivalent to communication. This audit consulted the publisher's abstract. |
| DeKeyser (1997), *Beyond Explicit Rule Learning: Automatizing Second Language Morphosyntax*, SSLA 19, 195–221. [Publisher](https://doi.org/10.1017/S0272263197002040). | In an artificial-language experiment with 61 subjects, comprehension and typed-production practice over eight weeks developed gradually and were highly skill-specific. Practice the desired response skill. | Artificial-language typed production does not establish oral fluency or a universally optimal schedule. This audit consulted the publisher's abstract. |

The sources above are original research rather than blogs. An original abstract
is narrower evidence than a full methodological appraisal. The earlier
`docs/memory-evidence.md` also documents relevant studies and an explicitly
identified course-design framework (Nation's Four Strands).

## What is actually implemented

- `engine.mjs`, `memory.mjs`: a due-date ladder; errors and assistance return
  after ten minutes; premature additional practice does not advance a card to a
  long interval. Independent typed recall, recognition, and delayed recall on
  different days have separate accounting. The numbers are heuristics.
- `learning.mjs`: the adaptive route starts with recognition, may use sentence
  assembly, and progresses to typed recall. Assembly is counted as supported
  recognition rather than independent recall. Reviewed word examples can supply
  a contextual gap; explicit inflected gaps preserve the required surface form.
- `curriculum.mjs`, `extended-curriculum.mjs`, `forms-data.mjs`: authored rules,
  sentence contexts, grammatical contrasts, explanations and finite accepted
  answers. At audit time there are 48 grammar lessons and 288 grammar items;
  128 of those items use an authored gap. These counts describe task coverage,
  not proficiency coverage.
- `forms-data.mjs`: six form lessons, 36 gap exercises. Choices contrast forms
  such as `lære / lærer / lærte / lært`, `arbejder / arbejde / arbejdede /
  arbejdet`, and `kommet / kommer / kom / komme`. Labels identify the requested
  form; optional form help provides explicit reference forms. Expert mode
  removes choices and hides form help before submission.
- `engine.mjs`, `learning.mjs`: typed grading compares normalized strings
  against authored variants; it preserves Danish letters and word order. It
  accepts listed synonyms, not arbitrary valid paraphrases. Self-check after
  comparison grants no automatic score or independent recall credit.
- `exercise.mjs`, `ui.mjs`, `speech.mjs`: Danish choices and bank tiles have
  separate speech controls. Speech uses an installed Danish system voice.
  Marked Danish phrases elsewhere receive controls, but playback availability
  and quality depend on the device.
- `lesson-navigation.mjs`, `views.mjs`, `styles.css`: attempted lessons get a
  check and “Пройдено”; a best score of at least 80% adds mint styling and
  “Закреплено”. Attempted lessons are in a closed `details` group. New topics
  come before attempts to improve an old score. These are navigation states,
  not proof of long-term mastery.

## Concrete gaps and minimal follow-ups

1. **Audio coverage is not universal.** The V2 artwork in `views.mjs` contains
   Danish example spans without `lang="da"` or speech controls. Rules and
   exercise notes render mixed Russian/Danish text through `h(...)`, so the
   automatic audio pass cannot discover their embedded Danish words. Use
   explicitly marked Danish segments in teaching explanations and add controls
   to the artwork. Avoid inferring language solely from Latin characters.
2. **Mixed-language form help is sent to Danish speech.** A form-help row named
   “Контекст” can contain Russian prose and Danish snippets, but all rows go
   through `spoken(f.text)`. Mark explanatory prose separately and play only
   its Danish segments; do not mark the whole row as Danish.
3. **Form multiple choice is present but is not every grammar exercise.** Other
   items train sentence translation, word order or listening. Preserve these
   different purposes; expand authored form contrasts only where there is a
   clear grammatical target and an unambiguous context.
4. **Conversational readiness is unmeasured.** The app invites a learner to say
   or modify a phrase but does not capture a reply, recognize speech, assess
   pronunciation, evaluate a spontaneous dialogue or test interaction with a
   new speaker. Add meaningful short output and varied listening/role-play
   opportunities before claiming broader speaking support; validate transfer
   separately. A completed card or lesson is not evidence of conversational
   readiness.
5. **No complete-app efficacy claim is warranted.** Measure delayed retention
   with new contexts and assess speaking/listening separately if efficacy or
   level-completion claims are desired. The current evidence supports calling
   the implementation research-informed.

## Verification

Read-only source inspection plus:

```sh
node --test tests/learning.test.mjs tests/memory.test.mjs tests/forms-data.test.mjs tests/lesson-navigation.test.mjs tests/exercise-access.test.mjs tests/ui.test.mjs
```

Result on 24 October 2026: 58 tests passed, zero failures. These tests verify
engine/data/rendering contracts, including finite accepted forms, separate
choice/tile audio controls and completion routing. They do not verify audible
playback on a Danish-capable device or establish learning outcomes. No
production code was changed by this audit.
