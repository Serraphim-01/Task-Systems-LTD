"use server";

import { getDb } from "@/lib/azure";

export async function getPartners() {
  const db = await getDb();
  const result = await db.request().query("SELECT name FROM partners");
  return result.recordset;
}
