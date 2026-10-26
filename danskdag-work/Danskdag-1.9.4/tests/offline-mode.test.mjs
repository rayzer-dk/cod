import test from 'node:test';
import assert from 'node:assert/strict';
import {cloudSettings,cloudMessage} from '../dist/continuity-view.mjs';
import {renderView} from '../dist/views.mjs';
import {createState} from '../dist/engine.mjs';
test('HTML settings explain local progress without presenting cloud sync as available',()=>{
 const status={phase:'local'},cloud=cloudSettings(status,null);
 assert.match(cloudMessage(status),/HTML/);
 assert.doesNotMatch(cloud,/data-action="cloud-retry"/);
 const html=renderView('settings',{state:createState(),offlineEdition:true,cloudPlan:cloud});
 assert.match(html,/HTML/);
 assert.doesNotMatch(html,/Синхронизация работает в опубликованном приложении после входа/);
 assert.match(html,/JSON/);
});
