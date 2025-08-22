import { BlobServiceClient } from "@azure/storage-blob";

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