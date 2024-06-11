import { test, expect } from '../fixtures/fixtures';
import fs from 'fs';


// this test check file, created by the fixture exists and deleted afterwards
test('check file exists', async ({ createFile }) => {
  expect(fs.existsSync(createFile)).toBeTruthy();
  expect(fs.readFileSync(createFile, 'utf8')).toBe('This is a test file');
});

