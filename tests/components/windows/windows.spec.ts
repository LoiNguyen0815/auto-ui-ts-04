import test, { expect, Page } from "@playwright/test";

test.beforeEach('Test Before', async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/windows');
})

test('Verify window', async ({page, context}) => {
    const pageEvent = context.waitForEvent('page');
    clickButtonByLabel(page, 'Open New Tab');
    let newTab = await pageEvent;
    await expect(newTab.getByText("Welcome to Test With Me")).toBeVisible();
    
});

test('Verify New Window', async ({page, context}) => {
    const pageEvent = page.waitForEvent('popup');
    clickButtonByLabel(page, 'Open New Window');
    let newTab = await pageEvent;
    await expect(newTab.getByText("Welcome to Test With Me")).toBeVisible();
    
});

async function clickButtonByLabel(page:Page, label:string) {
    page.getByRole('button', {name : label}).click();
}