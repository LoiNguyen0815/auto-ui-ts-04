import test, { expect, Page } from "@playwright/test";
import { haftRatingData, ratingData } from "./ratingdata";

test.beforeEach('Test Before', async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/rating');
})

for(let data of ratingData){
    test(`Verify select rating ${data.input}`, async ({ page }) => {
        await selectRateByLabel(page,'Rate', data.input);
        await expect(page.getByText(`Current rating: ${data.expect}`)).toBeVisible();
    })
}

async function selectRateByLabel(page: Page,label: string, rating: number ) {
    let rateComponentXpath = `(//span[.//text()[normalize-space()='${label}']]/following::ul[contains(concat(' ', normalize-space(@class), ' '), 'ant-rate')])[1]`;

    let rateComponentLocator = page.locator(rateComponentXpath);
    let currentStar = await rateComponentLocator.locator('.ant-rate-star-full').count();

    if(currentStar != rating)
    {
        await rateComponentLocator.locator(`li:nth-child(${rating})`).click();
    }
}

for(let haftdata of haftRatingData){
    test(`Verify select haft rating ${haftdata}`, async ({ page }) => {
        await selectHaftRateByLabel(page,'Haft Rate', haftdata);
        await expect(page.getByText(`Current rating: ${haftdata}`)).toBeVisible();
    })
}

async function selectHaftRateByLabel(page: Page,label: string, rating: number ) {
    let rateComponentXpath = `(//span[.//text()[normalize-space()='${label}']]/following::ul[contains(concat(' ', normalize-space(@class), ' '), 'ant-rate')])[1]`;
    let rateComponentLocator = page.locator(rateComponentXpath);

    let currentStar = await rateComponentLocator.locator('.ant-rate-star-full').count();
    let currentStarHaft = await rateComponentLocator.locator('.ant-rate-star-half').count();

    let totalStar = currentStarHaft > 0 ? currentStar+0.5: currentStar;

    if(totalStar != rating)
    {
        let liIndex = Math.ceil(rating);
        let firstOrSecond = rating < liIndex ? 'ant-rate-star-first' : 'ant-rate-star-second'

        await rateComponentLocator.locator(`li:nth-child(${liIndex}) .${firstOrSecond}`).click();
    }
}