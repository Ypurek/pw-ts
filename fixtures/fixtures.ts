import { test as base } from '@playwright/test';
import { MenuPage } from '../pages/menu';
import fs from 'fs';

// Declare the types of your fixtures.
type MyFixtures = {
  menuPage: MenuPage;
  createFile: string;
};


// Extend basic test by providing a "todoPage" fixture.
export const test = base.extend<MyFixtures>({
  menuPage: async ({ page }, use) => {
    // Set up the fixture.
    const menuPage = new MenuPage(page);
    await menuPage.goto('/');

    // it is like yield in pytest
    await use(menuPage);
  },

  createFile: async ({ }, use) => {
    const fileName = 'test.txt';
    fs.writeFileSync(fileName, 'This is a test file');
    
    // yield
    await use(fileName);
    
    // cleanup
    fs.unlinkSync(fileName);
  },
});

// Re-export test and expect from Playwright
export { expect } from '@playwright/test';