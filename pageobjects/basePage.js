const { assert } = require('chai');
const { Builder, until, Select } = require('selenium-webdriver');
require('chromedriver', 'geckodriver');

var driver = new Builder().forBrowser('chrome').build();
driver.manage().setTimeouts({implicit: 15000});
driver.manage().window().maximize();

class BasePage {

    /**
     * Constructor
     */
    constructor() {
        global.driver = driver;
    }

    /**
     * Opens URL in the browser
     * @param {*} URL 
     */
    go_to_url(URL) {
        driver.get(URL);
    }

    /**
     * Clicks on the element 
     * @param {*} locator 
     */
    async clickElement(locator) {
        await driver.wait(until.elementLocated(locator), 15000)
                .click()
                .catch(error => { throw(error) });
    }

    /**
     * Enters text into the textfield
     * @param {*} locator 
     * @param {*} text 
     */
    async enterText(locator, text) {
        await driver.wait(until.elementLocated(locator), 10000)
                .sendKeys(text)
                .catch(error => { throw(error) });
    }

    /**
     * Returns text from an element
     * @param {*} locator 
     */
    async getMessageText(locator) {
        return await driver.wait(until.elementLocated(locator), 15000)
                    .getText()
                    .catch(error => { throw(error) });
    }

    /**
     * Returns value 'attribute' of an element
     * @param {*} locator 
     */
    async getTextFieldValue(locator) {
        return await driver.findElement(locator).getAttribute('value');
    }

    /**
     * Close the Browser
     */
    async closeBrowser() {
        await driver.quit();
    }

} module.exports = BasePage;