import { Page } from '@playwright/test';

export class DropdownPage {
    private page: Page;
    // Locators
    private headingLocator = 'h3';
    private dropdownLocator = '#dropdown';
    private dropdownOptionLocator = '#dropdown option';
    private dropdownSelectedOptionLocator = '#dropdown option:checked';

    constructor(page: Page) {
        this.page = page;
    }

    async isDropdownPageLoaded(): Promise<boolean> {
        return await this.page.locator(this.headingLocator).textContent().then(text => text?.includes('Dropdown List') ?? false);
    }

    async getDropdownLabel(): Promise<string | null> {
        return await this.page.locator(this.dropdownLocator).locator('option').first().textContent();
    }

    async selectOption(optionValue: string): Promise<void> {
        await this.page.selectOption(this.dropdownLocator, optionValue);
    }

    async getSelectedOption(): Promise<string | null> {
        return await this.page.locator(this.dropdownSelectedOptionLocator).textContent();
    }
}
