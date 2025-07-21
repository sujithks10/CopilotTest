import { Page } from '@playwright/test';

export class HorizontalSliderPage {
    private page: Page;
    private headingLocator = 'h3';
    private sliderLocator = 'input[type="range"]';
    private valueLocator = '#range';

    constructor(page: Page) {
        this.page = page;
    }

    async isHorizontalSliderPageLoaded(): Promise<boolean> {
        return await this.page.locator(this.headingLocator).textContent().then(text => text?.includes('Horizontal Slider') ?? false);
    }

    async setSliderValue(value: string): Promise<void> {
        await this.page.fill(this.sliderLocator, value);
        await this.page.keyboard.press('Tab'); // To trigger value update
    }

    async clickSlider(): Promise<void> {
        await this.page.click(this.sliderLocator);
    }

    async dragSliderTo(value: number): Promise<void> {
        const slider = this.page.locator(this.sliderLocator);
        const boundingBox = await slider.boundingBox();
        if (!boundingBox) throw new Error('Slider not found');
        // Slider min=0, max=5, step=0.5
        const min = 0, max = 5;
        const percent = (value - min) / (max - min);
        const x = boundingBox.x + percent * boundingBox.width;
        const y = boundingBox.y + boundingBox.height / 2;
        await this.page.mouse.move(boundingBox.x + 1, y);
        await this.page.mouse.down();
        await this.page.mouse.move(x, y);
        await this.page.mouse.up();
        await this.page.waitForTimeout(100); // Wait for value to update
    }

    async getSliderValue(): Promise<string | null> {
        return await this.page.locator(this.valueLocator).textContent();
    }
}
