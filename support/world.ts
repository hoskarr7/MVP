import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import type { Browser, BrowserContext, Page } from 'playwright';
import type { ApiCallRecorder } from '../utils/apiCallRecorder';

export interface ICustomWorld extends World {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  apiCallRecorder?: ApiCallRecorder;
  comprobanteIdRecorder?: ApiCallRecorder;
  softFailures?: string[];
  numeroComprobanteEmitido?: string;
}

export class CustomWorld extends World implements ICustomWorld {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  apiCallRecorder?: ApiCallRecorder;
  comprobanteIdRecorder?: ApiCallRecorder;
  softFailures?: string[];
  numeroComprobanteEmitido?: string;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);
