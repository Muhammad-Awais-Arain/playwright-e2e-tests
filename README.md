# Automated Testing with Playwright

## Introduction

This repository contains automated tests written using Playwright for testing web applications. Follow the instructions below to install dependencies and run the tests.

## Installation

1. Install dependencies:

    ```bash
    npm i
    ```

2. Install Playwright:

    ```bash
    npm i --save-dev @playwright/test
    ```

## Running Tests

You can run tests using the command line:

- Trigger all tests inside the folder defined in `playwright.config.ts`:
  
    ```bash
    npx playwright test
    ```

- Trigger all tests inside the `e2e` project defined in `playwright.config.ts`:

    ```bash
    npx playwright test --project=e2e
    ```

- Trigger tests with a specific tag:

    ```bash
    npx playwright test --grep='@Login'
    ```

- Run an individual test named `Logout`:

    ```bash
    npx playwright test -g Logout
    ```

## Getting Started

Explore the tests inside the `e2e` folder. These tests were originally conducted on a client's website, but for learning purposes, you can adapt them to a dummy website of your choosing. 

### Setup Dummy Website

Replace the URL in the `.env` file with the URL of your dummy website.

### Understanding Locators

Take a look at the locators used in the `pages` folder to understand how elements are targeted within the website. This will help you comprehend the structure of the tests and how elements are interacted with.

This exercise is aimed at familiarizing yourself with automated testing using Playwright, so feel free to experiment and learn.

