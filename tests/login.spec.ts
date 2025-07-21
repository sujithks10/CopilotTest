import { test, expect } from '@playwright/test';
import { user } from '../framework/testdata';
import { HomePage } from '../pages/home-page';
import { LoginPage } from '../pages/login-page';
import { LogoutPage } from '../pages/logout-page';

test('User can login and logout', async ({ page }) => {
    const homepage = new HomePage(page);
    
    await homepage.open();
    await homepage.goToLoginPage();
    const loginpage = new LoginPage(page)
    
    await loginpage.login(user.username, user.password)

    const userIsLoggedIn = await loginpage.isUserLoggedIn();
    expect(userIsLoggedIn).toBeTruthy();

    const logOutpage = new LogoutPage(page)

    const userInLogoutPage =await logOutpage.isUserInLogoutPage();
    expect(userInLogoutPage).toBeTruthy();
    await logOutpage.logOut();

  });

test('User cannot login with invalid credentials', async ({ page }) => {
    const homepage = new HomePage(page);
    await homepage.open();
    await homepage.goToLoginPage();
    const loginpage = new LoginPage(page);
    await loginpage.login('qwerty', 'qwerty');
    const userIsLoggedIn = await loginpage.isUserLoggedIn();
    expect(userIsLoggedIn).toBeFalsy();
    // Optionally, check for error message if page object supports it
    // const errorMessage = await loginpage.getLoginErrorMessage();
    // expect(errorMessage).toContain('Invalid username or password');
});


