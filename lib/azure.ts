// lib/db.ts (server-only)
"use server";
import sql from "mssql";

const sqlConfig = {
  user: process.env.AZURE_SQL_USER,
  password: process.env.AZURE_SQL_PASSWORD,
  server: process.env.AZURE_SQL_SERVER!,
  database: process.env.AZURE_SQL_DATABASE,
  options: {
    encrypt: true,
    trustServerCertificate: false,
  },
};

const sqlRoConfig = {
  user: process.env.AZURE_SQL_RO_USER,
  password: process.env.AZURE_SQL_RO_PASSWORD,
  server: process.env.AZURE_SQL_SERVER!,
  database: process.env.AZURE_SQL_DATABASE,
  options: {
    encrypt: true,
    trustServerCertificate: false,
  },
};

let pool: sql.ConnectionPool | null = null;
let roPool: sql.ConnectionPool | null = null;

export async function getDb() {
  if (!pool) {
    pool = await sql.connect(sqlConfig);
  }
  return pool;
}

export async function getRoDb() {
  if (!roPool) {
    roPool = await sql.connect(sqlRoConfig);
  }
  return roPool;
}
