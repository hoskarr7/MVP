import { environment } from './config/environment';
import type { LaunchOptions, BrowserContextOptions } from 'playwright';

export const launchOptions: LaunchOptions = {
  headless: environment.headless,
  slowMo: environment.slowMoMs,
};

export const contextOptions: BrowserContextOptions = {
  baseURL: environment.baseUrl,
  viewport: { width: 1440, height: 900 },
  ...(environment.recordVideo ? { recordVideo: { dir: 'evidence/videos', size: { width: 1440, height: 900 } } } : {}),
};

export const defaultTimeoutMs = environment.defaultTimeoutMs;
