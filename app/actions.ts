'use server';

import { getDb } from '@/lib/azure';

export async function getDirectorsForHome() {
    const db = await getDb();
    const result = await db.request().query('SELECT * FROM directors ORDER BY created_at ASC');
    return result.recordset;
}

export async function getManagementForHome() {
    const db = await getDb();
    const result = await db.request().query('SELECT * FROM management ORDER BY created_at ASC');
    return result.recordset;
}
