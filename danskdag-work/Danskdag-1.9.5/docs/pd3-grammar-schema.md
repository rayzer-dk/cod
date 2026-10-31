# PD3 grammar (B2, exam format): data schema

Module `dist/pd3-grammar-data.mjs` (plain ES module, no imports) exports `grammarCategories` and `grammarSets`. Content authors write two files that the orchestrator concatenates in `pd3-data.mjs`: `dist/pd3-grammar-a-data.mjs` (exports `grammarSetsA`, sets `gram-1`…`gram-6`) and `dist/pd3-grammar-b-data.mjs` (exports `grammarSetsB`, sets `gram-7`…`gram-12`, and also `grammarCategories`). Danish text has no Cyrillic; every string with Cyrillic needs a Ukrainian entry in `locales/uk/part-NN-*.json` (key = first 16 hex chars of sha256 of the Russian string).

Level: B2. The task types imitate what Prøve i Dansk 3 asks of a candidate (choose the form that fits, correct an error, rewrite a sentence, order the words); this is practice, not the official exam.

```js
export const grammarCategories = [          // fixed list of 12 ids, in this order
  {id:'v2',        title:'Порядок слов: V2 и инверсия',           tip:'Russian: 2-3 sentences, the rule in short'},
  {id:'bisaet',    title:'Придаточные: порядок слов (ikke, aldrig, ofte…)', tip},
  {id:'passive',   title:'Пассив (-s, blive + причастие)',          tip},
  {id:'tenses',    title:'Времена: præteritum, perfektum, pluskvamperfektum', tip},
  {id:'relative',  title:'Относительные и вопросительные слова (som, der, hvad, hvilken)', tip},
  {id:'connect',   title:'Союзы и связки (fordi, selvom, medmindre, derfor…)', tip},
  {id:'prep',      title:'Предлоги и устойчивые сочетания',        tip},
  {id:'agree',     title:'Согласование: род, число, определённость', tip},
  {id:'reflex',    title:'Возвратные и притяжательные (sin/hans/hendes, sig)', tip},
  {id:'modal',     title:'Модальные глаголы и инфинитив (at / без at)', tip},
  {id:'compare',   title:'Степени сравнения и количество (mere, flere, færre, mest)', tip},
  {id:'cond',      title:'Условные и желательные конструкции (hvis, ville, kunne, havde)', tip}
];

export const grammarSets = [{                // 12 sets of 10 items
  id:'gram-1', title:'Danish or Russian short title', level:'B2', minutes:15,
  items:[ item, ... ]                        // exactly 10; 3 of type gap, 2 fix, 2 transform, 2 order, 1 cloze (order of appearance mixed)
}];
```

Item types (all items have `id` unique across all sets, `cat` = a category id, `why` = Russian explanation, 1-3 sentences, naming the rule and what is wrong with the distractors / the error):

```js
{id:'g1-01', cat:'v2', type:'gap',
 stem:'Danish sentence with exactly one ___',        options:['..','..','..','..'], answer:2, why}
   // exactly one option fits both grammar and meaning; distractors are plausible look-alikes (same word class)

{id:'g1-02', cat:'bisaet', type:'fix',
 sentence:'Danish sentence with exactly ONE error, written as shown to the learner',
 errorIndex:4,                                       // index of the wrong token in sentence.split(' ') (punctuation attached to the token)
 fixes:['rigtigt','rigtigt,'],                       // accepted corrected tokens (compare ignoring case; punctuation attached as in the sentence)
 why}
   // the error is a real learner error (word order, form, preposition, article, agreement); fixing the single token must give a fully correct sentence

{id:'g1-03', cat:'passive', type:'transform',
 prompt:'Danish source sentence',
 instruction:'Russian instruction, e.g. "Перепиши в пассиве (-s) без изменения смысла." / "Начни с: I går …"',
 answers:['accepted sentence 1','accepted sentence 2'],   // all fully correct rewrites a competent speaker would give (2-4 variants); case and end punctuation are ignored by the checker
 why}

{id:'g1-04', cat:'v2', type:'order',
 tokens:['shuffled','tokens','of','the','sentence'],   // 5-12 tokens, shuffled; punctuation attached to its token
 answers:['Correct sentence 1.','Correct sentence 2.'],  // every grammatical ordering the checker should accept (at least one; add the fronted-adverbial variant when it is correct); each answer uses exactly the tokens
 why}

{id:'g1-05', cat:'connect', type:'cloze',
 segments:['Danish text, ', {gap:1, options:['..','..','..','..'], answer:0}, ' text ', {gap:2, options:[...], answer:3}, ' ...'],   // short text 50-90 words with 4-5 gaps, 4 options each, one fitting option per gap
 why}
```
Rules for authors: natural B2 Danish for learners; fictional names; no invented facts about real institutions; no item may be solvable by a second option; `fix` and `transform` must have an unambiguous, fully specified correction; every set covers at least 6 different categories and every category appears at least 10 times across the 12 sets; answers spread over the option positions (no more than 40% on one position per set); no sentence repeated between items or sets. Russian text (`why`, `instruction`, `tip`, `title` labels) is precise and short.
