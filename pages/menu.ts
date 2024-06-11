import { BasePage } from './base';


export class MenuPage extends BasePage {

  /**
   * @param {string} name 
   */
  async addCoffeeToCart(name) {
    await this.page.getByLabel(name, { exact: true }).click();
  }

  /**
   * @returns {Promise<import('@playwright/test').Locator>}
   */
  getTotal() {
    return this.page.locator('.pay');
  }

  async makeIrishCoffee() {
    await this.page.route('**/list.json', async route => {
      route.fulfill({
        status: 200, json: [{
          "name": "Irish Coffee",
          "price": 20,
          "recipe": [
            { "name": "espresso", "quantity": 40 },
            { "name": "irish whiskey", "quantity": 15 },
            { "name": "whipped cream", "quantity": 10 }
          ]
        }]
      })
    }
    )
  }

  async stopMakingIrishCoffee() {
    await this.page.unroute('**/list.json');
  }

  async autoHandleExtraCoffee(decline=true){
    const nahBtn = await this.page.getByText('Nah');
    const yesBtn = await this.page.getByText('of course');

    await this.page.addLocatorHandler(nahBtn, async () => {
      if (decline) {
        await nahBtn.click();
      } else {
        await yesBtn.click();
      }
    })
  }
}