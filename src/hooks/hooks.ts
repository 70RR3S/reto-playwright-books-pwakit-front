import { chromium, Browser, Page } from '@playwright/test';

let navegador: Browser;
let page: Page;

beforeAll(async () => {
  navegador = await chromium.launch({
    headless: false,
    slowMo: 1000, 
  });
  page = await navegador.newPage();
  await page.goto('https://books-pwakit.appspot.com');
});

afterAll(async () => {
  await navegador.close();
});

export { page };
