import { test, expect } from '../fixtures/fixtures';
import { MenuPage } from '../pages/menu';


// test to replace network request with a mock
test('Buy just an Espresso', async ({ menuPage }) => {
  await menuPage.makeIrishCoffee();
  await menuPage.page.reload();
  await menuPage.addCoffeeToCart('Irish Coffee');
  await expect(menuPage.getCart()).toHaveText('cart (1)');
  await expect(menuPage.getTotal()).toContainText('$20.00');
  await menuPage.stopMakingIrishCoffee();
  await menuPage.page.reload();

  await expect(menuPage.page.getByLabel('Irish Coffee')).not.toBeVisible();
});
