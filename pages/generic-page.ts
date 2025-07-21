import type { Page } from 'playwright';

const checkbox = "input[type='checkbox']";
const textbox = "input[type='text']";

export class GenericPage {
    readonly page: Page;
    
    constructor(page: Page) {
        this.page = page;
    }

    inputCheckbox() {
        return this.page.locator(checkbox);
    }

    getByTitle(title: string) {
        return this.page.getByRole('heading', { name: title });
    }

    getDynamicButton(text: string) {
        return this.page.getByRole('button', { name: text });
    }

    getInputTextBox() {
        return this.page.locator(textbox);
    }
}
