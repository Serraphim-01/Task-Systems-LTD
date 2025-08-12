import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function uploadFile(bucket: string, file: File) {
  const timestamp = Date.now();
  const fileName = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

  const { data, error } = await supabase.storage
    .from(bucket) // Using the bucket parameter to keep it generic
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    console.error("Supabase upload error:", error);
    throw new Error(`Failed to upload file: ${error.message}`);
  }

  return data.path;
}
