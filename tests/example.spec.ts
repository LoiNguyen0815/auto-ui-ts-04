import { test, expect } from '@playwright/test';

test.beforeAll('Before All', () => {
  console.log("Before all");
})

test.beforeEach('Before Each', () => {
  console.log("Before each");
})

test('Test Case 1', async ({ page }) => {
  console.log("test case 1");
});

test('Test Case 2', async ({ page }) => {
  console.log("test case 2");
});

test.afterEach('After Each', () => {
  console.log("After each");
})

test.afterAll('After All', () => {
  console.log("After all");
})
