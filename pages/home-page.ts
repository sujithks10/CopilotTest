import type { Page } from 'playwright';
import { url } from '../framework/testdata';

const link_login = 'a[href="/login"]'
const link_dynamicControls = 'a[href="/dynamic_controls"]'

export class HomePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async open() {
        await this.page.goto(url);
    }

    async goToLoginPage() {
        await this.page.click(link_login);
    }

    async goToDynamicControls(){
        await this.page.click(link_dynamicControls);
    }

}
