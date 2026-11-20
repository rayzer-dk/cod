# Word-class reference data

Verified 2026-10-23. The Danish sentences and Russian translations in `dist/word-classes-data.mjs` are original teaching examples. Source links support terminology, classification and grammatical explanations; the examples are not quotations.

The data contains 10 teaching categories and 40 contextual examples. Nine category cards use the app's A1 label; conjunctions use A2 because the card introduces subordinate-clause word order. These are editorial difficulty labels, not an official CEFR classification of word classes.

| Topic | Verified primary source | Use in the data |
| --- | --- | --- |
| Main taxonomy | [Sproget.dk: Ordklasser](https://sproget.dk/typiske-problemer/ordklasser/) | Danish names, contextual ambiguity, lexical class versus grammatical function |
| International and everyday Danish names | [Sproget.dk: Grammatiske ord](https://sproget.dk/typiske-problemer/grammatiske-ord/) | Substantiv/navneord etc.; quantity and ordinal numerals |
| Nouns | [Sproget.dk: Substantiver](https://sproget.dk/typiske-problemer/substantiver-navneord/) | Gender, number, definiteness, proper names |
| Verbs | [Sproget.dk: Verber](https://sproget.dk/typiske-problemer/verber-udsagnord/) | Actions and states; infinitive, present, past and participle |
| Adjectives | [Sproget.dk: Adjektiver](https://sproget.dk/typiske-problemer/adjektiver-tillaegsord/) | Agreement and comparison |
| Adverbs | [Sproget.dk: Adverbier](https://sproget.dk/typiske-problemer/adverbier-biord/) | Time, place, degree, negation, usually no inflection |
| Pronouns | [Sproget.dk: Pronomener](https://sproget.dk/typiske-problemer/pronomener-stedord/) | Personal and possessive forms; interrogative `hvad`; pronouns after prepositions |
| At | [Den Danske Ordbog: at](https://ordnet.dk/ddo/ordbog/at) | Separate conjunction and infinitive-particle entries |
| En/et | [Den Danske Ordbog: en](https://ordnet.dk/ddo/ordbog/en) | Separate numeral, article and pronoun entries |
| Hvor | [Den Danske Ordbog: hvor](https://ordnet.dk/ddo/ordbog/hvor) | Interrogative place adverb |
| På and og | [DDO: på](https://ordnet.dk/ddo/ordbog?query=p%C3%A5), [DDO: og](https://ordnet.dk/ddo/ordbog/og) | Preposition and conjunction in the selected contexts |
| Hej | [Den Danske Ordbog: hej](https://ordnet.dk/ddo/ordbog/hej) | Greeting classified as an interjection |
| Terminology and definitions | [Dansk Sprognævn: Grammatisk talt](https://dsn.dk/wp-content/uploads/2021/01/Grammatisk_talt_OCR_web_lav.pdf) | Articles, numerals, prepositions and interjections; historical terminology reference, not a claim about the latest spelling dictionary |
| Alternative taxonomies | [Eva Skafte Jensen (2016): Ordklassepotentiale](https://tidsskrift.dk/nfg/article/download/24646/21594/57090), pp. 95–96 | Original scholarly comparison of Danish systems; Hansen & Heltoft treat articles together with pronouns |

## Classification decisions for recognition exercises

- The requested ten categories are a teaching selection. Sproget.dk lists eleven under the Retskrivningsordbogen system because it separates `udråbsord` and `lydord`. Do not introduce this selection as the one universally exhaustive list of Danish word classes.
- Articles are a separate category here, following Sproget.dk. Jensen's paper, pp. 95–96, explicitly documents the alternative in Hansen & Heltoft, where articles are described as a particular use of pronouns. The learner card mentions the difference without requiring the learner to resolve the theoretical question.
- Sproget.dk distinguishes lexical word class from function. Its `selvstændigt` example is an adjective used adverbially and remains an adjective. Therefore the adverb recognition targets are unambiguous `ikke`, `altid`, `her`, `Hvor`. `Hurtigt` is targeted only in `et hurtigt tog`, where both the lexical class and the noun-modifying function are clear. The contrast notes explain `hun løber hurtigt` without grading it as a lexical adverb in this scheme.
- `At` is a conjunction only in the example `Jeg ved, at du kommer.` In `at fyre`, it is an infinitive marker/particle, outside the ten target categories. Recognition tasks must target `fyre`, not the infinitive marker.
- `En/et` needs context and stress. The article examples have neutral unstressed readings. `Kun én nøgle, ikke to` explicitly contrasts quantities and targets a numeral. The accent is helpful but not a general requirement to write every numeral one with an accent.
- In `huset`, the complete target is a noun. The attached definite article `-et` is not independently selectable as a whole-word target. Separate articles are targeted before nouns/adjectives.
- `Den/det/de` can be articles or pronouns. Article examples intentionally include an adjective plus a noun, with a neutral reading. Do not generate decontextualized `den = article` or `de = pronoun` questions.
- `Leder` provides an exact-spelling noun/verb contrast. `En fyr` and `at fyre` are different lexical words/forms, not proof that the spelling `fyr` always changes class; the card says this explicitly.
- The cue questions are memory aids, not sufficient classification tests. For example, `hvad` can ask about a noun phrase while itself belonging to the pronoun class; an entire preposition phrase can answer a place question.
- All examples contain exactly one whole-word instance of their stated target, including the initial capitalization where present. Inflected targets are intentional.
