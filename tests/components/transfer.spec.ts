import test, { expect, Page } from "@playwright/test";

test.beforeEach('Test Before', async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/transfer');
})

test('Verify Transfer', async ({ page }) => {
    let sourceData = ['Apple','Banana', 'Kiwi'];
    let targetData = ['Orange','Pineapple', 'Strawberry'];

   await moveItemFromSourceToTaget(page, 'Transfer', ['Apple','Banana']);

   //Verify
    let sourceXpath = `(//span[.//text()[normalize-space()='Transfer']]/following::div[contains(concat(' ', normalize-space(@class), ' '), 'ant-transfer-list') and .//span[normalize-space()='Source']]//ul)[1]`;
    let sourceLocator = await page.locator(sourceXpath);
    let actualItems = await sourceLocator.allTextContents();
    actualItems = actualItems.map(value => value.trim());
    let expectedSource = ['Kiwi'];

    await expect(actualItems.length).toBe(expectedSource.length);
    await expect(actualItems).toEqual(expect.arrayContaining(expectedSource));
    await expect(expectedSource).toEqual(expect.arrayContaining(actualItems));

   // page.waitForTimeout(1000);
    //await expect(page.getByText(`Current value: Test, With, Me`)).toBeVisible();
})

async function moveItemFromSourceToTaget(page:Page, lable: string, items: string[]) {
    let sourceXpath = `(//span[.//text()[normalize-space()='${lable}']]/following::div[contains(concat(' ', normalize-space(@class), ' '), 'ant-transfer-list') and .//span[normalize-space()='Target']]//ul)[1]`;

    let sourceLocator = await page.locator(sourceXpath);

    for(let item of items){
        let itemXpath = `//li[.//span[normalize-space() = '${item}']]`;
        await sourceLocator.locator(itemXpath).click();
    }
    
    let buttonMoveToTargetXpath = `//span[.//text()[normalize-space()='${lable}']]/following::button[.//span[@aria-label='right']]`;
    await page.locator(buttonMoveToTargetXpath).click(); 

}

async function moveItemFromTagetToSource(page:Page, lable: string, items: string[]) {
    let targetXpath = `(//span[.//text()[normalize-space()='${lable}']]/following::div[contains(concat(' ', normalize-space(@class), ' '), 'ant-transfer-list') and .//span[normalize-space()='Target']]//ul)[1]`;

    let targetLocator = page.locator(targetXpath);

    for(let item of items){
        let itemXpath = `//li[.//span[normalize-space() = '${item}']]`;
        await targetLocator.locator(itemXpath).click();
    }
    
    let buttonMoveToTargetXpath = `//span[.//text()[normalize-space()='${lable}']]/following::button[.//span[@aria-label='left']]`;
    await page.locator(buttonMoveToTargetXpath).click(); 

}