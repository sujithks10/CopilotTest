import { test, expect } from '@playwright/test';
import { HorizontalSliderPage } from '../pages/horizontal-slider-page';
import { url } from '../framework/testdata';

class HomePage {
    private page;
    constructor(page) {
        this.page = page;
    }
    async open() {
        await this.page.goto(url);
    }
    async goToHorizontalSliderPage() {
        await this.page.click('a[href="/horizontal_slider"]');
    }
}

test.describe('Horizontal Slider Page Tests', () => {
    test('Verify page loads and heading is correct', async ({ page }) => {
        const homepage = new HomePage(page);
        await homepage.open();
        await homepage.goToHorizontalSliderPage();
        const sliderPage = new HorizontalSliderPage(page);
        expect(await sliderPage.isHorizontalSliderPageLoaded()).toBeTruthy();
    });

    const values = ['0', '1', '2', '3', '4', '5'];
    for (const value of values) {
        test(`Set slider to ${value} and verify`, async ({ page }) => {
            const homepage = new HomePage(page);
            await homepage.open();
            await homepage.goToHorizontalSliderPage();
            const sliderPage = new HorizontalSliderPage(page);
            await sliderPage.setSliderValue(value);
            const sliderValue = await sliderPage.getSliderValue();
            expect(sliderValue?.trim()).toBe(value);
        });
    }
    test('Click on slider and verify default value', async ({ page }) => {
        const homepage = new HomePage(page);
        await homepage.open();
        await homepage.goToHorizontalSliderPage();
        const sliderPage = new HorizontalSliderPage(page);
        await sliderPage.clickSlider();
        const sliderValue = await sliderPage.getSliderValue();
        expect(sliderValue?.trim()).toBe('0');
    });

    test('Drag slider to 4 and verify value', async ({ page }) => {
        const homepage = new HomePage(page);
        await homepage.open();
        await homepage.goToHorizontalSliderPage();
        const sliderPage = new HorizontalSliderPage(page);
        await sliderPage.dragSliderTo(4);
        const sliderValue = await sliderPage.getSliderValue();
        expect(sliderValue?.trim()).toBe('4');
    });
});
