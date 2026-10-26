# Beginner numbers and reading

Reviewed 2026-10-25. All phrases, passages, translations, questions and distractors are original teaching material, not excerpts from a textbook. A1 indicates the intended difficulty of these short exercises.

## Danish number conventions

- [Dansk Sprognævn, Retskrivningsordbogen §19.4](https://ro.dsn.dk/?paragraf=19&type=rulesearch): number words below 100 are joined; hundreds and thousands use spaces. The rule illustrates `to hundrede (og) niogtyve`, `tre tusind to hundrede (og) niogtyve` and `tre tusind og tyve`. The converter chooses `hundrede`, `tusind` and the optional `og` before a remainder below one hundred. It omits `og` between the thousand and hundred groups, matching the cited example.
- [Dansk Sprognævn, gender in large numbers, 2019](https://sproget.dk/sprogviden/spoergsmaal-og-svar/dansk-sprognaevn/sv00017853/): `et hundrede og en` and `et tusinde og en`; the opening `et` agrees with the large-number noun. A following noun can change the final `en` to `et`. The standalone converter uses the counting form `en`.
- [Dansk Sprognævn, Danish tens, 2006](https://sproget.dk/sprogviden/spoergsmaal-og-svar/dansk-sprognaevn/sv00000047/): contemporary forms `halvtreds`, `tres`, `halvfjerds`, `firs`, `halvfems` and their historical origin. Teaching emphasizes remembering current whole words, without treating `halvtreds` as half of thirty.
- [Den Danske Ordbog: enogtyve](https://ordnet.dk/ddo/ordbog/enogtyve), [hundrede](https://ordnet.dk/ddo/ordbog/hundrede), [halvfjerds](https://ordnet.dk/ddo/ordbog/halvfjerds): modern headwords and dictionary pronunciation/audio reference.

The converter deliberately supports cardinal integers from 0 through 9999 only. Its output reads a quantity. It does not infer a noun's gender, read years with their alternative conventions, spell phone numbers digit by digit, produce ordinals, or interpret decimal prices. The input explains this scope.

## Pronunciation and reading

The interface sends standard Danish words or complete sentences to the app's existing Danish speech control. Device speech synthesis is practice support and can vary by installed voice; this addition makes no new phonetic transcription and gives no Cyrillic pronunciation approximations. Dictionary headwords above provide an independent pronunciation reference.

Three six-sentence passages use familiar present-tense information: a person's family and work, a café purchase, and a bus trip to school. `Klokken otte` is used only for the exact hour in an explicit morning context. Each passage has six distinct comprehension questions, one accepted option and three distractors. Questions and accepted answers use the application's base-language slot and compile into Ukrainian with the authored catalog.

Canonical Russian text remains the source format for compatibility; `locales/uk/basics.json` provides Ukrainian translations keyed by the project's SHA-256 source-text convention. Danish text and speech payloads remain unchanged.
