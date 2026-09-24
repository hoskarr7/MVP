import { Before, After, BeforeAll, AfterAll, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, firefox, webkit } from 'playwright';
import type { Browser } from 'playwright';
import * as path from 'path';
import { environment } from '../config/environment';
import { launchOptions, contextOptions, defaultTimeoutMs } from '../playwright.config';
import { cerrarConexionDb } from '../utils/db';
import type { ICustomWorld } from './world';

let browser: Browser;

const browserLaunchers = { chromium, firefox, webkit };

setDefaultTimeout(120 * 1000);

BeforeAll(async function () {
  browser = await browserLaunchers[environment.browser].launch(launchOptions);
});

Before(async function (this: ICustomWorld) {
  this.context = await browser.newContext(contextOptions);
  this.context.setDefaultTimeout(defaultTimeoutMs);
  this.page = await this.context.newPage();
});

After(async function (this: ICustomWorld, { pickle, result }) {
  if (result?.status === Status.FAILED && this.page) {
    const screenshot = await this.page.screenshot();
    this.attach(screenshot, 'image/png');
  }

  const video = this.page?.video();
  await this.page?.close();
  await this.context?.close();

  if (environment.recordVideo && video) {
    const nombreArchivo = pickle.name.replace(/[^a-zA-Z0-9-_]+/g, '-').slice(0, 100);
    await video.saveAs(path.join('evidence', 'videos', `${nombreArchivo}.webm`));
  }
});

AfterAll(async function () {
  await browser.close();
  await cerrarConexionDb();
});
