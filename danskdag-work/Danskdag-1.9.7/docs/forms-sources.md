# Danish forms reference: sources and editorial scope

Reviewed 2026-10-24. Implementation: `dist/forms-data.mjs`; checks: `tests/forms-data.test.mjs`.

## Scope

The reference contains **114 verbs**, **all 40 rows of the uploaded adjective workbook**, and **six grammar lessons containing 36 gap exercises**. It is a curated study reference, not a claim to reproduce or validate all 500 verbs in the PDF.

The verb selection covers everyday language, auxiliary and modal verbs, and practical workshop vocabulary. **106 selected lemmas occur as separate entries in the extracted PDF.** Eight useful additions were checked separately in Den Danske Ordbog (DDO): `burde`, `reparere`, `montere`, `bore`, `slibe`, `skrue`, `aftale`, `parkere`.

Every stored principal form is explicit. The module does not create past forms, participles or imperatives by guessing endings. Code only assigns stable IDs, maps named fields and assembles auxiliary + participle study examples from these explicit forms.

## User-provided sources

1. **`verblist.pdf`**, titled *500 MOST COMMON VERBS IN DANISH*, 13 pages. PDF metadata lists author `anders basby` and creation date 2012-01-25. That is provenance, not an endorsement or a verified frequency ranking. The supplied text extraction is `verblist.txt`.
2. **`Danske_adjektiver_full_40.xlsx`**, read through supplied `Danske_adjektiver_full_40.parsed.json`. The 40 source rows and their order are preserved. Russian glosses are edited where a narrow translation would obscure normal usage.

Source fingerprints (SHA-256):

| File | SHA-256 |
| --- | --- |
| `verblist.pdf` | `be9e74ebfebab5626421e16a3e38daa81d2d9fc76cf83599e68d982d352d7fb3` |
| `verblist.txt` | `642bef0c18e8cba3e727fa205ee33d1896f7be745f3cf4f430329bc4a7113a54` |
| `Danske_adjektiver_full_40.parsed.json` | `b72342b02ad2defef95decdbb02e04d6970062c680c0363a0f26387c3586ac89` |

The PDF has transcription/spelling problems and simplifies auxiliaries to one default in several context-sensitive cases. It is therefore used as a selection and transcription aid, not copied wholesale. Examples outside the selected subset include `har bekræfted`, `havde forfundet` and `har fomået`. Within the selected subset the printed imperative `dreje` is corrected to **drej**.

## Primary language references

