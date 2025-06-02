import test, { expect, Page } from "@playwright/test";
import { expectedTableData } from "./table-test-data";

test.beforeEach('Test Before', async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/table');
})

test('Verify Table', async ({ page }) => {
    let tableXpath = `(//span[.//text()[normalize-space()='Table']]/following::table)[1]`;
    let tableLocator = page.locator(tableXpath);

    // 1.Get headers
    let headersLocators =  await tableLocator.locator('th').all();
    let headers:string[] = [];
    for(let headersLocator of headersLocators){
        let headerText = await headersLocator.textContent() ?? '';
        headers.push(headerText?.trim());
    }
    // 2. Get all rows in table
    let rows =  await tableLocator.locator('//tbody//tr').all();
    let actualRecord: any = []; 
    // 3. Loop through each row
    let nextButtonXpath = `//li[normalize-space(@title)='Next Page']`;
    let nextButton = page.locator(nextButtonXpath);
    let isNextButtonDisable = false;

    while(!isNextButtonDisable){
        isNextButtonDisable = await nextButton.locator('button').isDisabled();
        for(let row of rows){
            let record = {};
            // 3.1 For each corresponding index of headers we get data from corresponding td
            for(let i = 0; i < headers.length; i++ ){
                if('Tags' != headers[i]){
                    let tdLocator = row.locator(`//td(${i + 1})`);
                    let tags = await tdLocator.locator('.ant-tag').allTextContents();
                    tags = tags.map(v => v.trim());
                    record[headers[i].trim()] = tags;
                }
                else{
                    let text = await row.locator(`//td(${i + 1})`).textContent();
                    // 3.2 Put data to an object
                    if('Action' != headers[i]){
                        record[headers[i].trim()] = text?.trim();
                    }
                }
            }
            // 3.3 Add to results array 
            actualRecord.push(record);
        }
        await nextButton.click();
    }
    // 4. Veryfy actual data with expected data
    expect(actualRecord.length).toBe(expectedTableData.length);
    await expect(actualRecord).toEqual(expect.arrayContaining(expectedTableData));
    await expect(expectedTableData).toEqual(expect.arrayContaining(actualRecord));
})