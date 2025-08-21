import { BlobServiceClient } from "@azure/storage-blob";
import sql from "mssql";

const sqlConfig = {
  user: process.env.AZURE_SQL_USER,
  password: process.env.AZURE_SQL_PASSWORD,
  server: process.env.AZURE_SQL_SERVER!,
  database: process.env.AZURE_SQL_DATABASE,
  options: {
    encrypt: true, // Use this if you're on Azure
    trustServerCertificate: false, // Change to true for local dev / self-signed certs
  },
};

export async function getDb() {
  if (!sql.pool) {
    await sql.connect(sqlConfig);
  }
  return sql;
}

const blobServiceClient = BlobServiceClient.fromConnectionString(
  process.env.AZURE_STORAGE_CONNECTION_STRING!
);
const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME!;

export async function uploadFile(file: File) {
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const timestamp = Date.now();
  const fileName = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
  const blockBlobClient = containerClient.getBlockBlobClient(fileName);
  const buffer = await file.arrayBuffer();
  await blockBlobClient.upload(buffer, buffer.byteLength);
  return blockBlobClient.url;
}
