# Reviewed vocabulary from the two additional dictionaries

Reviewed on 2026-10-24. The original workbooks remain unchanged. The importer reads their first worksheet and uses the actual Excel row numbers, including gaps. The existing vocabulary and its IDs are unchanged.

| Workbook | Danish column | Russian column | Nonempty data rows | Rows adding cards | Existing/duplicate rows | Review rows | Excluded rows | New cards |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Датские слова мои.xlsx | A | C | 386 | 47 | 327 | 9 | 3 | 48 |
| Нужные слова ДАТСКИЙ.xlsx | B | A | 325 | 262 | 61 | 2 | 0 | 283 |
| Total | | | 711 | 309 | 388 | 11 | 3 | 331 |

The first workbook has a blank row 310 and a section heading at row 311. Header row 1 and the blank row are not counted as data. The section heading is counted as excluded. Some source rows contribute two cards when two words were combined or when the original Danish word and intended Russian meaning require different corrected words. For example, `lim` is glue and `lime` is to glue; both are grounded in the same source row. This accounts for the difference between 309 source rows and 331 cards.

`dist/document-vocabulary.mjs` exports:

- `documentVocabulary`: 331 reviewed cards, each with a stable `doc-…` ID, Danish/Russian meaning, an original Danish example and translation, a semantic memory association, and workbook/row provenance.
- `documentNeedsReview`: 11 records with `verified:false`; these are excluded from training.
- `documentImportSummary`: reconciled counts per workbook and in total.
- `documentSourceAudit`: one status record for every nonempty source data row.

The original pronunciation columns are deliberately omitted. Cyrillic approximations are not presented as Danish pronunciation. The examples and associations were written for this app; dictionary quotations were not copied into the cards. `verified:true` records the semantic review of these cards, not an assertion that every everyday headword was individually looked up externally. Uncertain or specialist cases received the targeted source checks below.

## Corrections and deduplication

Deduplication compares the current enriched vocabulary, course card texts, and accepted Danish answers after Unicode normalization, case folding, removal of a leading `at`, `en`, or `et`, punctuation normalization, and whitespace normalization. It also deduplicates the additions against one another. Explicit row equivalences cover combinations, conjugations, and corrected spellings. A standalone headword is kept when only longer example sentences exist; `gå` and `finde ud af` are useful headword cards even though a sentence elsewhere may contain those words.

Existing unverified records are retained in the existing review system and are not silently upgraded by a duplicate source. In particular, a repeated ambiguous `forlængerled` or `mejemaskine` is not made verified merely because it appears in another workbook.

Notable source errors corrected in the new cards:

| Original or ambiguity | Reviewed teaching |
| --- | --- |
| gratis = свободно | gratis = бесплатно; ledig describes availability |
| tage afsted = снять | tage afsted = отправляться; tage af = снимать одежду |
| alkove = беседка | alkove = ниша для кровати / альков |
| rat = прав | rat = руль |
| urskive = набрать | urskive = циферблат |
| ledning / tråd / gevind conflation | electrical wire / thread or wire / screw thread distinguished |
| plade = тарелка, etage = пол, kop = стакан | plade = пластина, etage = этаж, kop = чашка; intended tallerken, gulv, glas added |
| batteri in a heating context | batteri = батарейка/аккумулятор; radiator = батарея отопления |
| sifon in a plumbing context | beverage sifon distinguished from plumbing vandlås |
| dække = покрывало | general covering distinguished from sengetæppe |
| gyvel = веник | gyvel = ракитник; feje = подметать; existing kost = метла |
| noun/verb mismatches | lim/lime, søm/sømme, reparation/reparere, opdatering/opdatere, røg/ryge, fangst/fange distinguished |
| adjective/adverb/verb mismatches | ren/rense, åben/åbne, tæt/lukke, hurtig/hurtigt, farlig/farligt explained |
| Danish floor numbering | anden etage is normally the third floor in Russian numbering; stueetagen is the ground/first floor |
| past-tense -ede | identifies past tense; does not assert grammatical perfectivity |

## Targeted primary-source checks

Den Danske Ordbog (DDO) is published by Det Danske Sprog- og Litteraturselskab. These entries were consulted directly or through indexed dictionary content:

