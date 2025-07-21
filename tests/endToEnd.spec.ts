import { test, expect } from '@playwright/test';
import { DropdownPage } from '../pages/dropdown-page';
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
    async isLoaded() {
        return await this.page.locator('h1').textContent().then(text => text?.includes('Welcome to the-internet') ?? false);
    }
    async goToDropdownPage() {
        await this.page.click('a[href="/dropdown"]');
    }
    async goToHorizontalSliderPage() {
        await this.page.click('a[href="/horizontal_slider"]');
    }
}

test('End-to-End: Dropdown and Horizontal Slider', async ({ page }) => {
    const homepage = new HomePage(page);
    await homepage.open();
    expect(await homepage.isLoaded()).toBeTruthy();

    // Dropdown test
    await homepage.goToDropdownPage();
    const dropdownPage = new DropdownPage(page);
    expect(await dropdownPage.isDropdownPageLoaded()).toBeTruthy();
    const label = await dropdownPage.getDropdownLabel();
    expect(label?.trim()).toBe('Please select an option');
    await dropdownPage.selectOption('2');
    const selected = await dropdownPage.getSelectedOption();
    expect(selected?.trim()).toBe('Option 2');

    // Go back to home
    await page.goto(url);
    expect(await homepage.isLoaded()).toBeTruthy();

    // Horizontal slider test
    await homepage.goToHorizontalSliderPage();
    const sliderPage = new HorizontalSliderPage(page);
    expect(await sliderPage.isHorizontalSliderPageLoaded()).toBeTruthy();
    await sliderPage.setSliderValue('3');
    expect(await sliderPage.getSliderValue()).toBe('3');
    await sliderPage.dragSliderTo(4);
    expect(await sliderPage.getSliderValue()).toBe('4');
});
