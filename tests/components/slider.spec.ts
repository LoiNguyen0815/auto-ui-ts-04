import test, { expect, Page } from "@playwright/test";

test.beforeEach('Test Before', async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/slider');
});

[23 , 45 ,68].forEach(value => {
     test(`Verify Select Slider By Click: ${value}`, async ({page}) => {
        await selectValueOfSlider(page, 'Slider', value);
        await expect(page.getByText(`Current Value: ${value}`)).toBeVisible();
    })
}); 

async function selectValueOfSlider(page:Page, label:string,value: number) {
    let sliderXpath = `(//span[.//text()[normalize-space()='${label}']]/following::div[contains(concat(' ', normalize-space(@class), ' '), 'ant-slider-rail')])[1]`;
    let sliderLocator = page.locator(sliderXpath);

    let slierBoundingBox = await sliderLocator.boundingBox();
    let x = slierBoundingBox?.x ?? 0;
    let y = slierBoundingBox?.y ?? 0;
    let sliderWidth = slierBoundingBox?.width ?? 0;

    let beClickX = ((value * sliderWidth) / 100) + x;
    let beClickY = y + ((slierBoundingBox?.height ?? 0) / 2);

    await sliderLocator.hover();
    await page.mouse.click(beClickX, beClickY);

}

[23 , 45 ,68].forEach(value => {
     test(`Verify Select Slider By Slider: ${value}`, async ({page}) => {
        await selectValueOfSliderBySlider(page, 'Slider', value);
        await expect(page.getByText(`Current Value: ${value}`)).toBeVisible();
    })
}); 

async function selectValueOfSliderBySlider(page:Page, label:string,value: number) {
    let sliderXpath = `(//span[.//text()[normalize-space()='${label}']]/following::div[contains(concat(' ', normalize-space(@class), ' '), 'ant-slider-rail')])[1]`;
    let sliderLocator = page.locator(sliderXpath);

    let slierBoundingBox = await sliderLocator.boundingBox();
    let x = slierBoundingBox?.x ?? 0;
    let y = slierBoundingBox?.y ?? 0;
    let sliderWidthX = slierBoundingBox?.width ?? 0;
    let sliderWidthY = slierBoundingBox?.height ?? 0;

    let beClickX = ((value * sliderWidthX) / 100) + x;
    let beClickY = y + (sliderWidthY / 2);

    await sliderLocator.hover();
    await page.mouse.move(x, beClickY);
    await page.mouse.down();
    await page.mouse.move(beClickX, beClickY);
    await page.mouse.up();
}