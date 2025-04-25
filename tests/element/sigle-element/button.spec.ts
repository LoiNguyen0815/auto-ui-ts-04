import test, {Page} from "@playwright/test";

test('Test button', async ({page}) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/elements/button');
    await clickButton(page, "Default");
})

async function clickButton(page: Page, label : string) {
    let xpath = `//button[.//text()[normalize-space()='${label}']]`;
    await page.click(xpath);
}