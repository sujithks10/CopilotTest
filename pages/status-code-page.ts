import { Page } from '@playwright/test';

export class StatusCodePage {
    private page: Page;
    private headingLocator = 'h3';
    private messageLocator = 'p';

    constructor(page: Page) {
        this.page = page;
    }

    async isStatusCodePageLoaded(): Promise<boolean> {
        return await this.page.locator(this.headingLocator).textContent().then(text => text?.includes('Status Codes') ?? false);
    }

    async goToStatusCode(code: string): Promise<void> {
        await this.page.click(`a[href="/status_codes/${code}"]`);
    }

    async getStatusMessage(): Promise<string | null> {
        return await this.page.locator(this.messageLocator).textContent();
    }
}
