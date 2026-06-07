"use server";

import { Pool } from 'pg';

// PostgreSQL connection pool configuration
const poolConfig = {
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  database: process.env.POSTGRES_DATABASE || 'tsl_site',
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

// Create connection pool
const pool = new Pool(poolConfig);

// Test database connection
pool.on('error', (err: Error) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

/**
 * Get a read/write database connection
 */
export async function getDb() {
  return createQueryInterface();
}

/**
 * Get a read-only database connection
 */
export async function getRoDb() {
  return getDb();
}

/**
 * Create a query interface compatible with the existing code
 */
function createQueryInterface() {
  return {
    request() {
      const inputs: { [key: string]: any } = {};
      return {
        input(name: string, value: any) {
          inputs[name] = value;
          return this;
        },
        async query(sql: string) {
          try {
            // Convert SQL Server syntax to PostgreSQL
            let pgSql = convertSqlToPostgres(sql);
            
            // Convert parameters from @param to $1, $2, etc.
            const paramNames: string[] = [];
            let paramIndex = 1;
            pgSql = pgSql.replace(/@(\w+)/g, (match, paramName) => {
              if (!paramNames.includes(paramName)) {
                paramNames.push(paramName);
              }
              const index = paramNames.indexOf(paramName) + 1;
              return `$${index}`;
            });
            
            // Build parameter array in order
            const params = paramNames.map(name => inputs[name]);
            
            const result = await pool.query(pgSql, params);
            
            // Convert PostgreSQL result to match mssql format
            return {
              recordset: result.rows,
              rowsAffected: result.rowCount,
            };
          } catch (error) {
            console.error('Database query error:', error);
            throw error;
          }
        },
      };
    },
  };
}

/**
 * Convert SQL Server syntax to PostgreSQL syntax
 */
function convertSqlToPostgres(sql: string): string {
  // Convert IDENTITY to SERIAL or BIGSERIAL
  // This is handled in the schema, so we don't need to convert it here
  
  // Convert NVARCHAR to TEXT or VARCHAR
  let pgSql = sql.replace(/NVARCHAR\(MAX\)/gi, 'TEXT');
  pgSql = pgSql.replace(/NVARCHAR\((\d+)\)/gi, 'VARCHAR($1)');
  
  // Convert DATETIMEOFFSET to TIMESTAMP WITH TIME ZONE
  pgSql = pgSql.replace(/DATETIMEOFFSET/gi, 'TIMESTAMP WITH TIME ZONE');
  
  // Convert GETDATE() or SYSDATETIMEOFFSET() to CURRENT_TIMESTAMP
  pgSql = pgSql.replace(/GETDATE\(\)/gi, 'CURRENT_TIMESTAMP');
  pgSql = pgSql.replace(/SYSDATETIMEOFFSET\(\)/gi, 'CURRENT_TIMESTAMP');
  
  // Convert ISJSON check (PostgreSQL doesn't need this for JSONB)
  pgSql = pgSql.replace(/CHECK \(ISJSON\([^)]+\) > 0\)/gi, '');
  
  return pgSql;
}

/**
 * Execute a raw query with parameters (for direct PostgreSQL access)
 */
export async function query(text: string, params?: any[]) {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

/**
 * Close all database connections (for graceful shutdown)
 */
export async function closePool() {
  await pool.end();
  console.log('Database connection pool closed');
}

/**
 * Health check for database connection
 */
export async function healthCheck(): Promise<boolean> {
  try {
    const client = await pool.connect();
    await client.query('SELECT 1');
    client.release();
    return true;
  } catch (error) {
    console.error('Database health check failed:', error);
    return false;
  }
}
