import test from 'node:test';
import assert from 'node:assert/strict';
const module=await import('../dist/home-feedback.mjs').catch(()=>({}));
test('home feedback survives replacing page content and lasts half a second',t=>{
 assert.equal(typeof module.createHomeFeedback,'function');t.mock.timers.enable({apis:['setTimeout']});
 const classes=new Set(),body={classList:{add:k=>classes.add(k),remove:k=>classes.delete(k)}};
 const feedback=module.createHomeFeedback(body);feedback.press();assert.ok(classes.has('home-pressed'));
 t.mock.timers.tick(499);assert.ok(classes.has('home-pressed'));t.mock.timers.tick(1);assert.equal(classes.has('home-pressed'),false);
});
test('another home click restarts the complete half-second feedback',t=>{
 assert.equal(typeof module.createHomeFeedback,'function');t.mock.timers.enable({apis:['setTimeout']});
 const classes=new Set(),feedback=module.createHomeFeedback({classList:{add:k=>classes.add(k),remove:k=>classes.delete(k)}});
 feedback.press();t.mock.timers.tick(300);feedback.press();t.mock.timers.tick(200);assert.ok(classes.has('home-pressed'));t.mock.timers.tick(300);assert.equal(classes.size,0);
});
