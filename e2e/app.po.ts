import { browser, by, element, protractor } from 'protractor';
export class HwVodPage {
  navigateTo() {
    return browser.get('/');
  }

  getPageTitle() {
    return browser.getTitle();
  }

  login() {
  	//browser.driver.get('http://localhost:4200/login');
	browser.driver.sleep(2500);
    var emailInput = browser.driver.findElement(by.name('email'));
    emailInput.sendKeys('angular-ui-test@heavywater.com');

    var passwordInput = browser.driver.findElement(by.css('.password-input'));
    passwordInput.sendKeys('testuser');  //you should not commit this to VCS

    var signInButton = browser.driver.findElement(by.css('.login-button'));
    signInButton.click();
    
    var EC = protractor.ExpectedConditions;
	var elm = element(by.css('.user-name'));
	return this.navigateTo().then(()=>{
			browser.wait(EC.presenceOf(elm), 2000);
    	//browser.wait(element(by.css('.user-name')).isPresent,5000);
    		return element(by.css('.user-name')).isPresent();
  		});
	}
}
