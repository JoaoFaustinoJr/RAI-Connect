import assert from 'node:assert/strict';
import {installShadowEntry} from './entry-gate.js';

class FakeElement {
  listeners = new Map();
  addEventListener(name, callback) { this.listeners.set(name, callback); }
  removeEventListener(name) { this.listeners.delete(name); }
  fire(name, event = {}) { return this.listeners.get(name)?.(event); }
}
globalThis.Element = FakeElement;
globalThis.document = new FakeElement();
document.hidden = false;
globalThis.window = new FakeElement();
let clock = 0;
globalThis.performance = {now: () => clock};

async function tick(bird, trusted = true, gap = 120) {
  clock += gap;
  await bird.fire('click', {isTrusted: trusted});
}
async function sequence(bird, count = 5) {
  for (let i = 0; i < count; i++) await tick(bird);
}
async function scenario(name, authorized, expected) {
  const bird = new FakeElement();
  let opened = 0;
  const dispose = installShadowEntry({
    bird, isAuthorized: async () => authorized, onOpen: () => {opened++;},
  });
  await sequence(bird);
  assert.equal(opened, expected, name);
  dispose();
  assert.equal(bird.listeners.has('click'), false, 'listener cleaned');
  console.log('PASS:', name);
}
await scenario('authorized user enters', true, 1);
await scenario('unauthorized user stays outside', false, 0);

const bird = new FakeElement();
let opened = 0;
const dispose = installShadowEntry({bird,isAuthorized:async()=>true,onOpen:()=>{opened++;}});
await sequence(bird, 4);
await tick(bird, false);
assert.equal(opened, 0, 'synthetic click must not complete gesture');
await tick(bird);
assert.equal(opened, 1, 'real fifth tap completes gesture');
await sequence(bird, 2);
document.hidden = true;
document.fire('visibilitychange');
document.hidden = false;
await sequence(bird, 3);
assert.equal(opened, 1, 'background reset prevents partial sequence reuse');
await sequence(bird, 2);
window.fire('pagehide');
await sequence(bird, 3);
assert.equal(opened, 1, 'pagehide resets sequence');
dispose();
console.log('PASS: trusted taps and lifecycle resets');
