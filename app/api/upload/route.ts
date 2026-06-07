import { NextRequest, NextResponse } from "next/server";
import { uploadFile } from "@/lib/local-storage";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Get folder and filename from form data or use defaults
    const folder = (formData.get("folder") as string) || "uploads";
    const fileNameBase = (formData.get("fileName") as string) || `file-${Date.now()}`;

    const url = await uploadFile(file, folder, fileNameBase);

    return NextResponse.json({ url });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}