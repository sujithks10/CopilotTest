import { Page } from '@playwright/test';

export class LoginPage {
    private page: Page;
    private usernameInput = 'input[name="username"]';
    private passwordInput = 'input[name="password"]';
    private submitButton = 'button[type="submit"]';
    private successMessage = '.flash.success';
    private errorMessage = '.flash.error';

    constructor(page: Page) {
        this.page = page;
    }

    async goto(url: string) {
        await this.page.goto(url);
    }

    async login(username: string, password: string) {
        await this.page.fill(this.usernameInput, username);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.submitButton);
    }

    async getSuccessMessage() {
        return await this.page.locator(this.successMessage).textContent();
    }

    async getErrorMessage() {
        return await this.page.locator(this.errorMessage).textContent();
    }
}