| Source | Review conclusion |
| --- | --- |
| [DDO: gratis](https://ordnet.dk/ddo/ordbog/gratis) | Means without payment; does not mean an available hotel room. |
| [DDO: af sted / afsted](https://ordnet.dk/ddo/ordbog/afsted) | Movement away; includes tage af sted. Both spellings are accepted in the card. |
| [DDO: alkove](https://ordnet.dk/ddo/ordbog/alkove) | Sleeping niche; corrected the garden-gazebo mistranslation. |
| [DDO: urskive](https://ordnet.dk/ddo/ordbog/urskive) | Clock face with numbers and hands. |
| [DDO: gyvel](https://ordnet.dk/ddo/ordbog/gyvel) | Flowering shrub; not a household broom. |
| [DDO: sifon](https://ordnet.dk/ddo/ordbog/sifon) | Beverage bottle dispensing under gas pressure; distinguished from the under-sink trap. |
| [DDO: natlys](https://ordnet.dk/ddo/ordbog/natlys) | Sense 2 is weak light at night; the unrelated plant meaning is not the chosen context. |
| [DDO: dække](https://ordnet.dk/ddo/ordbog/dække_1) | Noun meaning covering/layer, distinct from the verb and a bedspread. |
| [DDO: sengetæppe](https://ordnet.dk/ddo/ordbog/sengetæppe) | Covering laid over a bed. |
| [DDO: radiator](https://ordnet.dk/ddo/ordbog/radiator) | Appliance heating a room. |
| [DDO: lim / lime](https://ordnet.dk/ddo/ordbog/lim) | Glue noun and gluing verb are separate grammatical entries. |
| [DDO: etage](https://ordnet.dk/ddo/ordbog/etage) | Sense 1.b: first etage is the first level above ground; addresses Russian/Danish numbering mismatch. |
| [Unidrain: vandlås](https://www.unidrain.dk/vandlaas/) | Manufacturer terminology for a drain's water trap. |
| [Waterless: siphon/vandlås](https://waterless.dk/wp-content/uploads/2025/10/0618-Ren-Instr-Siphon-DK_24.pdf) | Manufacturer's bilingual naming corroborates the siphon/water-trap relationship. No operating instructions were imported. |
| [Fillpartner: Jerrycan](https://www.fillpartner.com/da/jerrycan) | Manufacturer uses jerrycan for a fuel container; retained the established loan term. |
| [Banedanmark: Sporteknik](https://www.bane.dk/-/media/Bane/Gamle/Presse/Temasider/Sporteknik_2udgave_2oplagx_compressed.pdf) | Primary technical usage of korrugering as waves/ridges; the card teaches the physical profile/process, not an unspecified hose product. |

A DDO check of [rummelig](https://ordnet.dk/ddo/ordbog/rummelig) also confirms roomy/spacious and figurative tolerant. That adjective belongs to the separate adjective/form work and is not added from these two dictionaries.

## Unresolved and excluded rows

| Workbook | Rows | Handling |
| --- | --- | --- |
| Датские слова мои | 28 | English Attention / ambiguous att. retained for review. |
| Датские слова мои | 57 | Nonstandard phonetic Di va so lit and incompatible translation: no guessed correction. |
| Датские слова мои | 200, 219, 272 | Ombyggelig, ratning, Tåber: spelling/meaning ambiguity requires context. |
| Датские слова мои | 288, 346 | Medical fragments excluded from training; their review metadata is redacted. |
| Датские слова мои | 331 | English drive board needs confirmed Danish terminology. |
| Датские слова мои | 348 | Hovedværn does not mean hearing protection; source needs clarification. |
| Нужные слова ДАТСКИЙ | 185, 205 | English forward and incomplete odliste are retained for review. |
| Датские слова мои | 311, 312, 342 | Section heading and two medication-related notes excluded, without reproducing their contents. |

Ordinary medical vocabulary already present in the original corpus remains unchanged. No medication instructions, dosage claims, personal health notes, or farm treatment procedures were added.

## Rebuild and verification

```sh
python tools/import-document-vocabulary.py '/path/to/Датские слова мои.xlsx' '/path/to/Нужные слова ДАТСКИЙ.xlsx'
node --test tests/document-vocabulary.test.mjs
```

The importer also accepts the read-only `.parsed.json` extractions. Rebuilding from the actual XLSX files and rebuilding from their JSON extractions produced byte-identical output. The tests cover provenance, context/associations, unique IDs and normalized headwords, mistranslation regressions, excluded material, and complete source-row accounting.

Original workbook SHA-256 values:

```text
9fd8927b7c806f3b6bca7118c961f5f111296b451c2499ae5ceb129654a06cd0  Датские слова мои.xlsx
420e775b162f44b24b9042271b3924d8247ce1932c41649500fbe91e680b54e8  Нужные слова ДАТСКИЙ.xlsx
```
