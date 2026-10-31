import test from 'node:test';
import assert from 'node:assert/strict';
import {cloudSettings} from '../dist/continuity-view.mjs';
import {renderLocalCopies} from '../dist/copies-view.mjs';
import {renderView} from '../dist/views.mjs';
import {createState} from '../dist/engine.mjs';

const cloudCopy=(id,xp,savedAt)=>({id,savedAt,reason:'remote-applied',local:{...createState(),xp}});

test('the cloud panel offers the newest copy and, when there are more, each older copy by date',()=>{
  const none=cloudSettings({phase:'saved'},null,[]);
  assert.equal((none.match(/data-action="cloud-recovery"/g)||[]).length,1);
  assert.match(none,/data-action="cloud-recovery" data-id="0"/);
  assert.doesNotMatch(none,/cloud-copies/);
  const several=cloudSettings({phase:'saved'},null,[cloudCopy(0,90,'2026-10-24T10:00:00.000Z'),cloudCopy(1,60,'2026-10-23T10:00:00.000Z'),cloudCopy(2,30,'2026-10-22T10:00:00.000Z')]);
  assert.equal((several.match(/data-action="cloud-recovery"/g)||[]).length,3);
  assert.match(several,/data-id="1">Копия от \d{2}\.10\.2026 \d{2}:\d{2} · 60 XP/);
  assert.match(several,/data-id="2">Копия от [^<]*30 XP/);
  assert.doesNotMatch(cloudSettings({phase:'local'},null,[cloudCopy(0,1,null),cloudCopy(1,2,null)]),/cloud-recovery/);
});

test('local copies are listed newest first with download and restore, and unreadable ones only download',()=>{
  assert.equal(renderLocalCopies([]),'');
  const html=renderLocalCopies([
    {id:0,savedAt:'2026-10-24T10:00:00.000Z',reason:'import',xp:120,lessons:4,raw:'{}'},
    {id:1,savedAt:null,reason:'unreadable',unreadable:true,raw:'garbage'},
    {id:2,savedAt:'2026-10-20T10:00:00.000Z',reason:'<script>',xp:1,lessons:0,raw:'{}'}
  ]);
  assert.equal((html.match(/data-action="download-copy"/g)||[]).length,3);
  assert.equal((html.match(/data-action="restore-copy"/g)||[]).length,2);
  assert.match(html,/Копии прогресса на этом устройстве \(3\)/);
  assert.match(html,/120 XP · 4 ур\./);
  assert.doesNotMatch(html,/<script>/);
});

test('the settings page shows the local copies list instead of the single old button when copies are supplied',()=>{
  const context={state:createState(),offlineEdition:true,cloudPlan:'',recovery:'{}'};
  assert.match(renderView('settings',context),/data-action="export-recovery"/);
  const withList=renderView('settings',{...context,localCopies:[{id:0,savedAt:'2026-10-24T10:00:00.000Z',reason:'fresh',xp:5,lessons:1,raw:'{}'}]});
  assert.doesNotMatch(withList,/data-action="export-recovery"/);
  assert.match(withList,/class="local-copies"/);
  assert.match(withList,/data-action="restore-copy" data-id="0"/);
});
