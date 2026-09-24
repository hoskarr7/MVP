import sql from 'mssql';
import { environment } from '../config/environment';

let pool: sql.ConnectionPool | null = null;

async function obtenerPool(): Promise<sql.ConnectionPool> {
  if (!pool) {
    pool = await sql.connect({
      server: environment.db.server,
      database: environment.db.database,
      port: environment.db.port,
      user: environment.db.user,
      password: environment.db.password,
      options: {
        encrypt: environment.db.encrypt,
        trustServerCertificate: environment.db.trustServerCertificate,
      },
    });
  }
  return pool;
}

export async function ejecutarQuery<T extends Record<string, unknown> = Record<string, unknown>>(
  query: string,
  parametros?: Record<string, unknown>
): Promise<T[]> {
  const conexion = await obtenerPool();
  const request = conexion.request();
  for (const [nombre, valor] of Object.entries(parametros ?? {})) {
    request.input(nombre, valor);
  }
  const resultado = await request.query<T>(query);
  return resultado.recordset;
}

export async function cerrarConexionDb(): Promise<void> {
  if (pool) {
    await pool.close();
    pool = null;
  }
}
