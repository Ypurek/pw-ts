import { Locator } from '@playwright/test';
import { BasePage } from './base';


export class MenuPage extends BasePage {


  async addCoffeeToCart(name: string) {
    await this.page.getByLabel(name, { exact: true }).click();
  }


  getTotal(): Locator {
    return this.page.locator('.pay');
  }

  async makeIrishCoffee(): Promise<void> {
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

  async stopMakingIrishCoffee(): Promise<void> {
    await this.page.unroute('**/list.json');
  }

  async autoHandleExtraCoffee(decline = true): Promise<void> {
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