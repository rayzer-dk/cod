// All PD3 content in one place for the app. The tests give the page their own fixtures instead.
import {readingPractice} from './pd3-reading-practice-data.mjs';
import {readingExamFind as findBase,readingExamText as textBase} from './pd3-reading-exam-data.mjs';
import {readingExamFindMore} from './pd3-reading-find-more-data.mjs';
import {readingExamTextMore} from './pd3-reading-text-more-data.mjs';
const readingExamFind=[...findBase,...readingExamFindMore],readingExamText=[...textBase,...readingExamTextMore];
import {dictations} from './pd3-dictation-data.mjs';
import {listening} from './pd3-listening-data.mjs';
import {oralMonologue,oralInterview,oralInteraction,oralDiscussion,oralPhrases,oralCriteria} from './pd3-oral-data.mjs';
import {writingEmail,writingTask,writingCriteria,connectors} from './pd3-writing-data.mjs';
import {grammarSetsA} from './pd3-grammar-a-data.mjs';
import {grammarSetsB,grammarCategories} from './pd3-grammar-b-data.mjs';
const grammarSets=[...grammarSetsA,...grammarSetsB];
export const pd3Data={readingPractice,readingExamFind,readingExamText,dictations,listening,oralMonologue,oralInterview,oralInteraction,oralDiscussion,oralPhrases,oralCriteria,writingEmail,writingTask,writingCriteria,connectors,grammarSets,grammarCategories};
