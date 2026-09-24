import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

function requiredEnv(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (value === undefined || value.trim() === '') {
    throw new Error(`Falta la variable de entorno requerida: ${name}`);
  }
  return value;
}

export type BrowserName = 'chromium' | 'firefox' | 'webkit';

export const environment = {
  baseUrl: requiredEnv('BASE_URL'),
  subdominio: process.env.SUBDOMINIO_APP ?? '',
  username: process.env.USERNAME_APP ?? '',
  password: process.env.PASSWORD_APP ?? '',
  get empresaId(): number {
    const value = Number(requiredEnv('EMPRESA_ID'));
    if (!Number.isSafeInteger(value) || value <= 0) {
      throw new Error('EMPRESA_ID debe ser un entero positivo');
    }
    return value;
  },
  browser: (process.env.BROWSER as BrowserName) ?? 'chromium',
  headless: (process.env.HEADLESS ?? 'true').toLowerCase() === 'true',
  recordVideo: (process.env.RECORD_VIDEO ?? 'false').toLowerCase() === 'true',
  slowMoMs: Number(process.env.SLOW_MO_MS ?? 0),
  defaultTimeoutMs: Number(process.env.DEFAULT_TIMEOUT_MS ?? 15000),
  db: {
    get database(): string {
      return requiredEnv('DB_DATABASE');
    },
    server: process.env.DB_SERVER ?? '',
    port: Number(process.env.DB_PORT ?? 1433),
    user: process.env.DB_USER ?? '',
    password: process.env.DB_PASSWORD ?? '',
    encrypt: (process.env.DB_ENCRYPT ?? 'true').toLowerCase() === 'true',
    trustServerCertificate: (process.env.DB_TRUST_SERVER_CERTIFICATE ?? 'true').toLowerCase() === 'true',
  },
};
