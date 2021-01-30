const { expect } = require('chai');
const { By, wait, until } = require('selenium-webdriver');
const { DriverService } = require('selenium-webdriver/remote');
var BasePage = require('./basePage');

const manufacture_name = `Test${Math.floor(Math.random() * 99)}`;

class CatalogPage extends BasePage {

    /** Catalog - Category Submenu Elements */

    catalog_menu = By.css('ul > li:nth-child(2) > a');
    categories_submenu = By.css('a[href="/Admin/Category/List"]');
    category_name_textfield = By.id('SearchCategoryName');
    category_search_button = By.id('search-categories');

    no_table_data_msg = By.css('#categories-grid > tbody > tr > td');
    category_name_from_table = By.css('#categories-grid > tbody > tr > td:nth-child(2)');

    /** Manufacturers Submenu Elements */
    
    manufacturers_submenu = By.css('a[href="/Admin/Manufacturer/List"]');

    add_manufacturer_button = By.css('a[href="/Admin/Manufacturer/Create"]');
    manufacturer_name_textfield = By.id('Name');
    manufacturer_save_button = By.name('save');
    manufacturer_created_success_msg = By.css('div.alert.alert-success.alert-dismissable');
    manufacturer_search_textfield = By.id('SearchManufacturerName');
    manufacturer_search_button = By.id('search-manufacturers');
    manufacturer_name_from_table = By.css('#manufacturers-grid > tbody > tr > td:nth-child(2)');

    /** CATEGORY SUBMENU Methods */

    /**
     * Click on either menu/submenu 
     * @param {} menuname 
     */
    async click_on_menu_or_submenu(menuname) {
        switch (menuname) {
            case 'catalog':
                await this.clickElement(this.catalog_menu);
                break;
            case 'categories':
                await this.clickElement(this.categories_submenu);
                break;
            case 'manufacturers':
                await this.clickElement(this.manufacturers_submenu);
                break;
            default:
                console.log(' - No menuname matched - ');
                break;
        }
    }

    /**
     * Search for a value in Category table
     * @param {*} text 
     */
    async submit_category_search_text(text) {
        await this.clickElement(this.category_name_textfield);
        console.log(" - Clicked in Categories menu search field - ");
        await driver.findElement(By.id('SearchCategoryName')).clear();
        await this.enterText(this.category_name_textfield, text);
        console.log(" - Entered text in Categories search field - ");
        await this.clickElement(this.category_search_button); // Search button
    }

    /**
     * To verify Empty Category table data
     */
    async verify_categories_table_empty_msg() {
        return await this.getMessageText(this.no_table_data_msg);
    }

    /**
     * To verify Category table data
     */
    async verify_categories_table_data() {
        return await this.getMessageText(this.category_name_from_table);
    }

    /**  MANUFACTURER SUBMENU Methods */

    /**
     * Enter New Manufacturer details
     */
    async enter_new_manufacturer_details() {
        console.log(' - Enter manufacturer name :: ' + manufacture_name);

        await this.clickElement(this.add_manufacturer_button);
        console.log(" - Clicked on Add new manufacturer button - ");
        await this.enterText(this.manufacturer_name_textfield, manufacture_name);
    }

    /**
     * Submit Manufacturer details
     */
    async submit_manufacturer_details() {
        await this.clickElement(this.manufacturer_save_button);
    }

    /**
     * Verify new Manufacturer successfully created message
     */
    async verify_manufacturers_success_msg() {
        return await this.getMessageText(this.manufacturer_created_success_msg);
    }

    /**
     * Search for newly created manufacturer listed into the Manufacturer table
     */
    async submit_manufacturer_search_text() {
        await this.clickElement(this.manufacturer_search_textfield);
        console.log(" - Clicked in Manufacturer menu search field - ");
        await driver.findElement(By.id('SearchManufacturerName')).clear();
        await this.enterText(this.manufacturer_search_textfield, manufacture_name);
        console.log(" - Entered text in Manufacturers search field - ");
        await this.clickElement(this.manufacturer_search_button); // Search button
    }

    /**
     * Returns true if newly created manufacturer successfully added into the table
     */
    async verify_newly_added_manufacturer_into_table() {
        let msg = await this.getMessageText(this.manufacturer_name_from_table);
        console.log(" Manufacturer name from table :: " + msg);
        expect(msg).to.equal(manufacture_name);
    }

}
module.exports = new CatalogPage();
