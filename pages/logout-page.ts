import type { Page } from 'playwright';
import { isVisible } from '../framework/common-actions';

const button_logout = 'a[href="/logout"]'

export class LogoutPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async logOut() {
        await this.page.click(button_logout);
    }

    async isUserInLogoutPage(): Promise<boolean> {
        return await isVisible(this.page, button_logout);
    }
}
