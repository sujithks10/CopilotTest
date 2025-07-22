import { test, expect, devices } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { testData } from '../testdata';
import { waitForText } from '../utils/helpers';
import { UI_MESSAGES } from '../constants';

// Logggin test valid
test('Login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto(testData.login.url + 'login');
    await loginPage.login(testData.login.username, testData.login.password);
    const success = await waitForText(page, '.flash', UI_MESSAGES.LOGIN_SUCCESS);
    expect(success).toBeTruthy();
});

// Mobile test 
test.describe('Login on iPhone 16', () => {
    test.use({ ...devices['iPhone 16 Pro'], viewport: devices['iPhone 16 Pro'].viewport });
    test('Login with valid credentials on iPhone 16', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto(testData.login.url + 'login')
        await loginPage.login(testData.login.username, testData.login.password)
        const success = await waitForText(page, '.flash', UI_MESSAGES.LOGIN_SUCCESS);
        expect(success).toBeTruthy();
    });
});

// Loggin test
test('Login with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto(testData.login.url + 'login')
    await loginPage.login('invalid', 'invalid')
    const error = await waitForText(page, '.flash', UI_MESSAGES.LOGIN_INVALID)
    expect(error).toBeTruthy()
});
