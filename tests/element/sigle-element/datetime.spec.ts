import test, { expect, Page } from "@playwright/test";

test.beforeEach('Test Before', async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/elements/date-time');
})

test('Verify time picker', async ({ page }) => {
    await selectTime(page, 'Time Picker', 11, 54, 59);
    await expect(page.getByText('Current time: 11:54:59')).toBeVisible();
})

test('Verify time picker select now', async ({ page }) => {
    let pickerXpath = `(//span[text()[normalize-space() = 'Time Picker']]/following::input)[1]`;
    let pickerLocation = page.locator(pickerXpath);
    await pickerLocation.click();
    let timewBeforClick = new Date();

    await page.waitForTimeout(1000);
    let pickerNowButtonCss = '.ant-picker-ranges .ant-picker-now a';
    await page.locator(pickerNowButtonCss).click();
    let actualTime = await pickerLocation.getAttribute('value');
    await page.waitForTimeout(1000);
    //
    let currentTime = new Date();
    let currentDate = currentTime.toISOString().split('T')[0];
    let actualDate = new Date(`${currentDate} ${actualTime}`);

    expect(actualDate.getTime()).toBeGreaterThan(timewBeforClick.getTime());
    expect(actualDate.getTime()).toBeLessThanOrEqual(currentTime.getTime());
})

async function selectTime(page: Page, label: string, hour: number, minute: number, second: number) {
    let pickerXpath = `(//span[text()[normalize-space() = '${label}']]/following::input)[1]`;
    await page.locator(pickerXpath).click();
    let hourXpath = `//ul[@data-type='hour']//li[contains(concat(' ',normalize-space(@class),''),'ant-picker-time-panel-cell') and @data-value='${hour}']`;
    await page.locator(hourXpath).click();
    let minuteXpath = `//ul[@data-type='minute']//li[contains(concat(' ',normalize-space(@class),''),'ant-picker-time-panel-cell') and @data-value='${minute}']`;
    await page.locator(minuteXpath).click();
    let secondXpath = `//ul[@data-type='second']//li[contains(concat(' ',normalize-space(@class),''),'ant-picker-time-panel-cell') and @data-value='${second}']`;
    await page.locator(secondXpath).click();
    let pickerokbuttonXpath = '.ant-picker-ranges .ant-picker-ok';
    await page.locator(pickerokbuttonXpath).click();
}

test('Verify date picker', async ({ page }) => {
    await selectDate(page, 1, 'May', 1990);
    await expect(page.getByText('Current date: 1990-05-01')).toBeVisible();
})

async function selectDate(page: Page, day: number, month: string, year: number) {
    let datepickerXpath = ``;
}