import type { Page } from 'playwright';
import { isVisible } from '../framework/common-actions';


const input_username = 'input#username'
const input_password = 'input#password'
const button_login = 'button[type="submit"]'
const container_flashMsg = 'div#flash'

export class LoginPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async login(email: string, password: string) {
        await this.page.locator(input_username).fill(email)
        await this.page.locator(input_password).fill(password)
        await this.page.click(button_login);
    }

    async isUserLoggedIn() : Promise<boolean>{
        return await isVisible(this.page, container_flashMsg);
    }
}
