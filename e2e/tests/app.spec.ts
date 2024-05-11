import { test, expect } from "@playwright/test";
import { AppPage } from "../pages/app.page";

let baseURL = process.env.BASE_URL || "";
let base_api_url = process.env.BASE_API_URL || "";

test.describe("App Page Scenarios", () => {

    let appPageObj: AppPage;
    //Login
    const loginUserEmail = "john@gmail.com";
    const loginUserPassword = "john";
    // Tweet
    const tweet = "This is an automated tweet 4";
    // Regiser Data
    const email = "john2@gmail.com";
    const password = "john";
    const confirmPassword = "john";
    const firstName = "John";
    const lastName = "Doe";

    test.beforeEach(async ({ page }) => {
        appPageObj = new AppPage(page);
        await appPageObj.goto(baseURL);
        await appPageObj.signInBtn.click();
    })

    test.afterEach(async ({ context }) => {
        for (const page of context.pages()) {
            await page.close();
        }
    });

    test("Login @Login", async () => {
        await appPageObj.login(loginUserEmail, loginUserPassword);
        await appPageObj.expectPageLocators();
    });

    test("Logout", async () => {
        await appPageObj.login(loginUserEmail, loginUserPassword);
        await appPageObj.expectPageLocators();
        await appPageObj.logout();
    });

    test("Register User", async ({ page }) => {
        await appPageObj.Register(email, password, confirmPassword, firstName, lastName);
        await appPageObj.expectPageLocators();
    });

    test("Write a Tweet", async ({ page }) => {
        await appPageObj.login(loginUserEmail, loginUserPassword);
        await appPageObj.expectPageLocators();
        await appPageObj.Tweets(tweet);
        await page.waitForTimeout(2000);
        const tweetsOnPage = await appPageObj.getTweets();
        console.log(tweetsOnPage);
        expect(tweetsOnPage).toContain(tweet);
        console.log(await page.locator("span.text-neutral-500").first().innerText());
    });

    test("Delete a Tweet", async ({ page }) => {
        await appPageObj.login(loginUserEmail, loginUserPassword);
        await appPageObj.expectPageLocators();
        const deleteButton = await page.waitForSelector('svg[test-id^="delete-tweet"]');
        await deleteButton.click();
        console.log('Tweet has been deleted.');
    });

    test("Navigate to Profile Page", async({ page }) => {
        await appPageObj.login(loginUserEmail, loginUserPassword);
        await appPageObj.expectPageLocators();
        await appPageObj.sideMenuProfile.click();
        await page.waitForTimeout(2000);
        expect(page.url()).toMatch(/profile/);
    });

    test("Navigate to Message Page", async({ page }) => {
        await appPageObj.login(loginUserEmail, loginUserPassword);
        await appPageObj.expectPageLocators();
        await appPageObj.sideMenuMessages.click();
        await page.waitForTimeout(2000);
        expect(page.url()).toMatch(/messages/);
    });

    test("Navigate to Notifications Page", async({ page }) => {
        await appPageObj.login(loginUserEmail, loginUserPassword);
        await appPageObj.expectPageLocators();
        await appPageObj.sideMenuNotifications.click();
        await page.waitForTimeout(2000);
        expect(page.url()).toMatch(/notifications/);
    });

    test("Like a Tweet", async ({ page }) => {
        await appPageObj.login(loginUserEmail, loginUserPassword);
        await appPageObj.expectPageLocators();
        const svgElement = await page.$('svg[test-id="like-tweet-1"]');
        if (svgElement === null) {
            console.log('The SVG element does not exist on the page.');
        } else {
            const isLiked = await svgElement.getAttribute('class').then(className => className?.includes('text-red-700'));

            if (isLiked) {
            console.log('The tweet is already liked.');
            } else {
            await svgElement.click();
            console.log('The tweet has been liked.');
            }
        }
    });

    test("API Tests", async ({ request, page }) => {
        await appPageObj.login(loginUserEmail, loginUserPassword);
        await page.waitForTimeout(4000);
        const tweetsOnPage = await appPageObj.getTweets();
        console.log("Tweets on Page:", tweetsOnPage);
        const api_url = `${base_api_url}/tweets`;
        const response = await request.get(api_url);
        const tweetsInAPI = await response.json();  
        console.log("Tweets in API: ", tweetsInAPI);
        expect(tweetsInAPI.length).toBe(tweetsOnPage.length);
    });    
});
