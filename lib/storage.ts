import { BlobServiceClient } from "@azure/storage-blob";

const blobServiceClient = BlobServiceClient.fromConnectionString(
  process.env.AZURE_STORAGE_CONNECTION_STRING!
);
const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME!;

export async function uploadFile(
  file: File,
  folder: string,
  fileNameBase: string
) {
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const extension = file.name.split(".").pop() || "bin";
  const sanitizedFileName = fileNameBase.toLowerCase().replace(/[^a-z0-9]/g, "-");

  const blobName = `${folder}/${sanitizedFileName}.${extension}`;

  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const buffer = await file.arrayBuffer();
  await blockBlobClient.upload(buffer, buffer.byteLength);
  return blockBlobClient.url;
}

export async function deleteFile(fileUrl: string) {
  try {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobName = fileUrl.split("/").pop();
    if (!blobName) {
      throw new Error("Could not determine blob name from URL.");
    }
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.delete();
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete blob:", error.message);
    return { success: false, error: error.message };
  }
}