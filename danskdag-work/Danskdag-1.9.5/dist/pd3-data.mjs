// All PD3 content in one place for the app. The tests give the page their own fixtures instead.
import {readingPractice} from './pd3-reading-practice-data.mjs';
import {readingExamFind as findBase,readingExamText as textBase} from './pd3-reading-exam-data.mjs';
import {readingExamFindMore} from './pd3-reading-find-more-data.mjs';
import {readingExamTextMore} from './pd3-reading-text-more-data.mjs';
const readingExamFind=[...findBase,...readingExamFindMore],readingExamText=[...textBase,...readingExamTextMore];
import {dictations as dictationsBase} from './pd3-dictation-data.mjs';
import {dictationsMore} from './pd3-dictation-more-data.mjs';
import {listening as listeningBase} from './pd3-listening-data.mjs';
import {listeningMore} from './pd3-listening-more-data.mjs';
const dictations=[...dictationsBase,...dictationsMore],listening=[...listeningBase,...listeningMore];
import {oralMonologue,oralInterview,oralInteraction,oralDiscussion,oralPhrases,oralCriteria} from './pd3-oral-data.mjs';
import {writingEmail,writingTask,writingCriteria,connectors} from './pd3-writing-data.mjs';
import {grammarSetsA} from './pd3-grammar-a-data.mjs';
import {grammarSetsB,grammarCategories} from './pd3-grammar-b-data.mjs';
const grammarSets=[...grammarSetsA,...grammarSetsB];
export const pd3Data={readingPractice,readingExamFind,readingExamText,dictations,listening,oralMonologue,oralInterview,oralInteraction,oralDiscussion,oralPhrases,oralCriteria,writingEmail,writingTask,writingCriteria,connectors,grammarSets,grammarCategories};
