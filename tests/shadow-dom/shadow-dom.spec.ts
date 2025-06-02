import test, { expect, Page } from "@playwright/test";

test.beforeEach('Test Before', async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/shadow-dom');
})

test('Verify shadow-dom', async ({page, context}) => {
    let shadow = page.locator('#my-shadow');
    let inputLocator = shadow.locator('#name-input');
    await inputLocator.fill("Test with me");

    await shadow.getByRole('button', {name : 'Submit'}).click();

    await expect(shadow.getByText("What you just type: Test with me")).toBeVisible();
});