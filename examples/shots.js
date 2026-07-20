// Re-renders the screenshots in ./shots from the two example builds
// (validation run 2026-07-20c, suite v4: pinned data and design tokens).
// Needs Node, Playwright (npm i playwright), and a local Chrome install.
// No Chrome? Swap { channel: 'chrome' } for Playwright's bundled Chromium:
// npx playwright install chromium, then chromium.launch() with no args.
//
// The with-skill build has no artificial state switcher; its states are
// real code paths. They are captured honestly: skeletons by disabling
// JavaScript, the empty state by a real zero-result search, and the error
// state by injecting an SVG fault so the per-widget try/catch paths fire.
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
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.screenshot({ path: OUT + '/baseline-light-fold.png' });
  await ctx.close();

  // ---- BASELINE dark, mobile 375 ----
  ctx = await browser.newContext({ viewport: { width: 375, height: 900 }, colorScheme: 'dark' });
  page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  await page.screenshot({ path: OUT + '/baseline-dark-mobile.png', fullPage: true });
  await ctx.close();

  // ---- WITH-SKILL, light, desktop ----
  ctx = await browser.newContext({ viewport: { width: 1440, height: 1200 }, colorScheme: 'light' });
  page = await ctx.newPage();
  await page.goto(WITH, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: OUT + '/with-light-full.png', fullPage: true });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.screenshot({ path: OUT + '/with-light-fold.png' });
  // the trend section's table twin
  await page.click('#seg-table');
  await page.waitForTimeout(250);
  await page.screenshot({ path: OUT + '/with-table-view.png' });
  await page.click('#seg-chart');
  // real zero-result search (the reachable empty state)
  await page.fill('input[aria-label="Search signups by company"]', 'zzzznotacompany');
  await page.waitForTimeout(300);
  await page.screenshot({ path: OUT + '/with-state-empty.png', fullPage: true });
  await ctx.close();

  // ---- WITH-SKILL, loading skeletons (JavaScript disabled) ----
  ctx = await browser.newContext({ viewport: { width: 1440, height: 1200 }, colorScheme: 'light', javaScriptEnabled: false });
  page = await ctx.newPage();
  await page.goto(WITH);
  await page.waitForTimeout(400);
  await page.screenshot({ path: OUT + '/with-state-loading.png', fullPage: true });
  await ctx.close();

  // ---- WITH-SKILL, error paths via injected SVG fault ----
  ctx = await browser.newContext({ viewport: { width: 1440, height: 1200 }, colorScheme: 'light' });
  page = await ctx.newPage();
  await page.addInitScript(() => {
    // Charts render SVG via innerHTML template strings. Throw only on
    // SVG payloads so every chart widget's own try/catch fires its error
    // card with Retry, while non-chart widgets keep rendering.
    const desc = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML');
    Object.defineProperty(Element.prototype, 'innerHTML', {
      get: desc.get,
      set(v) {
        if (typeof v === 'string' && v.includes('<svg')) throw new Error('injected fault for state capture');
        return desc.set.call(this, v);
      },
    });
  });
  await page.goto(WITH, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: OUT + '/with-state-error.png', fullPage: true });
  await ctx.close();

  // ---- WITH-SKILL dark mobile 375 ----
  ctx = await browser.newContext({ viewport: { width: 375, height: 900 }, colorScheme: 'dark' });
  page = await ctx.newPage();
  await page.goto(WITH, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: OUT + '/with-dark-mobile.png', fullPage: true });
  await ctx.close();

  await browser.close();
  console.log('done');
})().catch(e => { console.error(e); process.exit(1); });
