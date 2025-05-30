import test, { expect, Page } from "@playwright/test";

test.beforeEach('Test Before', async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/menu');
})

test('Verify select menu', async ({ page }) => {
    await selectMenuByLabel(page, 'My Menu', 'Option 3');
    await expect(page.getByText(`Current value: setting:3`)).toBeVisible();
})

async function selectMenuByLabel(page:Page, label:string, item:string) {
    let menuXpath = `//div[@role='menuitem' and .//span[normalize-space() = '${label}']]`;
    await page.locator(menuXpath).hover();

    let itemXpath = `//li[@role='menuitem' and .//span[normalize-space() ='${item}']]`;
    await page.locator(itemXpath).click();
}