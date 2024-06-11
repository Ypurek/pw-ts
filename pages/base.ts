import { Page, Locator } from '@playwright/test';

export class BasePage {
  public page: Page;
  public context: any;

  constructor(page: Page) {
    this.page = page;
    this.context = page.context();
  }

  async goto(url: string, options?: any): Promise<void> {
    await this.page.goto(url, options);
  }

  getCart(): Locator {
    return this.page.getByRole('link', { name: 'cart' });
  }

  async getPages(): Promise<Page[]> {
    return this.context.pages();
  }

  async navigateToCart(newWindow: boolean = false): Promise<void | Page> {
    const cart = await this.getCart();
    if (!newWindow) {
      await cart.click();
      const activeCart = await this.page.locator("[href='/cart'].router-link-active");
      await activeCart.waitFor({ state: 'visible' })
    } else {
      const PagePromise = this.context.waitForEvent('page');
      await cart.click({ button: 'middle' });
      const nePage = await PagePromise;
      return nePage;
    }
  }

}