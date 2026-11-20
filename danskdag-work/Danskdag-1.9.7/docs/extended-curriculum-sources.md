# Supplementary Danish curriculum

`dist/extended-curriculum.mjs` contains original supplementary practice, authored for this app on 2026-10-23. Source material was consulted for grammar and usage, not copied as exercise text.

## Scope and integration

| Export | Lessons | Items | Level split |
| --- | ---: | ---: | --- |
| `advancedLessons` | 20 | 120 | 10 B2, 10 C1 |
| `extraConversationLessons` | 12 | 72 | 4 A2, 4 B1, 2 B2, 2 C1 |
| Total | 32 | 192 | Six items per lesson |

Advanced lessons apply subordinate word order, timelines, passive forms, modality, explanation, negotiation, reporting, instruction comprehension, email and relative reference. The C1 extension adds concessions, mixed counterfactuals, probability, formal requests, parallel structures, contingency, agency, aspect, precise objections and limits on claims. These are intended practice bands, not an exhaustive CEFR curriculum or evidence that completing the app establishes proficiency.

The conversation lessons are twelve short six-turn scenes. Each item is one participant's replica, with a Russian translation and a note that states the role or immediate context. Informal spellings such as `hva’`, `ikk’`, `ka’` and `sku’` are examples of writing that imitates speech, not phonetic transcriptions. Full standard Danish alternatives and straight-apostrophe variants are explicitly accepted on those items. Sku’ represents skulle and is distinguished from sgu. Danish speech playback remains the existing browser speech feature; this addition supplies no recorded or assessed pronunciation.

The module follows the existing lesson schema: grammar/conversation `kind`, `level`, `rule`, `subtitle`, `icon`, `color`, six `items`, stable lesson-prefixed item IDs, and `lessonId` on every item. Grammar items use existing `gap` structures or ordinary sentence tasks. Forty gaps have explicit choices and answers: two per advanced lesson. Existing learning modes decide the rendered exercise type. The module adds no UI task kinds.

Translations and answer variants are deliberately finite. Alternatives are included for meaningful grammatical variants, standard spellings, common Russian renderings, and selected gender differences. They cannot enumerate every correct paraphrase. Workplace safety, service and transport examples are invented language-learning situations, not equipment-specific instructions, store policies or live route information.

## Primary Danish references consulted

All links below were checked on 2026-10-23.

| Reference | URL | Use in authoring |
| --- | --- | --- |
| sproget.dk, *Ledsætninger* | https://sproget.dk/typiske-problemer/ledsaetninger/ | Subordinate clause boundaries, indirect questions, placement of ikke and inversion after an initial clause. The course teaches the neutral standard pattern without claiming it describes every spoken construction. |
| sproget.dk / Dansk Sprog- og Litteraturselskab, *Passivformer i DDO*, Henrik Lorentzen, December 2019 | https://sproget.dk/sprogviden/spoergsmaal-og-svar/den-danske-ordbog/passivformer-i-ddo/ | Context-sensitive distinction between s-passive and blive-passive; avoiding a rigid procedure-versus-event rule. |
| Dansk Sprognævn, *Grammatisk talt* | https://dsn.dk/wp-content/uploads/2021/01/Grammatisk_talt_OCR_web_lav.pdf | Cross-check of standard grammar terminology and passive construction names. |
| Den Danske Ordbog, *apostrof* | https://ordnet.dk/ddo/ordbog/apostrof | Apostrophe as an omission marker; separation of informal speech representation from ordinary formal spelling. |
| Den Danske Ordbog, *vist* | https://ordnet.dk/ddo/ordbog/vist | Probability and softening functions in everyday speech; concessions with ganske vist. |
| Den Danske Ordbog, *vi* | https://ordnet.dk/ddo/ordbog/vi_2 | Spoken expression tage den derfra and its limited planning horizon. |
| Den Danske Ordbog, *forbehold* | https://www.ordnet.dk/ddo/ordbog/forbehold | Reservations, uncertainty, and tage forbehold for. |
| Den Danske Ordbog, *lade* | https://ordnet.dk/ddo/ordbog/lade | Lade + object + bare infinitive and the distinction between permitting and causing an action. |
| Den Danske Ordbog, *være* | https://ordnet.dk/ddo/ordbog/v%C3%A6re | Formal være sig construction used for alternatives. |

The references support the grammatical and usage points; lesson selection, level tags, translations, dialogue situations and explanatory wording are editorial decisions for this application. No source certifies the lesson allocation or every authored sentence.

## Verification

Standalone checks imported the module and confirmed the exact export counts and level splits, six items per lesson, required schema fields, lessonId relationships and unique IDs. Normalized Danish sentences were compared with the existing grammar, conversation and contextual lessons; no duplicates were found.

Every gap answer reconstructs its canonical sentence or an explicitly accepted grammatical alternative and occurs in its explicit options. All 192 items were passed through the existing engine in easy, mixed, expert and auto modes (768 generated tasks). Canonical answers passed `checkTask`, choice tasks contained an accepted answer, and generated word banks reconstructed accepted Danish answers. This verifies data/engine compatibility, not independent native-speaker certification. Browser presentation and overall course integration are verified separately by the integrating task.

Final review also checked gide/orke against https://ordnet.dk/ddo/ordbog/gide and clarified that irritation depends on context. The der/som and hvorvidt/om gaps explicitly accept both taught connectors.
