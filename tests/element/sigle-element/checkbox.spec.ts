import test, { expect, Page } from "@playwright/test";

test('Verify select checkbox', async ({page})  => {
    await page.goto("https://test-with-me-app.vercel.app/learning/web-elements/elements/checkbox");
    await selectCheckbox(page, 'Apple', true);

    let xpath = `//label[@class[contains(.,'ant-checkbox-wrapper-checked')] and .//input[@type='checkbox']]`;
    let elementLabels = page.locator(xpath);


    //let string = labels.join();

    await expect(page.getByText('Selected values: Apple')).toBeVisible();
})

test('Verify select uncheckbox', async ({page})  => {
    await page.goto("https://test-with-me-app.vercel.app/learning/web-elements/elements/checkbox");
    await selectCheckbox(page, 'Apple', false);
    //await expect(page.getByText('Selected values: Apple')).tobe();
})

async function selectCheckbox(page: Page, label: string, check : boolean) {
    let xpath = `//label[.//text()[normalize-space()='${label}'] and .//input[@type='checkbox']]`;
    let checkbox = page.locator(xpath);

    let className = await checkbox.getAttribute('class');
    let classnames = className?.split(' ');
    let currentStatus = classnames?.includes("ant-checkbox-wrapper-checked");

    if(!currentStatus && check || (currentStatus && !check)){
        await page.locator(xpath).click();
    }
}