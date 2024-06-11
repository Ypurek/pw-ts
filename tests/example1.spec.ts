import { test, expect } from '@playwright/test';

// this test checks value 42 is 42 to prove anything can be expected.
// In python it is only Pages and Locators ¯\_(ツ)_/¯
test('ultimate answer', async ({ }) => {
  await expect(42).toBe(42);
});

