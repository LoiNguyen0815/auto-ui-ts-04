import test, { expect, Page } from "@playwright/test";
const dayjs = require('dayjs')

test.beforeEach('Test Before', async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/form');
})

test('Verify form validation message', async ({page}) => {
    await page.getByRole('button', {name: 'Submit'}).click();
    expect.soft(await getErrorMessageBylabel(page, 'Full Name')).toEqual("Please input your full name!");
    expect.soft(await getErrorMessageBylabel(page, 'Email')).toEqual("Please input your email!");
    expect.soft(await getErrorMessageBylabel(page, 'Phone Number')).toEqual("Please input your phone number!");
    expect.soft(await getErrorMessageBylabel(page, 'Date of Birth')).toEqual("Please select your date of birth!You must be at least 18 years old!");
    expect.soft(await getErrorMessageBylabel(page, 'Address')).toEqual("Please input your address!");
    console.log(test.info().errors);
    expect(test.info().errors).toHaveLength(0);
});

async function getErrorMessageBylabel(page: Page, label: string) {
    let errorXpath = `(//label[.//text()[normalize-space() = '${label}']]/following::div[@role='alert'])[1]`;
    let errorLocator = page.locator(errorXpath);
    let errorMessage = await errorLocator.textContent();
    return errorMessage?.trim();
}

test('Verify submit form successful', async ({page}) => {
    await fillTextboxByLable(page, 'Full Name', 'Test With Me');
    await fillTextboxByLable(page, 'Email', 'abc@gmail.com');
    await fillTextboxByLable(page, 'Phone Number', '1234567890');
    await fillTextboxByLable(page, 'Date of Birth', buildDynamicBirthdayAge(18, 'exact'));
    await fillTextboxByLable(page, 'Address', 'HCM');
    await fillTextboxByLable(page, 'Occupation', 'Tester');
    await fillTextboxByLable(page, 'Company', 'ABC');

    await page.getByRole('button', {name: 'Submit'}).click();
    expect(page.getByText('Your application has been submitted successfully.')).toBeVisible();
});

async function fillTextboxByLable(page:Page, label: string, input: string) {
    let inputXpath = `(//label[.//text()[normalize-space() = '${label}']]/following::input)[1]`;
    let inputLocator = page.locator(inputXpath);
    await inputLocator.fill(input);
    await page.keyboard.press('Tab');
}

function buildDynamicBirthdayAge(inputAge:number, type: 'exact' | 'lessThan' | 'graterThan') {
    const DateFormat = 'YYYY-MM-DD';
    switch(type){
        case "exact":
            return dayjs().subtract(inputAge, 'year').format(DateFormat);
        case "lessThan":
            return dayjs().subtract(inputAge, 'year').subtract(1, 'day').format(DateFormat);
        case "graterThan":
            return dayjs().subtract(inputAge, 'year').add(1, 'day').format(DateFormat);
    }
}