// Automated objective checks for a with/without validation run.
// Usage: node checks.js <buildDir> [<buildDir> ...]
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

const FIXTURE = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures', 'data.json'), 'utf8'));

async function checkBuild(browser, dirArg) {
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

  // ---- rendered checks, desktop ----
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(String(e)));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500); // let any boot/loading sequence settle

  add('RUNTIME-no-errors', errors.length === 0, errors.length ? errors.slice(0, 3).join(' | ') : 'no console/page errors');

  const searchInputs = await page.locator('input[type="search"], input[placeholder*="earch"], input[aria-label*="earch" i]').count();
  add('TABLE-search', searchInputs > 0, searchInputs + ' search input(s) found');

  const sortable = await page.evaluate(() =>
    document.querySelectorAll('th button, th[aria-sort], [role="columnheader"][aria-sort]').length ||
    [...document.querySelectorAll('th')].filter(h => h.onclick || getComputedStyle(h).cursor === 'pointer').length);
  add('TABLE-sortable', sortable > 0, sortable + ' sortable header control(s) found (bare th-click sorting counts but is mouse-only; check keyboard access manually)');

  const filters = await page.locator('select, [role="combobox"], button[aria-pressed], [role="tab"]').count();
  add('TABLE-filter-controls', filters > 0, filters + ' filter-capable control(s) found (selects, chips, tabs; may include demo controls; verify manually)');

  // Reachability probe: series values must appear in rendered text, either
  // immediately or after clicking visible controls (tabs/switchers).
  const probeVals = [FIXTURE.churn_pct[0].toFixed(1), String(FIXTURE.weekly_active_users[3])];
  const reach = await page.evaluate(async (vals) => {
    const textHas = v => document.body.innerText.replace(/[, ]/g, '').includes(v.replace(/[,]/g, ''));
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

  // ---- rendered checks, narrow 375px ----
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

  await ctx.close();
  fs.writeFileSync(path.join(dir, 'checks-report.json'), JSON.stringify({ dir, when: new Date().toISOString(), results }, null, 2));
  return results;
}

(async () => {
  const dirs = process.argv.slice(2);
  if (!dirs.length) { console.error('Usage: node checks.js <buildDir> [<buildDir> ...]'); process.exit(2); }
  const browser = await chromium.launch({ channel: 'chrome' });
  let failed = 0;
  for (const dir of dirs) {
    const results = await checkBuild(browser, dir);
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
