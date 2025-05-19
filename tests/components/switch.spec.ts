import test, { expect, Page } from "@playwright/test";

test.beforeEach('Test Before', async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/switch');
})

test('Verify button switch', async ({page}) => {
    await clickSwitchBylabel(page, 'Switch', 'false');
    await expect(page.getByText(`Current value: false`)).toBeVisible();
})

async function clickSwitchBylabel(page: Page, label: string, value: string) {
    let switchXpath = `//span[.//text()[normalize-space()='${label}']]/following::button[@role='switch'  and contains(concat(' ', normalize-space(@class), ' '), 'ant-switch')]`;
    let switchButton = page.locator(switchXpath);
    let isCheck = await switchButton.getAttribute('aria-checked');

    if(isCheck != value)
        await switchButton.click();

}