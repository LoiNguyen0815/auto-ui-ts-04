import test, { expect, Page } from "@playwright/test";

test.beforeEach('Test Before', async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/elements/button');
})

test('verify OTP box', async ({page}) =>{
    let xpath = `(//span[.//text()[normalize-space()='OTP Box']]/following::input)[1]`
    await page.inputValue(xpath,);
    await expect(page.getByText('value: 123456')).toBeVisible();
})

async function fillInput(page : Page, label: string, value: string) {
    let xpath = `(//span[.//text()[normalize-space()='${label}']]/following::input)[1]`;
    await page.locator(xpath);
    await page.keyboard.press('Enrter');
}