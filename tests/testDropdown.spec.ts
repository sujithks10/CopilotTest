import { test, expect } from '@playwright/test';
import { DropdownPage } from '../pages/dropdown-page';
import { url } from '../framework/testdata';

// HomePage POM for initial page
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
}

test('Dropdown selection and verification', async ({ page }) => {
    const homepage = new HomePage(page);
    await homepage.open();
    expect(await homepage.isLoaded()).toBeTruthy();

    await homepage.goToDropdownPage();
    const dropdownPage = new DropdownPage(page);
    expect(await dropdownPage.isDropdownPageLoaded()).toBeTruthy();

    const label = await dropdownPage.getDropdownLabel();
    expect(label?.trim()).toBe('Please select an option');

    await dropdownPage.selectOption('2');
    const selected = await dropdownPage.getSelectedOption();
    expect(selected?.trim()).toBe('Option 2');
});
