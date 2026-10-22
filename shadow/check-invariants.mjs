import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const entry = readFileSync(new URL('./entry-gate.js', import.meta.url), 'utf8');
const app = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const demo = readFileSync(new URL('./prototipo.html', import.meta.url), 'utf8');
const checks = [
  ['five-tap sequence', /taps !== 5/.test(entry)],
  ['real authenticated Supabase user lookup', /supabase\.auth\.getUser\(\)/.test(entry)],
  ['authorization checked server-side', /\.from\('shadow_members'\)/.test(entry)],
  ['untrusted synthetic clicks rejected', /event\.isTrusted/.test(entry)],
  ['no frame same-origin grant', /frame\.setAttribute\('sandbox','allow-scripts'\)/.test(app)],
  ['locks when app backgrounded', /document\.hidden\)exit\(\)/.test(app)],
  ['locks when page is closed', /window\.addEventListener\('pagehide',exit\)/.test(app)],
  ['locks when signed out', /event==='SIGNED_OUT'/.test(app)],
  ['demo discloses no real messaging', /Sem mensagens reais/.test(demo)],
];
for (const [name, pass] of checks) {
  console.log((pass ? 'PASS' : 'FAIL') + ': ' + name);
  assert.ok(pass, name);
}
console.log('Static invariants passed. These are NOT runtime or security penetration tests.');
