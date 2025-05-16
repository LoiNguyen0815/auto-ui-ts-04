import test, { expect, Page } from "@playwright/test";

test.beforeEach('Test Before', async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/cascader');
})

test('Verify select cascader', async ({ page }) => {
    let input = 'Test>With>Me';
    await selectCascader(page, 'Cascader', input);
    await expect(page.getByText(`Current value: Test, With, Me`)).toBeVisible();
})

async function selectCascader(page: Page, label: string, input: string) {
    let cascader = `(//span[.//text()[normalize-space()='${label}']]/following::input[contains(concat(' ', normalize-space(@class), ' '), 'ant-select-selection-search-input')])[1]`;
    await page.locator(cascader).click();

    let items = input.split('>');
    for (let item of items) {
        let itemXpath = `//li[@role='menuitemcheckbox' and .//div[normalize-space()='${item.trim()}']]`;
        await page.locator(itemXpath).click();
    }
}

test('Verify select cascader multiple values', async ({ page }) => {
    let input = 'Light>Number 1-Number 3';
    let input2 = 'Bamboo>Little>Toy Fish-Toy Cards-Toy Bird';
    let input3 = 'Bamboo>Little';
    await selectCascaderMultipleValues(page, 'Cascader multiple values', input3);
    await expect(page.getByText(`Current value:`).first()).toBeVisible();
})

async function selectCascaderMultipleValues(page: Page, label: string, input: string) {
    let cascader = `(//span[.//text()[normalize-space()='${label}']]/following::input[contains(concat(' ', normalize-space(@class), ' '), 'ant-select-selection-search-input')])[1]`;
    await page.locator(cascader).click();

    let parentItems = input.split('>');
    for (let i = 0; i < parentItems.length; i++) {
        if (i == parentItems.length - 1) {
            let items = parentItems[i].split('-');
            for (let item of items) {
                let itemXpath = `//li[@role='menuitemcheckbox' and .//div[normalize-space()='${item.trim()}']]`;
                let liIteamXpath = page.locator(itemXpath);
                let checkboxItem = liIteamXpath.locator('.ant-cascader-checkbox');
                let className = await checkboxItem.getAttribute('class');
                if (!className?.split(' ').includes('ant-cascader-checkbox-checked'))
                    await checkboxItem.click();
            }
        } else {
            let parentXpath = `//li[@role='menuitemcheckbox' and .//div[normalize-space()='${parentItems[i].trim()}']]`;
            await page.locator(parentXpath).click();
        }
    }

    await page.keyboard.press('Tab');
}