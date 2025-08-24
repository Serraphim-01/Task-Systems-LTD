"use server";

import { getRoDb } from "@/lib/azure";

export async function getPartners() {
  const db = await getRoDb();
  const result = await db.request().query("SELECT name FROM partners");
  return result.recordset;
}
