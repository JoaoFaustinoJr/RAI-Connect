import assert from 'node:assert/strict';
import {shadowMemberEnabled,installShadowEntry} from './entry-gate.js';

function client({user={id:'test-user'},authError=null,row={enabled:true},queryError=null}={}) {
  return {auth:{getUser:async()=>({data:{user},error:authError})},from:(table)=>{
    assert.equal(table,'shadow_members');
    return {select:(column)=>{assert.equal(column,'enabled');return {eq:(field,id)=>{
      assert.equal(field,'user_id');assert.equal(id,user.id);
      return {maybeSingle:async()=>({data:row,error:queryError})};
    }};}};
  }};
}
assert.equal(await shadowMemberEnabled(client()),true);
assert.equal(await shadowMemberEnabled(client({row:{enabled:false}})),false);
assert.equal(await shadowMemberEnabled(client({row:null})),false);
assert.equal(await shadowMemberEnabled(client({user:null})),false);
assert.equal(await shadowMemberEnabled(client({authError:new Error('auth failed')})),false);
assert.equal(await shadowMemberEnabled(client({queryError:new Error('RLS denied')})),false);
console.log('PASS: membership denies absent, disabled and failed auth');

class FakeElement {
  listeners=new Map();
  addEventListener(type,fn){this.listeners.set(type,fn);}
  removeEventListener(type){this.listeners.delete(type);}
  async fire(type,event={}){return this.listeners.get(type)?.(event);}
}
globalThis.Element=FakeElement;
globalThis.document=new FakeElement();document.hidden=false;
globalThis.window=new FakeElement();
let now=0;globalThis.performance={now:()=>now};
const bird=new FakeElement();let opened=0;let resolveAuth;
const dispose=installShadowEntry({bird,isAuthorized:()=>new Promise(r=>{resolveAuth=r;}),onOpen:()=>{opened++;}});
for(let i=0;i<5;i++){now+=100;const pending=bird.fire('click',{isTrusted:true});if(i===4){dispose();resolveAuth(true);await pending;}else await pending;}
assert.equal(opened,0,'disposed gate must not open after delayed authorization');
console.log('PASS: disposal cancels pending opening');
