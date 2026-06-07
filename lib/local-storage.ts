"use server";
import fs from "fs";
import path from "path";

const PUBLIC_DIR = path.join(process.cwd(), "public", "uploads");

// Ensure the uploads directory exists
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

export async function uploadFile(
  file: File,
  folder: string,
  fileNameBase: string
): Promise<string> {
  const folderPath = path.join(PUBLIC_DIR, folder);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  const extension = file.name.split(".").pop() || "bin";
  const sanitizedFileName = fileNameBase.toLowerCase().replace(/[^a-z0-9]/g, "-");
  const fileName = `${sanitizedFileName}.${extension}`;
  const filePath = path.join(folderPath, fileName);

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  fs.writeFileSync(filePath, new Uint8Array(arrayBuffer));

  // Return the public URL
  return `/uploads/${folder}/${fileName}`;
}

export async function deleteFile(fileUrl: string): Promise<{ success: boolean; error?: string }> {
  try {
    // Extract the file path from the URL
    const url = new URL(fileUrl, "http://localhost");
    const filePath = path.join(process.cwd(), "public", url.pathname);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return { success: true };
  } catch (error: any) {
    console.error(`Failed to delete file "${fileUrl}":`, error.message);
    return { success: false, error: error.message };
  }
}