// Utility functions for tests
export function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function waitForText(page, selector: string, expected: string, timeout = 5000) {
    await page.waitForSelector(selector, { timeout });
    const text = await page.locator(selector).textContent();
    return text?.includes(expected);
}
