import test, { expect, Page } from "@playwright/test";

test.beforeEach('Test Before', async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/tree-select');
})

test('Verify Select TreeSelect', async ({page}) => {
    let input = 'Light';
    let input1 = 'Light>Pine';
    let input2 = 'Heavy';
    let input3 = 'Heavy>Mahogany';

    await selectTreeSelectBylabel(page, 'TreeSelect', input1);
    await expect(page.getByText(`Current value: pine`)).toBeVisible();
})

async function selectTreeSelectBylabel(page: Page, label: string, input: string) {
    let treeSelectXpath = `//span[.//text()[normalize-space()='TreeSelect']]/following::div[contains(concat(' ', normalize-space(@class), ' '), 'ant-select-selector')]`;
    await page.locator(treeSelectXpath).click();

    let data = input.split('>');

    for(let i = 0; i < data.length; i++){
        let value = data[i];

        if(i == (data.length - 1)){
            let titleInputXpath = `//span[.//text()[normalize-space()='${value}'] and contains(concat(' ', normalize-space(@class), ' '), 'ant-select-tree-title')]`;
            await page.locator(titleInputXpath).click();
        }else{
            let divParentItemXpath = `(//span[.//text()[normalize-space()='${value}'] and contains(concat(' ', normalize-space(@class), ' '), 'ant-select-tree-node-content-wrapper')])/parent::div`;
            let parentItemLocator = page.locator(divParentItemXpath);

            let iconXpath = parentItemLocator.locator('.ant-select-tree-switcher');
            await iconXpath.click();
        }
    }
}