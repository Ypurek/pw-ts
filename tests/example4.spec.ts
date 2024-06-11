import { test, expect } from '@playwright/test';

// 2 independent contexts
test('has title', async ({ browser }) => {
  const context1 = await browser.newContext();
  const context2 = await browser.newContext();
  const page1 = await context1.newPage();
  const page2 = await context2.newPage();
  await page1.goto('https://playwright.dev/');
  await page2.goto('/');
  expect(await page1.title()).toContain('Playwright');
  expect(await page2.title()).toBe('Coffee cart');
});
