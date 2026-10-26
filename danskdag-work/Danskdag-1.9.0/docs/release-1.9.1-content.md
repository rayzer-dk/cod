# Release 1.9.1: content and linguistic corrections

Scope: Danish data, Russian teaching text and Ukrainian locale files. Raw `original` fields were not touched. Every changed Russian literal got a new Ukrainian entry in `locales/uk/part-7-content.json` (old keys remain, unused); Ukrainian values edited in place keep their keys.

## Corrected

### Danish
- `basics-data.mjs` basics-numbers-4 / hundred-one: the hint no longer claims that `en` belongs to `elever`. Now: `en` is the numeral "one" (not an article), `elever` is plural.
- `dialogue-data.mjs` dialogue-b2-work (report) and dialogue-c1-work (figures): `inden middag` replaced with `inden klokken tolv`, because `middag` means dinner elsewhere in the course (spoken-tak-sidst, c-extra-b1-repair). Russian "до полудня" is still correct; the b2 teaching note was updated.
- `pronunciation-data.mjs` pron-stoed: the pair `jeg køber` / `en køber` (which does not illustrate stød) was replaced by `en hund` (with stød) / `hun` (without); note text updated. `docs/pronunciation-sources.md` no longer claims that Sproget.dk confirms the køber pair.
- `extended-curriculum.mjs` g-c1-extra-concession-6: `Selv med de forbedringer` to `Selv med disse forbedringer`.
- `vocabulary-extra-2.mjs` v-ae9e5c526407: `for handicappet ungdom` to `for handicappede unge`.
- `vocabulary.mjs` / `vocabulary-extra-4.mjs`: `Jeg skal bruge kran.` to `Jeg skal bruge en kran.`; `Pas på fingre.` to `Pas på fingrene.`.
- `vocabulary-extra-3.mjs` v-18106e382411: `Der er stor modsætning` to `Der er en stor modsætning`.
- `daily-lexicon-data.mjs` (social): `Hun giver mig en undskyldning.` (with the Russian "приносит извинения") to `Jeg skylder dig en undskyldning.` / "Я должен принести тебе извинения."
- `patterns-data.mjs` pf-koere / overkøre: example `Pas på ikke at overkøre den tabte taske.` to `Bilen overkørte næsten en cyklist.`.
- Build exercises that accepted only one word order now also accept the version with the adverbial in first position (V2 inversion) or the reverse (daAnswers; the token bank is built from the first form, so the same words are used):
  g-main-order-2, g-basic-pronouns-4, g-datid-2, g-perfect-5, g-conditionals-2 (two alternatives), day-2, past-0, past-1.

### Russian translations
- `Hej, jeg hedder Volodymyr` (vocabulary, vocabulary-extra-4): Russian field now "Владимир" instead of the Ukrainian form.
- `Han gik til stationen.`: "Он пошёл пешком на вокзал" to "Он пошёл на станцию."
- `Jeg kører til arbejde hver morgen.` (pf-koere): "на машине" removed.
- `Jeg skal møde klokken seks.` (content work-1): "быть на работе" to "явиться" (masculine and feminine variants).
- `God tur hjem!` (spoken-tur-hjem): "Счастливого пути домой!" (Ukrainian "Щасливої дороги додому!").
- `Det var sgu en god idé.`: "Это же была отличная идея." (the artificial contrast "А ведь" removed).
- content "En или et?": `en kop → koppen` is shown as "чашка → (та) чашка, определённая форма" (definiteness is not a demonstrative); same for glas.

### Ukrainian locale
- `указує/указуєш/указувати/указано/указують` to `вказ-` forms.
- `хороший/хороша/хороші` replaced by `гарний` or `добрий` depending on context.
- `везучий` to "кому щастить" (heldig entry).
- forms-data gå/ringede note: the Ukrainian said a phone rang; it now says "до того, як я зателефонував", as in Danish and Russian.
- ASCII apostrophe `'` between Ukrainian letters replaced with `’` (U+2019); no ASCII apostrophe is left in the Ukrainian files.

## Requires checking against ordnet.dk (not changed or not fully certain)
- `cigaretskod` (document-vocabulary idx 245, id doc-d9febad5f177): the entry says `et cigaretskod` with plural `cigaretskod`. The gender is probably common (`en cigaretskod`), but this was not verified, so it was left unchanged. The word, the example sentence and the note must be corrected together once confirmed.
- `hun` / `hund` as the stød pair: a classic example, but the exact dictionary notation was not checked for this release. `mand` / `man` was already in the guide.
- `overkøre` and its example `Bilen overkørte næsten en cyklist.`: check that the verb entry and the senses (running over people or animals) match.
- `Jeg skylder dig en undskyldning.`: a common phrase; check that "skylde nogen en undskyldning" has the expected meaning.
- appointments-1 `Passer det dig på fredag?`: no safe second word order found, still a single-order build item.
- Outside this scope: the profile-name placeholder in `app.mjs` ("Например, Володимир") still contains the Ukrainian spelling in the Russian text.
