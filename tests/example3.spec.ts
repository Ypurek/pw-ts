import { test, expect } from '../fixtures/fixtures';
import { MenuPage } from '../pages/menu';


test('Buy just an Espresso', async ({ menuPage }) => {
  await menuPage.addCoffeeToCart('Espresso');
  await expect(menuPage.getCart()).toHaveText('cart (1)');
  await expect(menuPage.getTotal()).toContainText('$10.00');
});

const coffee = [
  ['Espresso', '$10.00'],
  ['Espresso Macchiato', '$12.00'],
  ['Cappuccino', '$19.00'],
  ['Mocha', '$8.00'],
  ['Flat White', '$18.00'],
  ['Americano', '$7.00'],
  ['Cafe Latte', '$16.00'],
  ['Espresso Con Panna', '$14.00'],
  ['Cafe Breve', '$15.00']]


// parametrized test
for (const [name, price] of coffee) {
  test(`Buy ${name}`, async ({ menuPage }) => {
    await menuPage.addCoffeeToCart(name);
    await expect(menuPage.getCart()).toHaveText('cart (1)');
    await expect(menuPage.getTotal()).toContainText(price);
  });
}