const { By } = require('selenium-webdriver');
var BasePage = require('./basePage');

class LoginPage extends BasePage {

    /** LOGIN Elements */ 

    page_title = By.className('title');
    email_textfield = By.id('Email');
    password_textfield = By.id('Password');
    login_button = By.css('input.button-1.login-button');
    logout_link = By.css('a[href="/logout"]');
    email_validation_msg = By.id('Email-error');
    login_validation_msg = By.css('div.message-error.validation-summary-errors');

    /**
     * Verify Login Page title
     */
    async verify_loginpage_title() {
        return await this.getMessageText(this.page_title);
    }

    /**
     * Enter Login credentials
     * @param {*} email 
     * @param {*} pwd 
     */
    async enter_login_details(email, pwd) {
        await this.clickElement(this.email_textfield);
        await driver.findElement(By.id('Email')).clear();
        await this.enterText(this.email_textfield, email);
        console.log(' - Entered login email : ' + email);

        await this.clickElement(this.password_textfield);
        await driver.findElement(By.id('Password')).clear();
        await this.enterText(this.password_textfield, pwd);
        console.log(' - Entered login password : ' + pwd);
    }

    /**
     * Submit login details
     */
    async click_login_submit_button() {
        await this.clickElement(this.login_button);
        console.log(' - Clicked on login submit button - ');
    }

    /**
     * Click on Logout link
     */
    async click_logout_link() {
        await this.clickElement(this.logout_link);
        console.log(' - Clicked on logout link - ');
    }

    /**
     * Return Email validation message
     */
    async verify_email_validation_msg() {
        return await this.getMessageText(this.email_validation_msg);
    }

    /**
     * Return Login failed message
     */
    async verify_login_validation_msg() {
        return await this.getMessageText(this.login_validation_msg);
    }
}
module.exports = new LoginPage();