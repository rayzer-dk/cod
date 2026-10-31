# Advanced conversation material

Authored and checked on 2026-10-25. `dist/dialogue-data.mjs` exports 12 lessons: six marked B2 and six marked C1, with six independent response tasks per lesson. There are 72 model responses, 72 additional complete Danish alternatives, and Russian setup, partner translation, response translation and teaching note for each task.

All situations and example sentences are original teaching material. Dictionary definitions and corpus examples have not been copied into the exercises. The dictionary work below is a targeted check of selected meanings and constructions, not a claim that an external editor has approved every sentence.

## Level design

[Council of Europe: CEFR Table 3, qualitative aspects of spoken language use](https://www.coe.int/en/web/common-European-framework-reference-languages/table-3-cefr-3.3-common-reference-levels-qualitative-aspects-of-spoken-language-use) was consulted for the distinction between giving clear viewpoints and managing familiar interaction at B2, and selecting appropriate expressions, relating a contribution to another speaker and keeping the floor at C1. The table was available through the search index; direct page retrieval initially failed and a later retrieval returned mainly navigation.

The B2/C1 labels are editorial difficulty groupings inspired by those descriptions. These short exercises are not a validated CEFR curriculum, a level assessment, or sufficient evidence that a learner can sustain B2/C1 spoken interaction. Familiar subject matter can support C1 practice when the task demands precision, tact, reformulation or negotiation; advanced level does not require turning a spoken reply into a formal essay.

The six settings recur at both levels: workplace deadlines and disagreement; social arrangements and refusal; faulty purchases; housing repairs and neighbours; phone appointments and clarification; everyday opinions. C1 adds partial agreement, conditional acceptance, correcting an attributed position, preserving a boundary and resuming an interrupted point. Each turn contains its own setup and intended content, so randomised practice does not depend on earlier turns.

## Targeted Danish checks

The primary Danish reference is **Den Danske Ordbog**, published by Det Danske Sprog- og Litteraturselskab (DSL):

| Reference | Check applied to the authored material |
| --- | --- |
| [egentlig](https://ordnet.dk/ddo/ordbog/egentlig) | The adverb entry includes a spoken use that tones down a position or admission. This informed the C1 work task that redirects an accusation toward the actual problem, unclear responsibilities. It is not taught as a compulsory filler. |
| [til gengæld](https://ordnet.dk/ddo/ordbog/59003070) | The entry distinguishes contrast/compensation from a reciprocal return. The B2 home/office reply uses contrast; the C1 shared-housework reply offers an exchange of tasks. |
| [kompromis](https://ordnet.dk/ddo/ordbog/kompromis) | The entry describes agreements involving mutual concessions and a middle solution. This informed the lesson approach to concrete conditions and an acceptable next step, rather than treating every refusal as a compromise. |
| [forbehold](https://ordnet.dk/ddo/ordbog/forbehold) | The noun entry distinguishes uncertainty, a condition/exception and a reservation toward a proposal. The C1 tasks practise these distinctions through ordinary spoken clauses, without requiring the noun itself. |
| [afbryde](https://ordnet.dk/ddo/ordbog/afbryde) | The verb entry covers stopping a connection/activity and interrupting another speaker. The phone and discussion tasks keep those senses distinct in their context and translations. |

Direct URLs and indexed dictionary results were consulted. Selected conventional phrasing was also checked during the editorial pass for a consistent ordinary spelling suitable for answer display and text-to-speech. No reduced speech spellings are required from the learner.

## Response and grading boundaries

Every authored response and alternative contains 10–28 whitespace-separated words. Responses are one or two spoken-style sentences where appropriate; a clarification can use a brief introductory phrase. All accepted alternatives preserve the concrete content requested in the Russian task. They are complete responses, not bags of interchangeable words.

The finite answer lists deliberately cannot cover every valid Danish response. Matching against those lists supports guided practice; the existing self-check flow remains necessary for reasonable responses outside the lists. A self-check is a learner judgement, not an external linguistic assessment. This dataset provides neither an AI conversation partner nor open-ended response grading, speech recognition, listening assessment, pronunciation scoring or native-speaker validation. Playing a partner utterance with text-to-speech does not change those limits.

The consumer, housing, clinic and workplace scenarios teach communication. They do not establish legal rights, medical requirements, contractual rules or obligations; the speaker asks or negotiates within an invented situation. Russian translations prioritise the communicative meaning. Where Russian past tense needs a grammatical gender, a conventional masculine form is used without restricting who may practise the reply.

## Verification

`tests/dialogue-data.test.mjs` was written first and failed with explicit missing-catalogue assertions before the module existed. It checks counts, levels, six-item session boundaries, distinct identities, required bilingual scenario fields, two complete Danish alternatives per item, response length, standard spelling and coverage of the six settings at both levels. These structural tests complement the editorial review; they do not establish CEFR validity or exhaustive linguistic correctness.
