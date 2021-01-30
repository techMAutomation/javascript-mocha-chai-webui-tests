const basePage = require('../pageobjects/basePage');
const loginPage = require('../pageobjects/loginPage');
const catalogPage = require('../pageobjects/catalogPage');
const testData = require('../pageobjects/testData.json');
const { expect } = require('chai');
require('selenium-webdriver');

describe('*** UI Tests *** ', function() {

    this.timeout(50000);
    
    beforeEach( async() => {
        const baseUrl = "https://admin-demo.nopcommerce.com/login";
        await loginPage.go_to_url(baseUrl);
    });

    // Runs the test based on testData.json file
    testData.forEach(function(data, username, password) {
        it('Invalid Login Test - Email : ' + data.username + ' , Password : ' + data.password, async() => {

            // Enters Invalid Login credentials
            await loginPage.enter_login_details(data.username, data.password);
            await loginPage.click_login_submit_button();

            if (data.username !== ' ' && data.password === ' ') {
                let email_msg1 = await loginPage.verify_email_validation_msg();
                console.log(" Email validation message :: " + email_msg1);
                expect(email_msg1).include('Wrong email');

            } else if (data.username === ' ' && data.password !== ' ') {
                let email_msg2 = await loginPage.verify_email_validation_msg();
                console.log(" Email validation message :: " + email_msg2);
                expect(email_msg2).include('Please enter your email');

            } else {
                let login_msg = await loginPage.verify_login_validation_msg();
                console.log(" Login validation message :: " + login_msg);
                expect(login_msg).include("Login was unsuccessful. Please correct the errors and try again.\nThe credentials provided are incorrect");
            }
        });
    });

    it('Verify for Invalid/Valid Search item under Category menu after logged-in', async() => {
        // Enters Valid Login credentials
        await loginPage.enter_login_details("admin@yourstore.com", "admin");
        await loginPage.click_login_submit_button();
        
        // Clicks on Catalog menu
        await catalogPage.click_on_menu_or_submenu('catalog');

        // Clicks on Categories submenu
        await catalogPage.click_on_menu_or_submenu('categories');
        
        // Searches for Invalid Category name
        await catalogPage.submit_category_search_text("Hello");
        let msg = await catalogPage.verify_categories_table_empty_msg();
        console.log(" No table data msg :: " + msg);
        expect(msg).to.equal('No data available in table');

        // Searches for Valid Category name
        await catalogPage.submit_category_search_text("Computer");
        let text = await catalogPage.verify_categories_table_data();
        console.log(" Table data  :: " + text);
        expect(text).include('Computer');

        // Logout from site
        await loginPage.click_logout_link();
        let title = await loginPage.verify_loginpage_title();
        expect(title).to.equal('Welcome, please sign in!');
    });

    it('Test that logged-in User is able to create a new Manufacturer', async() => {
        // Enters Valid Login credentials
        await loginPage.enter_login_details("admin@yourstore.com", "admin");
        await loginPage.click_login_submit_button();
        
        // Clicks on Catalog menu
        await catalogPage.click_on_menu_or_submenu('catalog');

        // Clicks on Manufacturers submenu
        await catalogPage.click_on_menu_or_submenu('manufacturers');
        
        // Creates New Manufacturer
        await catalogPage.enter_new_manufacturer_details();
        await catalogPage.submit_manufacturer_details();

        // Verify for success message
        let success = await catalogPage.verify_manufacturers_success_msg();
        console.log(" Success msg  :: " + success);
        expect(success).contain('The new manufacturer has been added successfully.');

        // Verify for newly added manufacturer in the Manufacturer table
        await catalogPage.submit_manufacturer_search_text();
        await catalogPage.verify_newly_added_manufacturer_into_table();

        // Logout from site
        await loginPage.click_logout_link();
        let title = await loginPage.verify_loginpage_title();
        expect(title).to.equal('Welcome, please sign in!'); 
    });    

    it('Close Browser', async() => {
        // Closes the browser
        await loginPage.closeBrowser();
    });
})