- [Sproget.dk: Verber (udsagnord)](https://sproget.dk/typiske-problemer/verber-udsagnord/): Danish form names, infinitive and imperative, irregular principal forms, participles with auxiliaries, and the difference between verbal and adjectival participles.
- [Sproget.dk: Grammatiske ord](https://sproget.dk/typiske-problemer/grammatiske-ord/): nutid, datid, førnutid and førdatid; future reference using both `vil` and present tense with a future time expression.
- [Sproget.dk / DDO: Hjælpeverber — være eller have?](https://sproget.dk/sprogviden/spoergsmaal-og-svar/den-danske-ordbog/hjaelpeverber-vaere-eller-have/): auxiliary choice depends on sense and construction, including `tage` with/without an object and `begynde` constructions. The article also records variation in actual usage; the lessons present a conservative beginner model, not a universal prohibition of every other usage.
- [Dansk Sprognævn: imperativ af åbne](https://sproget.dk/raad-og-regler/artikler-mv/svarbase/sv00007869/): spelling `åbn` and the possibility of natural paraphrases.
- [DDO](https://ordnet.dk/ddo/), published by Det Danske Sprog- og Litteraturselskab: principal forms and sense-specific usage. The entries below were opened for the irregular/auxiliary/modal checks; regular verbs otherwise retain the explicitly reviewed source forms.

### DDO checks for all irregular, auxiliary and modal rows

The pedagogical `group` field is an aid for filtering, not a complete linguistic classification of every historical conjugation pattern. For example, `vælge` has a vowel alternation and is grouped as irregular, while `lede` uses the regular `-te` model with a note on its distinct senses.

| Lemmas | Entries checked |
| --- | --- |
| være, have, blive, gøre | [være](https://ordnet.dk/ddo/ordbog/være), [have](https://ordnet.dk/ddo/ordbog/have_2), [blive](https://ordnet.dk/ddo/ordbog/blive), [gøre](https://ordnet.dk/ddo/ordbog/gøre) |
| kunne, skulle, ville, måtte, burde | [kunne](https://ordnet.dk/ddo/ordbog/kunne), [skulle](https://ordnet.dk/ddo/ordbog/skulle), [ville](https://ordnet.dk/ddo/ordbog/ville), [måtte](https://ordnet.dk/ddo/ordbog/måtte_2), [burde](https://ordnet.dk/ddo/ordbog/burde) |
| gå, komme, tage, give, se, sige | [gå](https://ordnet.dk/ddo/ordbog/gå), [komme](https://ordnet.dk/ddo/ordbog/komme), [tage](https://ordnet.dk/ddo/ordbog/tage), [give](https://ordnet.dk/ddo/ordbog/give), [se](https://ordnet.dk/ddo/ordbog/se), [sige](https://ordnet.dk/ddo/ordbog/sige) |
| finde, holde, lide, få, vide, forstå | [finde](https://ordnet.dk/ddo/ordbog/finde), [holde](https://ordnet.dk/ddo/ordbog/holde), [lide](https://ordnet.dk/ddo/ordbog/lide), [få](https://ordnet.dk/ddo/ordbog/få), [vide](https://ordnet.dk/ddo/ordbog/vide), [forstå](https://ordnet.dk/ddo/ordbog/forstå) |
| stå, sidde, ligge, lægge, sætte | [stå](https://ordnet.dk/ddo/ordbog/stå), [sidde](https://ordnet.dk/ddo/ordbog/sidde), [ligge](https://ordnet.dk/ddo/ordbog/ligge), [lægge](https://ordnet.dk/ddo/ordbog/lægge), [sætte](https://ordnet.dk/ddo/ordbog/sætte) |
| skrive, drikke, sove, hjælpe, vælge | [skrive](https://ordnet.dk/ddo/ordbog/skrive), [drikke](https://ordnet.dk/ddo/ordbog/drikke), [sove](https://ordnet.dk/ddo/ordbog/sove), [hjælpe](https://ordnet.dk/ddo/ordbog/hjælpe), [vælge](https://ordnet.dk/ddo/ordbog/vælge) |
| sælge, bringe, spørge, løbe, hedde | [sælge](https://ordnet.dk/ddo/ordbog/sælge), [bringe](https://ordnet.dk/ddo/ordbog/bringe), [spørge](https://ordnet.dk/ddo/ordbog/spørge), [løbe](https://ordnet.dk/ddo/ordbog/løbe), [hedde](https://ordnet.dk/ddo/ordbog/hedde) |
| fortælle, slibe, skære, bære, trække | [fortælle](https://ordnet.dk/ddo/ordbog/fortælle), [slibe](https://ordnet.dk/ddo/ordbog/slibe), [skære](https://ordnet.dk/ddo/ordbog/skære), [bære](https://ordnet.dk/ddo/ordbog/bære), [trække](https://ordnet.dk/ddo/ordbog/trække) |
| planlægge, tilbyde, modtage, falde, dø | [planlægge](https://ordnet.dk/ddo/ordbog/planlægge), [tilbyde](https://ordnet.dk/ddo/ordbog/tilbyde), [modtage](https://ordnet.dk/ddo/ordbog/modtage), [falde](https://ordnet.dk/ddo/ordbog/falde), [dø](https://ordnet.dk/ddo/ordbog/dø) |

Additional regular/sense checks: [lede](https://ordnet.dk/ddo/ordbog/lede_2), [køre](https://ordnet.dk/ddo/ordbog/køre), [møde](https://ordnet.dk/ddo/ordbog/møde), [reparere](https://ordnet.dk/ddo/ordbog/reparere), [montere](https://ordnet.dk/ddo/ordbog/montere), [kontrollere](https://ordnet.dk/ddo/ordbog/kontrollere), [bore](https://ordnet.dk/ddo/ordbog/bore), [rense](https://ordnet.dk/ddo/ordbog/rense), [skifte](https://ordnet.dk/ddo/ordbog/skifte), [skrue](https://ordnet.dk/ddo/ordbog/skrue), [aftale](https://ordnet.dk/ddo/ordbog/aftale), [parkere](https://ordnet.dk/ddo/ordbog/parkere), [dreje](https://ordnet.dk/ddo/ordbog/dreje), [trykke](https://ordnet.dk/ddo/ordbog/trykket).

### Important editorial distinctions

- **`lede` vs `lide`:** searching is `lede efter → ledte → ledt`; leading/directing additionally allows `ledede → ledet`. `Lide → led → lidt` means suffering; the ordinary liking expression is `kan lide`. The rare imperative `lid` is not taught as a way to tell somebody to like something.
- **`ligge` vs `lægge`:** intransitive location `ligger / lå / ligget`; placing an object `lægger / lagde / lagt`.
- **`trykke`:** pressing uses `trykkede / trykket`; printing uses `trykte / trykt`. The workshop row focuses on pressing and notes the other sense.
- **Imperatives:** `''` on modal rows means that an ordinary usable imperative is inapplicable to the taught modal use. It does not make a claim about every historical, literary or specialized use of a homographic form. Rare imperatives such as `vid`, `hed`, `men`, `behøv` are explicitly labelled in notes.
- **Auxiliaries:** `auxiliary` is exactly `har`, `er` or `har/er`. A mixed value always has an explicit note with contrasting constructions. It is not an invitation to substitute the two freely. Bare `stå` uses `har stået`; the separate expression `stå op` can use `er stået op`. `Har været` is retained for `være` itself. Passive `er repareret` must not be confused with active `har repareret`.
- **`møde` and `dreje`:** both retain `har/er`. Compare `har mødt en ven` with `er mødt på arbejde`; DDO's arrival/attendance sense of `møde` also allows `have`, so the note does not teach `er` as the sole possibility there. Compare object-taking `har drejet håndtaget` with direction-changing `er drejet til venstre` (DDO `dreje`, sense 1). The shared form-help builder includes both perfect and pluperfect auxiliary patterns and the contextual note; the `skal møde` gap still asks only for the infinitive.
- **Participles:** the table shows the verbal form after an auxiliary. It does not enumerate all adjectival participle inflections or all phrasal verbs (`dø hen/ud/bort`, for example, can have a different participial form).

## Adjective and quantity review

All 40 uploaded rows remain visible. Most source paradigms were retained; these rows need more than a one-to-one gloss:

| Row(s) | Editorial treatment | Primary checks |
| --- | --- | --- |
| `dårlig` | Retains `værre / værst` and explicitly adds the common `dårligere / dårligst`; the choice depends on sense and context. | [dårlig](https://ordnet.dk/ddo/ordbog/dårlig), [værre](https://ordnet.dk/ddo/ordbog/værre) |
| `lille` | `små` is the positive plural, not a comparative. `Mindre / mindst` express comparison of size. | [lille](https://ordnet.dk/ddo/ordbog/lille) |
| `få`, `mange`, `meget`, `lidt` | `wordClass: 'quantity'` distinguishes quantity expressions from ordinary descriptive adjectives for the learner. It is a pedagogical category, not an attempt to override DDO's formal word-class labels. Countable `mange/flere/flest` and `få/færre/færrest` are separated from uncountable `meget/mere/mest` and `lidt/mindre/mindst`. `Megen` is mentioned. | [få](https://ordnet.dk/ddo/ordbog/få), [mange](https://ordnet.dk/ddo/ordbog/mange), [megen](https://ordnet.dk/ddo/ordbog/megen), [lidt](https://ordnet.dk/ddo/ordbog/lidt) |
| `gal` | Uses ordinary `galere / galest`; preserves `mere gal / mest gal` as contextual alternatives in the note. Gloss broadened to reflect normal senses. | [gal](https://ordnet.dk/ddo/ordbog/gal) |
| `gul` | Uses `gulere / gulest`; the source's `mere gul / mest gul` is retained as an alternative in the note. Notes the less frequent superlative. | [gul](https://ordnet.dk/ddo/ordbog/gul) |
| `ensom` | Source `ensommere / ensomst` confirmed; no spurious extra `m` in the superlative. | [ensom](https://ordnet.dk/ddo/ordbog/ensom) |
| `frivillig`, `forelsket` | Periphrastic comparisons are retained with contextual limits; categorical senses do not automatically define a meaningful scale. | [frivillig](https://ordnet.dk/ddo/ordbog/frivillig) |

For ordinary adjective rows `wordClass` is `adjective`. The table gives uninflected comparison forms; a phrase before a definite noun may need another ending (`den bedste`, `den ældste`, `den mest forelskede`).

## Lessons and validation

Stable lesson IDs begin with `form-lesson-`. Two A1 lessons cover infinitives/imperatives and present forms; three A2 lessons cover past forms, perfect and future reference; one B1 lesson covers pluperfect. Every item has a natural Russian translation, an explicit `formLabel`, a short Russian explanation, and optional `formHelp` for the same verb. Help lists alternatives only where the reference note supplies the required context.

Future reference deliberately includes present tense with `i morgen`, `skal + infinitive` for a plan/obligation and `vil + infinitive` for desire/intention. No single universal future ending is invented. In the pluperfect exercises the target label selects **førdatid**: with an explicit `før` clause, datid can also form a natural sentence, but it is not the requested target form. The Russian sentence describes a completed event preceding the other past event.

Automated checks cover complete schema/identity, required common irregulars, contextual mixed auxiliaries, adjective distinctions, and all six lessons. Each gap has exactly one answer among four unique options, every accepted answer reconstructs an accepted full Danish sentence, and all gaps work through `createTasks` in easy/mixed/expert modes. Expert mode supplies no choices. Linguistic correctness also requires the editorial review above; option-count tests do not prove that every distractor is impossible in every conceivable context.

This file does not certify the other 394 PDF entries, provide a complete conjugation dictionary, or exhaust dialectal and stylistic variants. New rows should be checked as explicit forms and should preserve sense-specific auxiliary notes.
