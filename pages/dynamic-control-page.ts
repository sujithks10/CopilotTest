import type { Page } from 'playwright';

export class DynamicControlPage{
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    getByTitle(){
        return this.page.getByRole('heading', { name: 'Dynamic Controls' });
    }

 }
