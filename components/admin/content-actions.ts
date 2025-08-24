'use server';

import { getDb } from '@/lib/azure';
import { uploadFile, deleteFile } from '@/lib/storage';
import { revalidatePath } from 'next/cache';
import sql from 'mssql';

// Page Descriptions
export async function getPageDescription(page_key: string) {
    const db = await getDb();
    const result = await db.request()
        .input('page_key', sql.NVarChar, page_key)
        .query('SELECT description FROM page_descriptions WHERE page_key = @page_key');
    return result.recordset[0]?.description || '';
}

export async function updatePageDescription(formData: FormData) {
    try {
        const page_key = formData.get('page_key') as string;
        const description = formData.get('description') as string;

        if (!page_key) {
            return { error: 'Page key is required.' };
        }

        const db = await getDb();
        await db.request()
            .input('page_key', sql.NVarChar, page_key)
            .input('description', sql.NVarChar, description)
            .query(`
                MERGE page_descriptions AS target
                USING (SELECT @page_key AS page_key) AS source
                ON (target.page_key = source.page_key)
                WHEN MATCHED THEN
                    UPDATE SET description = @description, updated_at = SYSDATETIMEOFFSET()
                WHEN NOT MATCHED THEN
                    INSERT (page_key, description) VALUES (@page_key, @description);
            `);

        revalidatePath('/admin');
        // Also revalidate the public page, assuming a path structure
        revalidatePath(`/discover-us/${page_key.replace('_page', '')}`);

        return { success: 'Description updated successfully.' };
    } catch (e: any) {
        return { error: e.message };
    }
}

// Achievements
export async function getAchievements() {
    const db = await getDb();
    const result = await db.request().query('SELECT * FROM achievements ORDER BY created_at DESC');
    return result.recordset;
}

export async function addAchievement(formData: FormData) {
    try {
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;

        if (!title) {
            return { error: 'Title is required.' };
        }

        const db = await getDb();
        await db.request()
            .input('title', sql.NVarChar, title)
            .input('description', sql.NVarChar, description)
            .query('INSERT INTO achievements (title, description) VALUES (@title, @description)');

        revalidatePath('/admin');
        revalidatePath('/discover-us/achievements');
        return { success: 'Achievement added successfully.' };
    } catch (e: any) {
        return { error: e.message };
    }
}

export async function deleteAchievement(id: number) {
    try {
        const db = await getDb();
        await db.request().input('id', sql.Int, id).query('DELETE FROM achievements WHERE id = @id');
        revalidatePath('/admin');
        revalidatePath('/discover-us/achievements');
        return { success: 'Achievement deleted successfully.' };
    } catch (e: any) {
        return { error: e.message };
    }
}

// Awards
export async function getAwards() {
    const db = await getDb();
    const result = await db.request().query('SELECT * FROM awards ORDER BY created_at DESC');
    return result.recordset;
}

export async function addAward(formData: FormData) {
    try {
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;

        if (!title) {
            return { error: 'Title is required.' };
        }

        const db = await getDb();
        await db.request()
            .input('title', sql.NVarChar, title)
            .input('description', sql.NVarChar, description)
            .query('INSERT INTO awards (title, description) VALUES (@title, @description)');

        revalidatePath('/admin');
        revalidatePath('/discover-us/awards');
        return { success: 'Award added successfully.' };
    } catch (e: any) {
        return { error: e.message };
    }
}

export async function deleteAward(id: number) {
    try {
        const db = await getDb();
        await db.request().input('id', sql.Int, id).query('DELETE FROM awards WHERE id = @id');
        revalidatePath('/admin');
        revalidatePath('/discover-us/awards');
        return { success: 'Award deleted successfully.' };
    } catch (e: any) {
        return { error: e.message };
    }
}

// Certificates
export async function getCertificates() {
    const db = await getDb();
    const result = await db.request().query('SELECT * FROM certificates ORDER BY created_at DESC');
    return result.recordset;
}

export async function addCertificate(formData: FormData) {
    try {
        const title = formData.get('title') as string;
        const image = formData.get('image') as File;

        if (!title || !image) {
            return { error: 'Title and image are required.' };
        }

        const image_path = await uploadFile(image, 'certificates', title);
        if (!image_path) {
            return { error: 'Failed to upload image.' };
        }

        const db = await getDb();
        await db.request()
            .input('title', sql.NVarChar, title)
            .input('image_path', sql.NVarChar, image_path)
            .query('INSERT INTO certificates (title, image_path) VALUES (@title, @image_path)');

        revalidatePath('/admin');
        revalidatePath('/discover-us/certificates');
        return { success: 'Certificate added successfully.' };
    } catch (e: any) {
        return { error: e.message };
    }
}

export async function deleteCertificate(id: number) {
    const db = await getDb();
    const transaction = new sql.Transaction(db);
    try {
        await transaction.begin();

        const request = new sql.Request(transaction);
        const result = await request.input('id', sql.Int, id).query('SELECT image_path FROM certificates WHERE id = @id');
        const certificate = result.recordset[0];

        if (certificate && certificate.image_path) {
            await deleteFile(certificate.image_path);
        }

        await request.input('id_del', sql.Int, id).query('DELETE FROM certificates WHERE id = @id_del');

        await transaction.commit();

        revalidatePath('/admin');
        revalidatePath('/discover-us/certificates');
        return { success: 'Certificate deleted successfully.' };
    } catch (e: any) {
        await transaction.rollback();
        return { error: e.message };
    }
}
