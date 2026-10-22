/**
 * RAI Shadow — experimental entry gate.
 * Import only in a TEST build. This module does not authorize database access.
 * Server-side shadow_members + RLS are mandatory for real data.
 */
export function installShadowEntry({bird, isAuthorized, onOpen, onError = () => {}}) {
  if (!(bird instanceof Element)) throw new TypeError('bird must be an element');
  if (typeof isAuthorized !== 'function' || typeof onOpen !== 'function') {
    throw new TypeError('isAuthorized and onOpen callbacks are required');
  }
  let taps = 0;
  let lastTap = 0;
  let busy = false;
  let disposed = false;
  async function handleTap() {
    if (disposed || busy) return;
    const now = performance.now();
    taps = now - lastTap > 2500 ? 1 : taps + 1;
    lastTap = now;
    if (taps !== 5) return;
    taps = 0;
    busy = true;
    try {
      // No modal, toast, or visible indicator for unauthorized users.
      if (await isAuthorized() && !disposed && !document.hidden) await onOpen();
    } catch (error) {
      onError(error);
    } finally {
      busy = false;
    }
  }
  function reset() { taps = 0; lastTap = 0; }
  function onVisibilityChange() { if (document.hidden) reset(); }
  bird.addEventListener('click', handleTap);
  document.addEventListener('visibilitychange', onVisibilityChange);
  return () => {
    disposed = true;
    bird.removeEventListener('click', handleTap);
    document.removeEventListener('visibilitychange', onVisibilityChange);
  };
}

/**
 * Optional helper for a Supabase authenticated client.
 * Fail closed on errors; never rely on this check alone.
 */
export async function shadowMemberEnabled(supabase) {
  const {data: authData, error: authError} = await supabase.auth.getUser();
  if (authError || !authData?.user) return false;
  const {data, error} = await supabase.from('shadow_members')
    .select('enabled').eq('user_id', authData.user.id).maybeSingle();
  return !error && data?.enabled === true;
}
