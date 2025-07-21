import { test, expect } from '@playwright/test';
import { StatusCodePage } from '../pages/status-code-page';
import { url } from '../framework/testdata';

class HomePage {
    private page;
    constructor(page) {
        this.page = page;
    }
    async open() {
        await this.page.goto(url);
    }
    async goToStatusCodePage() {
        await this.page.click('a[href="/status_codes"]');
    }
}

const statusCodes = [
    { code: '200', expected: 'This page returned a 200 status code.' },
    { code: '301', expected: 'This page returned a 301 status code.' },
    { code: '404', expected: 'This page returned a 404 status code.' },
    { code: '500', expected: 'This page returned a 500 status code.' }
];

test.describe('Status Code Page Tests', () => {
    for (const { code, expected } of statusCodes) {
        test(`Verify status code ${code} page`, async ({ page }) => {
            const homepage = new HomePage(page);
            await homepage.open();
            await homepage.goToStatusCodePage();
            const statusCodePage = new StatusCodePage(page);
            expect(await statusCodePage.isStatusCodePageLoaded()).toBeTruthy();
            await statusCodePage.goToStatusCode(code);
            const message = await statusCodePage.getStatusMessage();
            expect(message?.includes(expected)).toBeTruthy();
        });
    }
});
