// Automated objective checks for a with/without validation run.
// Usage: node checks.js [--scenario=dashboard|tables|full] <buildDir> [<buildDir> ...]
// Each buildDir must contain index.html. Needs Node + Playwright + Chrome
// (same setup as examples/shots.js). Writes checks-report.json into each
// buildDir and prints a summary table.
//
// These checks cover only what is objectively detectable. Judgment checks
// (state coverage quality, hierarchy, insight titles, density) are scored
// manually per skills/ux-framework/references/audit-checklist.md.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

function sharedSourceChecks(src, add) {
  // Style contract (suite v4+): tokens inlined verbatim, no foreign colors.
  const tokensSrc = fs.readFileSync(path.join(__dirname, 'fixtures', 'tokens.css'), 'utf8');
  const tokenHexes = new Set((tokensSrc.match(/#[0-9a-fA-F]{3,8}\b/g) || []).map(h => h.toLowerCase()));
  const tokenProbe = ['--accent: #2f6bff', '--s5: 24px', '--font: system-ui'];
  const missingTokens = tokenProbe.filter(t => !src.includes(t));
  add('STYLE-tokens-inlined', missingTokens.length === 0,
    missingTokens.length ? 'token probe(s) absent: ' + missingTokens.join(' | ') : 'token block present verbatim (probed)');
  const offenders = [...new Set((src.match(/#[0-9a-fA-F]{3,8}\b/g) || []).map(h => h.toLowerCase()))]
    .filter(h => !tokenHexes.has(h));
  add('STYLE-no-foreign-colors', offenders.length === 0,
    offenders.length ? 'non-token hex literals: ' + offenders.slice(0, 8).join(' ') + ' (review manually; rgba() variants of tokens also need eyes)' : 'every hex literal is a token value');

  add('A11Y-focus-visible', /focus-visible/.test(src), 'focus-visible styling in CSS');

  const animates = /@keyframes|transition\s*:/.test(src);
  add('A11Y-reduced-motion', !animates || /prefers-reduced-motion/.test(src),
    animates ? 'build animates; prefers-reduced-motion guard ' + (/prefers-reduced-motion/.test(src) ? 'present' : 'MISSING') : 'no animation, guard not required');

  add('CRAFT-no-transition-all', !/transition\s*:\s*all/.test(src), 'no `transition: all`');

  const emoji = src.match(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu);
  add('CRAFT-no-emoji-icons', !emoji, emoji ? 'emoji found in markup: ' + [...new Set(emoji)].slice(0, 5).join(' ') : 'no emoji in markup');
}

async function tableControlChecks(page, add) {
  const searchInputs = await page.locator('input[type="search"], input[placeholder*="earch"], input[aria-label*="earch" i]').count();
  add('TABLE-search', searchInputs > 0, searchInputs + ' search input(s) found');

  const sortable = await page.evaluate(() =>
    document.querySelectorAll('th button, th[aria-sort], [role="columnheader"][aria-sort]').length ||
    [...document.querySelectorAll('th')].filter(h => h.onclick || getComputedStyle(h).cursor === 'pointer').length);
  add('TABLE-sortable', sortable > 0, sortable + ' sortable header control(s) found (bare th-click sorting counts but is mouse-only; check keyboard access manually)');

  const filters = await page.locator('select, [role="combobox"], button[aria-pressed], [role="tab"]').count();
  add('TABLE-filter-controls', filters > 0, filters + ' filter-capable control(s) found (selects, chips, tabs; may include demo controls; verify manually)');
}

async function narrowTableCheck(page, add) {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.waitForTimeout(600);
  const narrow = await page.evaluate(() => {
    const tables = [...document.querySelectorAll('table')];
    return tables.map(t => {
      const ths = [...t.querySelectorAll('th')];
      const hidden = ths.filter(h => getComputedStyle(h).display === 'none').length;
      let el = t, scrollable = false;
      while (el && el !== document.body) {
        const cs = getComputedStyle(el);
        if ((cs.overflowX === 'auto' || cs.overflowX === 'scroll') && el.scrollWidth > el.clientWidth + 2) scrollable = true;
        el = el.parentElement;
      }
      return { cols: ths.length, hidden, scrollable, fits: t.scrollWidth <= 380 };
    });
  });
  const tableVerdicts = narrow.map(t =>
    t.hidden === 0 && (t.scrollable || t.fits) ? 'ok(' + t.cols + ' cols, ' + (t.fits ? 'fits' : 'scrolls') + ')' : 'FAIL(' + t.hidden + '/' + t.cols + ' cols hidden, not scrollable)');
  add('RESP-columns-survive', narrow.length > 0 && tableVerdicts.every(v => v.startsWith('ok')),
    narrow.length ? tableVerdicts.join('; ') : 'no <table> found (verify manually)');
}

// Dashboard reachability probe: series values must appear in rendered text,
// either immediately or after clicking visible controls (tabs/switchers).
// Extracted so both the dashboard scenario and the full scenario call the
// identical probe. Ends by reloading to a fresh desktop load.
async function dashboardReachProbe(page, FIXTURE, add) {
  const probeVals = [FIXTURE.churn_pct[0].toFixed(1), String(FIXTURE.weekly_active_users[3])];
  const reach = await page.evaluate(async (vals) => {
    const textHas = v => document.body.innerText.replace(/[,\s ]/g, '').includes(v.replace(/[,]/g, ''));
    const missing = () => vals.filter(v => !textHas(v));
    if (!missing().length) return { ok: true, how: 'visible on load' };
    const ctrls = [...document.querySelectorAll('button, [role="tab"]')].slice(0, 40);
    for (const c of ctrls) {
      c.click();
      await new Promise(r => setTimeout(r, 150));
      if (!missing().length) return { ok: true, how: 'reachable via control "' + (c.textContent || '').trim().slice(0, 30) + '"' };
    }
    return { ok: false, how: 'still missing after clicking controls: ' + missing().join(', ') };
  }, probeVals);
  add('DATA-series-reachable', reach.ok, 'churn/WAU probe values ' + reach.how +
    (reach.ok ? '' : ' (hover-only tooltips are invisible to this probe; verify by hand before scoring it a failure)'));
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
}

// Tables-specific rendered probes: DOM windowing, row reachability, empty
// search state, bulk selection, and the destructive-action guard. Extracted
// verbatim from the tables scenario so both it and the full scenario run the
// identical probes. Assumes tableControlChecks() has already run separately.
// Leaves the page on a fresh desktop load.
async function tablesGridProbes(page, accounts, add) {
  // Windowing: a 400-row dataset should not be 400 DOM rows on load.
  const domRows = await page.evaluate(() => {
    const t = document.querySelectorAll('tbody tr').length;
    if (t) return t;
    const all = document.querySelectorAll('[role="row"]').length;
    return all ? all - 1 : 0; // assume one header row in ARIA grids
  });
  add('GRID-windowed-rows', domRows > 0 && domRows < accounts.length,
    domRows + ' row elements in DOM for ' + accounts.length + ' accounts' +
    (domRows === 0 ? ' (no rows found on load)' :
     domRows >= accounts.length ? ' (renders everything at once: no paging, load-more, or virtualization)' : ' (paged, load-more, or virtualized)'));

  // Reachability: first, middle, and last account must be reachable in the
  // rendered UI (visible, via search, or via a pager).
  const probeNames = [accounts[0].company, accounts[Math.floor(accounts.length / 2)].company, accounts[accounts.length - 1].company];
  const reach = await page.evaluate(async (names) => {
    const visible = n => document.body.innerText.includes(n);
    const fire = (el, val) => {
      const set = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
      set.call(el, val);
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    };
    const search = document.querySelector('input[type="search"], input[placeholder*="earch" i], input[aria-label*="earch" i]');
    const out = [];
    for (const n of names) {
      if (visible(n)) { out.push(n + ': visible on load'); continue; }
      if (search) {
        fire(search, n);
        await new Promise(r => setTimeout(r, 400));
        const hit = visible(n);
        fire(search, '');
        await new Promise(r => setTimeout(r, 250));
        if (hit) { out.push(n + ': via search'); continue; }
      }
      let found = false;
      const nextCtl = () => [...document.querySelectorAll('button, a')].find(b =>
        /next|more|›|»/i.test((b.textContent || '') + (b.getAttribute('aria-label') || '')) && !b.disabled);
      for (let i = 0; i < 40 && nextCtl(); i++) {
        nextCtl().click();
        await new Promise(r => setTimeout(r, 200));
        if (visible(n)) { found = true; break; }
      }
      out.push(n + (found ? ': via pager' : ': NOT REACHABLE by probe'));
    }
    return out;
  }, probeNames);
  add('DATA-rows-reachable', reach.every(r => !r.includes('NOT REACHABLE')),
    reach.join('; ') + (reach.every(r => !r.includes('NOT REACHABLE')) ? '' : ' (virtualized scroll is invisible to this probe; verify by hand before scoring it a failure)'));
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);

  // Zero-result search should show guidance, not a blank region (P18).
  const emptyState = await page.evaluate(async () => {
    const search = document.querySelector('input[type="search"], input[placeholder*="earch" i], input[aria-label*="earch" i]');
    if (!search) return { skip: true, msg: false };
    const set = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
    set.call(search, 'zzzznotfound');
    search.dispatchEvent(new Event('input', { bubbles: true }));
    await new Promise(r => setTimeout(r, 400));
    const msg = /no (accounts|results|matches)|nothing (found|matches)|0 (accounts|results)|couldn't find|could not find|try (a different|adjusting)|clear (the )?(search|filter)/i.test(document.body.innerText);
    set.call(search, '');
    search.dispatchEvent(new Event('input', { bubbles: true }));
    await new Promise(r => setTimeout(r, 300)); // let a debounced re-render settle before the next probe
    return { skip: false, msg };
  });
  add('STATE-empty-search', !emptyState.skip && emptyState.msg,
    emptyState.skip ? 'no search input to probe (see TABLE-search)' :
    emptyState.msg ? 'zero-result search shows a guidance message' : 'zero-result search shows no guidance message (blank or silent region)');

  // Bulk selection affordance.
  const selection = await page.evaluate(() =>
    document.querySelectorAll('tbody input[type="checkbox"], [role="row"] input[type="checkbox"], [role="row"][aria-selected], tr[aria-selected]').length);
  add('GRID-selection', selection > 1, selection + ' row-selection affordance(s) found (checkboxes or aria-selected rows)');

  // Destructive action must be guarded (P17). Interactive probe.
  const guard = await page.evaluate(async () => {
    const rowCount = () => document.querySelectorAll('tbody tr, [role="row"]').length;
    const before = rowCount();
    const ctl = [...document.querySelectorAll('button, a, [role="menuitem"]')].find(b =>
      /remove|delete|archive/i.test((b.textContent || '') + (b.getAttribute('aria-label') || '') + (b.title || '')));
    if (!ctl) return { skip: true };
    ctl.click();
    await new Promise(r => setTimeout(r, 400));
    const dialog = !!document.querySelector('[role="dialog"], [role="alertdialog"], dialog[open]');
    const confirmText = /are you sure|confirm|undo|cannot be undone|will (be )?(remove|delete)/i.test(document.body.innerText);
    const after = rowCount();
    return { skip: false, guarded: dialog || (confirmText && after >= before), mutated: after < before };
  });
  add('GRID-destructive-guard', !guard.skip && guard.guarded && !guard.mutated,
    guard.skip ? 'no remove/delete/archive control found by probe (may be behind a row menu; verify manually)' :
    guard.mutated ? 'destructive click mutated rows with NO confirm or undo' :
    guard.guarded ? 'destructive action gated behind a confirm/undo step' :
    'clicked a destructive control; no dialog or confirm text detected (may be a no-op bulk button with nothing selected; verify manually)');
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
}

async function checkDashboardBuild(browser, dirArg, FIXTURE) {
  const dir = path.resolve(dirArg);
  const file = path.join(dir, 'index.html');
  const src = fs.readFileSync(file, 'utf8');
  const url = 'file:///' + file.replace(/\\/g, '/');
  const results = [];
  const add = (id, pass, detail) => results.push({ id, pass, detail });

  // ---- source-level checks ----
  const companies = FIXTURE.recent_signups.map(s => s.company);
  const missingCompanies = companies.filter(c => !src.includes(c.replace(/&/g, '&').split('&')[0].trim()) && !src.includes(c));
  add('DATA-companies', missingCompanies.length === 0,
    missingCompanies.length ? 'missing: ' + missingCompanies.join(', ') : 'all 14 signup companies present in source');

  const features = FIXTURE.feature_adoption_pct.map(f => f.feature);
  const missingFeatures = features.filter(f => !src.includes(f));
  add('DATA-features', missingFeatures.length === 0,
    missingFeatures.length ? 'missing: ' + missingFeatures.join(', ') : 'all 7 features present in source');

  const seriesProbe = [String(FIXTURE.mrr_usd[0]), String(FIXTURE.mrr_usd[12]), String(FIXTURE.weekly_active_users[0])];
  const missingSeries = seriesProbe.filter(v => !src.includes(v));
  add('DATA-series', missingSeries.length === 0,
    missingSeries.length ? 'probe values absent: ' + missingSeries.join(', ') : 'history series values present');

  sharedSourceChecks(src, add);

  // ---- rendered checks, desktop ----
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(String(e)));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500); // let any boot/loading sequence settle

  add('RUNTIME-no-errors', errors.length === 0, errors.length ? errors.slice(0, 3).join(' | ') : 'no console/page errors');

  await tableControlChecks(page, add);

  await dashboardReachProbe(page, FIXTURE, add);

  // ---- rendered checks, narrow 375px ----
  await narrowTableCheck(page, add);

  await ctx.close();
  fs.writeFileSync(path.join(dir, 'checks-report.json'), JSON.stringify({ dir, scenario: 'dashboard', when: new Date().toISOString(), results }, null, 2));
  return results;
}

async function checkTablesBuild(browser, dirArg, FIXTURE) {
  const dir = path.resolve(dirArg);
  const file = path.join(dir, 'index.html');
  const src = fs.readFileSync(file, 'utf8');
  const url = 'file:///' + file.replace(/\\/g, '/');
  const results = [];
  const add = (id, pass, detail) => results.push({ id, pass, detail });
  const accounts = FIXTURE.accounts;

  // ---- source-level checks ----
  const missingCompanies = accounts.map(a => a.company).filter(c => !src.includes(c));
  add('DATA-companies', missingCompanies.length === 0,
    missingCompanies.length
      ? missingCompanies.length + ' of ' + accounts.length + ' account names missing from source, e.g. ' + missingCompanies.slice(0, 3).join(', ')
      : 'all ' + accounts.length + ' account names present in source');

  const owners = [...new Set(accounts.map(a => a.owner))];
  const missingOwners = owners.filter(o => !src.includes(o));
  add('DATA-owners', missingOwners.length === 0,
    missingOwners.length ? missingOwners.length + ' owner name(s) missing, e.g. ' + missingOwners.slice(0, 3).join(', ') : 'all owner names present in source');

  sharedSourceChecks(src, add);

  // ---- rendered checks, desktop ----
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(String(e)));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  add('RUNTIME-no-errors', errors.length === 0, errors.length ? errors.slice(0, 3).join(' | ') : 'no console/page errors');

  await tableControlChecks(page, add);
  await tablesGridProbes(page, accounts, add);

  // ---- rendered checks, narrow 375px ----
  await narrowTableCheck(page, add);

  await ctx.close();
  fs.writeFileSync(path.join(dir, 'checks-report.json'), JSON.stringify({ dir, scenario: 'tables', when: new Date().toISOString(), results }, null, 2));
  return results;
}

// Full scenario: one build carrying both a dashboard region and a data
// grid, so the whole framework is exercised on a single artifact. Runs the
// union of the dashboard and tables checks, with the shared source/runtime/
// control/narrow checks run exactly once. Takes both fixtures as
// FIXTURES = { dashboard, tables }.
async function checkFullBuild(browser, dirArg, FIXTURES) {
  const DASH = FIXTURES.dashboard;
  const TBL = FIXTURES.tables;
  const accounts = TBL.accounts;
  const dir = path.resolve(dirArg);
  const file = path.join(dir, 'index.html');
  const src = fs.readFileSync(file, 'utf8');
  const url = 'file:///' + file.replace(/\\/g, '/');
  const results = [];
  const add = (id, pass, detail) => results.push({ id, pass, detail });

  // ---- source-level checks: dashboard data ----
  const signupCompanies = DASH.recent_signups.map(s => s.company);
  const missingSignups = signupCompanies.filter(c => !src.includes(c.replace(/&/g, '&').split('&')[0].trim()) && !src.includes(c));
  add('DATA-signup-companies', missingSignups.length === 0,
    missingSignups.length ? 'missing: ' + missingSignups.join(', ') : 'all 14 signup companies present in source');

  const features = DASH.feature_adoption_pct.map(f => f.feature);
  const missingFeatures = features.filter(f => !src.includes(f));
  add('DATA-features', missingFeatures.length === 0,
    missingFeatures.length ? 'missing: ' + missingFeatures.join(', ') : 'all 7 features present in source');

  const seriesProbe = [String(DASH.mrr_usd[0]), String(DASH.mrr_usd[12]), String(DASH.weekly_active_users[0])];
  const missingSeries = seriesProbe.filter(v => !src.includes(v));
  add('DATA-series', missingSeries.length === 0,
    missingSeries.length ? 'probe values absent: ' + missingSeries.join(', ') : 'history series values present');

  // ---- source-level checks: accounts data ----
  const missingAccounts = accounts.map(a => a.company).filter(c => !src.includes(c));
  add('DATA-account-companies', missingAccounts.length === 0,
    missingAccounts.length
      ? missingAccounts.length + ' of ' + accounts.length + ' account names missing from source, e.g. ' + missingAccounts.slice(0, 3).join(', ')
      : 'all ' + accounts.length + ' account names present in source');

  const owners = [...new Set(accounts.map(a => a.owner))];
  const missingOwners = owners.filter(o => !src.includes(o));
  add('DATA-owners', missingOwners.length === 0,
    missingOwners.length ? missingOwners.length + ' owner name(s) missing, e.g. ' + missingOwners.slice(0, 3).join(', ') : 'all owner names present in source');

  sharedSourceChecks(src, add);

  // ---- rendered checks, desktop ----
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(String(e)));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  add('RUNTIME-no-errors', errors.length === 0, errors.length ? errors.slice(0, 3).join(' | ') : 'no console/page errors');

  await tableControlChecks(page, add);
  await dashboardReachProbe(page, DASH, add);
  await tablesGridProbes(page, accounts, add);

  // ---- rendered checks, narrow 375px ----
  await narrowTableCheck(page, add);

  await ctx.close();
  fs.writeFileSync(path.join(dir, 'checks-report.json'), JSON.stringify({ dir, scenario: 'full', when: new Date().toISOString(), results }, null, 2));
  return results;
}

(async () => {
  const argv = process.argv.slice(2);
  const scenarioArg = argv.find(a => a.startsWith('--scenario'));
  const scenario = scenarioArg ? scenarioArg.split('=')[1] : 'dashboard';
  const dirs = argv.filter(a => !a.startsWith('--scenario'));
  const SCENARIOS = {
    dashboard: { fixture: 'data.json', check: checkDashboardBuild },
    tables: { fixture: 'tables-data.json', check: checkTablesBuild },
    // full: one build carrying both UI types; loads both fixtures.
    full: { fixtures: { dashboard: 'data.json', tables: 'tables-data.json' }, check: checkFullBuild },
  };
  if (!SCENARIOS[scenario]) { console.error('Unknown scenario: ' + scenario); process.exit(2); }
  if (!dirs.length) { console.error('Usage: node checks.js [--scenario=dashboard|tables|full] <buildDir> [<buildDir> ...]'); process.exit(2); }
  const load = f => JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures', f), 'utf8'));
  const sc = SCENARIOS[scenario];
  const FIXTURE = sc.fixtures
    ? Object.fromEntries(Object.entries(sc.fixtures).map(([k, f]) => [k, load(f)]))
    : load(sc.fixture);
  const browser = await chromium.launch({ channel: 'chrome' });
  let failed = 0;
  for (const dir of dirs) {
    const results = await SCENARIOS[scenario].check(browser, dir, FIXTURE);
    console.log('\n== ' + dir);
    for (const r of results) {
      if (!r.pass) failed++;
      console.log((r.pass ? '  PASS ' : '  FAIL ') + r.id.padEnd(24) + ' ' + r.detail);
    }
  }
  await browser.close();
  console.log('\n' + (failed ? failed + ' automated check(s) failed' : 'all automated checks passed') + '. Judgment checks still require the manual checklist.');
  process.exit(failed ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
