import test, { expect, Page } from "@playwright/test";

test.beforeEach('Test Before', async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/elements/input');
})

test('Verify normal input', async ({page}) => {
    let xpath = `(//span[text()[normalize-space() = 'Normal Input']]/following::input)[1]`;
    await page.locator(xpath).fill('ABC');
    expect(page.getByText('Value: ABC')).toBeVisible();
})

test('Verify input number', async ({page}) => {
    let xpath = `(//span[text()[normalize-space() = 'Normal Input']]/following::input)[1]`;
    await page.locator(xpath).fill('ABC');
    expect(page.getByText('Value: ABC')).toBeVisible();
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