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
    const prefix = `${containerName}/`;
    const blobName = fileUrl.substring(fileUrl.indexOf(prefix) + prefix.length);

    if (!blobName) {
      throw new Error("Could not determine blob name from URL.");
    }
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Use deleteIfExists to prevent errors for non-existent blobs
    const response = await blockBlobClient.deleteIfExists();

    if (!response.didExist) {
      // For debugging, it can be useful to know if a blob was not found
      console.warn(`Blob not found for deletion: ${blobName}`);
    }

    return { success: true };
  } catch (error: any) {
    console.error(`Failed to delete blob "${fileUrl}":`, error.message);
    return { success: false, error: error.message };
  }
}