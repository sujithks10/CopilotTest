import { HomePage } from '../pages/home-page';
import { test, expect } from '@playwright/test';
import { GenericPage } from '../pages/generic-page';
import { DynamicControlPage } from '../pages/dynamic-control-page';

let dynamicControlPage: DynamicControlPage;
let homePage: HomePage;
let genericPage: GenericPage;

test.beforeEach(async ({ page }) => {
    dynamicControlPage = new DynamicControlPage(page);
    homePage = new HomePage(page);
    genericPage = new GenericPage(page);
    await homePage.open();
    await homePage.goToDynamicControls();
});


test('Verify navigated to Dynamic Controls page', async () => {
    await expect(dynamicControlPage.getByTitle()).toBeVisible();
});

test('Verifying checkbox functionality in Dynamic Controls page', async () => {
    await genericPage.inputCheckbox().check();
    await expect(genericPage.inputCheckbox()).toBeChecked();
    await genericPage.inputCheckbox().uncheck();
    await expect(await genericPage.inputCheckbox().isChecked()).toBeFalsy();
});

test('Verify Add/Remove button functionality in Dynamic Controls page', async () => {
    await expect(genericPage.getDynamicButton('Remove')).toBeVisible();
    await genericPage.getDynamicButton('Remove').click();
    await expect(genericPage.getDynamicButton('Add')).toBeVisible();
    await expect(await genericPage.inputCheckbox().isVisible()).toBeFalsy();
    await genericPage.getDynamicButton('Add').click();
    await expect(genericPage.getDynamicButton('Remove')).toBeVisible();
    await expect(await genericPage.inputCheckbox().isVisible()).toBeTruthy();
});

test('Verify Enable/Disable button functionality in Dynamic Controls page', async () => {
    await expect(genericPage.getDynamicButton('Enable')).toBeVisible();
    await genericPage.getDynamicButton('Enable').click();
    await expect(genericPage.getInputTextBox()).toBeEnabled();
    await expect(genericPage.getDynamicButton('Disable')).toBeVisible();
    await genericPage.getDynamicButton('Disable').click();
    await expect(genericPage.getInputTextBox()).toBeDisabled();
});

test.only('Verify Dynamic Controls page', async () => {
    await expect(dynamicControlPage.getByTitle()).toBeVisible();

    await genericPage.inputCheckbox().check();
    await expect(genericPage.inputCheckbox()).toBeChecked();
    await genericPage.inputCheckbox().uncheck();
    await expect(await genericPage.inputCheckbox().isChecked()).toBeFalsy();

    await expect(genericPage.getDynamicButton('Remove')).toBeVisible();
    await genericPage.getDynamicButton('Remove').click();
    await expect(genericPage.getDynamicButton('Add')).toBeVisible();
    await expect(await genericPage.inputCheckbox().isVisible()).toBeFalsy();
    await genericPage.getDynamicButton('Add').click();
    await expect(genericPage.getDynamicButton('Remove')).toBeVisible();
    await expect(await genericPage.inputCheckbox().isVisible()).toBeTruthy();

    await expect(genericPage.getDynamicButton('Enable')).toBeVisible();
    await genericPage.getDynamicButton('Enable').click();
    await expect(genericPage.getInputTextBox()).toBeEnabled();
    await expect(genericPage.getDynamicButton('Disable')).toBeVisible();
    await genericPage.getDynamicButton('Disable').click();
    await expect(genericPage.getInputTextBox()).toBeDisabled();
});