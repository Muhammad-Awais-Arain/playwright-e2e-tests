import { Page, Locator, expect } from "@playwright/test";

export class AppPage {
  readonly page: Page;
  readonly signInBtn: Locator;
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly loginBtn: Locator;
  readonly rememberMe: Locator;
  readonly registerBtn: Locator;
  readonly registerEmail: Locator;
  readonly registerPassword: Locator;
  readonly registerConfirmPassword: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly registerUserBtn: Locator;
  readonly homeHeading: Locator;
  readonly homeSideMenu: Locator;
  readonly sideMenuNotifications: Locator;
  readonly sideMenuMessages: Locator;
  readonly sideMenuProfile: Locator;
  readonly sideMenuLogOut: Locator;
  readonly tweetTextArea: Locator;
  readonly tweetBtn: Locator;
  readonly deleteTweet: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInBtn = page.getByRole("button", {
      name: "Sign in with Keycloak",
    });
    this.emailField = page.getByLabel("Email");
    this.passwordField = page.getByLabel("Password", { exact: true });
    this.rememberMe = page.getByLabel("Remember me");
    this.loginBtn = page.getByRole("button", { name: "Sign In" });
    this.registerBtn = page.getByRole("link", { name: "Register" });
    this.registerEmail = page.getByLabel("Email");
    this.registerPassword = page.getByLabel("Password", { exact: true });
    this.registerConfirmPassword = page.getByLabel("Confirm password");
    this.firstName = page.getByLabel("First name");
    this.lastName = page.getByLabel("Last name");
    this.registerUserBtn = page.getByRole("button", { name: "Register" });
    this.homeHeading = page.getByRole("heading", { name: "Home" });
    this.homeSideMenu = page.locator("label").filter({ hasText: "Home" });
    this.sideMenuNotifications = page.getByText("Notifications");
    this.sideMenuMessages = page.getByText("Messages");
    this.sideMenuProfile = page.getByText("Profile");
    this.sideMenuLogOut = page.locator('//label[contains(text(), "Logout")]');
    this.tweetTextArea = page.locator("#tweet-input");
    this.tweetBtn = page.locator('//button[contains(text(), "Tweet")]');
    this.deleteTweet = page.locator('[test-id^="delete-tweet"]').first();
}

  async goto(url: string) {
    await this.page.goto(url);
  }

  async getTweets() {
    const tweetElements = await this.page.$$(".text-white.mt-3.text-lg.cursor-pointer.px-5.py-3");
    const tweetsArray = await Promise.all(
      tweetElements.map(async (element) => {
        return await element.textContent();
      })
    );
    return tweetsArray;
  }  

  async expectPageLocators() {
    await expect(this.homeHeading).toBeVisible();
    await expect(this.homeSideMenu).toBeVisible();
    await expect(this.sideMenuNotifications).toBeVisible();
    await expect(this.sideMenuMessages).toBeVisible();
    await expect(this.sideMenuProfile).toBeVisible();
    await expect(this.sideMenuLogOut).toBeVisible();
  }

  async Tweets(input: string) {
    await this.tweetTextArea.fill(input);
    await this.tweetBtn.click();
  }

  async deleteTweetsFunc() {
    await this.deleteTweet.hover();
    await this.deleteTweet.click();
  }

  async login(email: string, password: string) {
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.rememberMe.click();
    await this.loginBtn.click();
  }

  async logout() {
    await this.sideMenuLogOut.click();
  }

  async Register(
    email: string,
    password: string,
    confirmPassword: string,
    firstName: string,
    lastName: string
  ) {
    await this.registerBtn.click();
    await this.registerEmail.fill(email);
    await this.registerPassword.fill(password);
    await this.registerConfirmPassword.fill(confirmPassword);
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.registerUserBtn.click();
  }
}