// Re-renders the screenshots in ./shots from the two example builds.
// Needs Node, Playwright (npm i playwright), and a local Chrome install.
// No Chrome? Swap { channel: 'chrome' } for Playwright's bundled Chromium:
// npx playwright install chromium, then chromium.launch() with no args.
const { chromium } = require('playwright');
const path = require('path');

const OUT = path.join(__dirname, 'shots');
const BASE = 'file:///' + path.join(__dirname, 'baseline', 'index.html').replace(/\\/g, '/');
const WITH = 'file:///' + path.join(__dirname, 'with-skill', 'index.html').replace(/\\/g, '/');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome' });

  // ---- BASELINE, light, desktop ----
  let ctx = await browser.newContext({ viewport: { width: 1440, height: 1200 }, colorScheme: 'light' });
  let page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: OUT + '/baseline-light-full.png', fullPage: true });
  // first viewport only (what's above the fold at 1440x900)
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.screenshot({ path: OUT + '/baseline-light-fold.png' });
  // table toggle on MRR
  await page.click('.table-toggle[data-chart="mrr"]');
  await page.waitForTimeout(200);
  await page.screenshot({ path: OUT + '/baseline-table-toggle.png' });
  await ctx.close();

  // ---- BASELINE dark, mobile 375 ----
  ctx = await browser.newContext({ viewport: { width: 375, height: 900 }, colorScheme: 'dark' });
  page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  await page.screenshot({ path: OUT + '/baseline-dark-mobile.png', fullPage: true });
  await ctx.close();

  // ---- WITH-SKILL, light, desktop, ideal (after 700ms load) ----
  ctx = await browser.newContext({ viewport: { width: 1440, height: 1200 }, colorScheme: 'light' });
  page = await ctx.newPage();
  await page.goto(WITH, { waitUntil: 'networkidle' });
  // capture loading state quickly by reloading and shooting immediately
  await page.screenshot({ path: OUT + '/with-initial.png' });
  await page.waitForTimeout(1100); // let the 700ms boot resolve to ideal
  await page.screenshot({ path: OUT + '/with-ideal-full.png', fullPage: true });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.screenshot({ path: OUT + '/with-ideal-fold.png' });
  // drive preview states
  const states = ['loading', 'empty', 'error', 'partial'];
  for (const s of states) {
    await page.selectOption('#previewState', s);
    await page.waitForTimeout(250);
    await page.screenshot({ path: OUT + '/with-state-' + s + '.png', fullPage: true });
  }
  // back to ideal, then test search zero-result
  await page.selectOption('#previewState', 'ideal');
  await page.waitForTimeout(300);
  await page.fill('input[aria-label="Search signups by company"]', 'zzzznotacompany');
  await page.waitForTimeout(300);
  await page.screenshot({ path: OUT + '/with-search-zero.png', fullPage: true });
  await ctx.close();

  // ---- WITH-SKILL dark mobile 375 ----
  ctx = await browser.newContext({ viewport: { width: 375, height: 900 }, colorScheme: 'dark' });
  page = await ctx.newPage();
  await page.goto(WITH, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: OUT + '/with-dark-mobile.png', fullPage: true });
  await ctx.close();

  await browser.close();
  console.log('done');
})().catch(e => { console.error(e); process.exit(1); });
