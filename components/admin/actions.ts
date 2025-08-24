'use server';

import { getDb } from '@/lib/azure';
import { uploadFile, deleteFile } from '@/lib/storage';
import { revalidatePath } from 'next/cache';
import sql from 'mssql';

async function handleSectionUploads(
    entityId: number,
    entityType: 'announcement' | 'blog' | 'event',
    entityTitle: string,
    formData: FormData
) {
    const sections = formData.get('sections') ? JSON.parse(formData.get('sections') as string) : [];
    const db = await getDb();
    const sanitizedEntityTitle = entityTitle.toLowerCase().replace(/[^a-z0-9]/g, '-');

    for (const [sectionIndex, section] of sections.entries()) {
        const sectionResult = await db.request()
            .input(`${entityType}_id`, entityId)
            .input('section_order', sectionIndex)
            .input('layout', section.layout)
            .query(`INSERT INTO ${entityType}_sections (${entityType}_id, section_order, layout) OUTPUT INSERTED.id VALUES (@${entityType}_id, @section_order, @layout)`);
        const sectionId = sectionResult.recordset[0].id;

        for (const [contentIndex, contentBlock] of section.content.entries()) {
            let contentToInsert = contentBlock.content;
            if (contentBlock.content_type === 'image_with_description' && contentBlock.content.image) {
                const imageFile = formData.get(`section_image_${sectionIndex}_${contentIndex}`) as File;
                if (imageFile) {
                    const imagePath = await uploadFile(
                        imageFile,
                        `${entityType}s/${sanitizedEntityTitle}`,
                        `section-${sectionIndex}-${contentIndex}`
                    );
                    contentToInsert = { ...contentToInsert, image: imagePath };
                }
            }

            await db.request()
                .input('section_id', sectionId)
                .input('content_order', contentIndex)
                .input('content_type', contentBlock.content_type)
                .input('content', JSON.stringify(contentToInsert))
                .query(`INSERT INTO ${entityType}_section_content (section_id, content_order, content_type, content) VALUES (@section_id, @content_order, @content_type, @content)`);
        }
    }
}

export async function addAnnouncement(formData: FormData) {
    try {
        const title = formData.get('title') as string;
        if (!title) return { error: 'Title is required.' };

        const imageFile = formData.get('image') as File;
        const documentFile = formData.get('document') as File;
        let image_path = null;
        let document_path = null;

        if (imageFile && imageFile.size > 0) {
            image_path = await uploadFile(imageFile, 'announcements', title);
        }
        if (documentFile && documentFile.size > 0) {
            document_path = await uploadFile(documentFile, 'announcements', `${title}-document`);
        }

        const db = await getDb();

        const result = await db.request()
            .input('title', title)
            .input('short_description', formData.get('short_description'))
            .input('expires_at', formData.get('expires_at') || null)
            .input('links', formData.get('links') as string || null)
            .input('image_path', image_path)
            .input('document_path', document_path)
            .query('INSERT INTO announcements (title, short_description, expires_at, links, image_path, document_path) OUTPUT INSERTED.id VALUES (@title, @short_description, @expires_at, @links, @image_path, @document_path)');
        const newAnnouncementId = result.recordset[0].id;

        await handleSectionUploads(newAnnouncementId, 'announcement', title, formData);

        revalidatePath('/media/announcements');
        revalidatePath(`/media/announcements/${newAnnouncementId}`);
        return { success: 'Announcement added successfully.' };
    } catch (e: any) {
        return { error: e.message };
    }
}

export async function addBlog(formData: FormData) {
    try {
        const title = formData.get('title') as string;
        if (!title) return { error: 'Title is required.' };

        const imageFile = formData.get('image') as File;
        const documentFile = formData.get('document') as File;
        let image_path = null;
        let document_path = null;

        if (imageFile && imageFile.size > 0) {
            image_path = await uploadFile(imageFile, 'blogs', title);
        }
        if (documentFile && documentFile.size > 0) {
            document_path = await uploadFile(documentFile, 'blogs', `${title}-document`);
        }

        const db = await getDb();

        const result = await db.request()
            .input('title', title)
            .input('short_description', formData.get('short_description'))
            .input('author', formData.get('author'))
            .input('expires_at', formData.get('expires_at') || null)
            .input('links', formData.get('links') as string || null)
            .input('image_path', image_path)
            .input('document_path', document_path)
            .query('INSERT INTO blogs (title, short_description, author, expires_at, links, image_path, document_path) OUTPUT INSERTED.id VALUES (@title, @short_description, @author, @expires_at, @links, @image_path, @document_path)');
        const newBlogId = result.recordset[0].id;

        await handleSectionUploads(newBlogId, 'blog', title, formData);

        revalidatePath('/media/blogs');
        revalidatePath(`/media/blogs/${newBlogId}`);
        return { success: 'Blog post added successfully.' };
    } catch (e: any) {
        return { error: e.message };
    }
}

export async function addEvent(formData: FormData) {
    try {
        const title = formData.get('title') as string;
        if (!title) return { error: 'Title is required.' };

        const imageFile = formData.get('image') as File;
        const documentFile = formData.get('document') as File;
        let image_path = null;
        let document_path = null;

        if (imageFile && imageFile.size > 0) {
            image_path = await uploadFile(imageFile, 'events', title);
        }
        if (documentFile && documentFile.size > 0) {
            document_path = await uploadFile(documentFile, 'events', `${title}-document`);
        }

        const db = await getDb();

        const result = await db.request()
            .input('title', title)
            .input('short_description', formData.get('short_description'))
            .input('time', formData.get('time'))
            .input('date', formData.get('date'))
            .input('location', formData.get('location'))
            .input('expires_at', formData.get('expires_at') || null)
            .input('links', formData.get('links') as string || null)
            .input('image_path', image_path)
            .input('document_path', document_path)
            .query('INSERT INTO events (title, short_description, time, date, location, expires_at, links, image_path, document_path) OUTPUT INSERTED.id VALUES (@title, @short_description, @time, @date, @location, @expires_at, @links, @image_path, @document_path)');
        const newEventId = result.recordset[0].id;

        await handleSectionUploads(newEventId, 'event', title, formData);

        revalidatePath('/media/events');
        revalidatePath(`/media/events/${newEventId}`);
        return { success: 'Event added successfully.' };
    } catch (e: any) {
        return { error: e.message };
    }
}

export async function addPartner(formData: FormData) {
    try {
        const name = formData.get('name') as string;
        if (!name) return { error: 'Partner name is required.' };

        const logoFile = formData.get('logo') as File;
        let logo_path = null;

        if (logoFile && logoFile.size > 0) {
            logo_path = await uploadFile(logoFile, 'partners', name);
        }

        const db = await getDb();
        const services = formData.get('services') as string;
        const servicesArray = services ? services.split(',').map(s => s.trim()) : [];

        await db.request()
            .input('name', name)
            .input('status', formData.get('status'))
            .input('link', formData.get('link'))
            .input('services', JSON.stringify(servicesArray))
            .input('logo_path', logo_path)
            .query('INSERT INTO partners (name, status, link, services, logo_path) VALUES (@name, @status, @link, @services, @logo_path)');

        revalidatePath('/');
        revalidatePath('/admin');
        return { success: 'Partner added successfully.' };
    } catch (e: any) {
        return { error: e.message };
    }
}

export async function addJob(formData: FormData) {
  try {
    const db = await getDb();
    await db.request()
        .input('title', formData.get('title'))
        .input('description', formData.get('description'))
        .input('location', formData.get('location'))
        .input('type', formData.get('type'))
        .input('department', formData.get('department'))
        .input('apply_link', formData.get('apply_link'))
        .input('expires_at', formData.get('expires_at') || null)
        .query('INSERT INTO jobs (title, description, location, type, department, apply_link, expires_at) VALUES (@title, @description, @location, @type, @department, @apply_link, @expires_at)');

    revalidatePath('/careers');
    revalidatePath('/admin');
    return { success: 'Job added successfully.' };
  } catch (e: any) {
    return { error: e.message };
  }
}

async function deleteEntity(id: number, type: 'announcement' | 'blog' | 'event') {
    const db = await getDb();
    const transaction = new sql.Transaction(db);
    try {
        await transaction.begin();

        const request = new sql.Request(transaction);
        const result = await request.input('id', sql.Int, id).query(`SELECT * FROM ${type}s WHERE id = @id`);
        const entity = result.recordset[0];

        if (!entity) {
            await transaction.rollback();
            return { error: `${type} not found.` };
        }

        const filesToDelete: string[] = [];
        if (entity.image_path) filesToDelete.push(entity.image_path);
        if (entity.document_path) filesToDelete.push(entity.document_path);

        const sectionsResult = await request.input(`${type}_id`, sql.Int, id).query(`SELECT id FROM ${type}_sections WHERE ${type}_id = @${type}_id`);
        const sectionIds = sectionsResult.recordset.map(s => s.id);

        if (sectionIds.length > 0) {
            const contentRequest = new sql.Request(transaction);
            const contentPlaceholders = sectionIds.map((sid, i) => `@sid${i}`);
            sectionIds.forEach((sid, i) => contentRequest.input(`sid${i}`, sql.Int, sid));
            const contentResult = await contentRequest.query(`SELECT content FROM ${type}_section_content WHERE section_id IN (${contentPlaceholders.join(',')})`);

            for (const row of contentResult.recordset) {
                try {
                    const content = JSON.parse(row.content);
                    if (content.image) filesToDelete.push(content.image);
                } catch (e) { /* ignore */ }
            }

            const deleteContentRequest = new sql.Request(transaction);
            const deleteContentPlaceholders = sectionIds.map((sid, i) => `@sid${i}`);
            sectionIds.forEach((sid, i) => deleteContentRequest.input(`sid${i}`, sql.Int, sid));
            await deleteContentRequest.query(`DELETE FROM ${type}_section_content WHERE section_id IN (${deleteContentPlaceholders.join(',')})`);

            await request.input(`${type}_id_del`, sql.Int, id).query(`DELETE FROM ${type}_sections WHERE ${type}_id = @${type}_id_del`);
        }

        await request.input('id_del', sql.Int, id).query(`DELETE FROM ${type}s WHERE id = @id_del`);

        await transaction.commit();

        for (const fileUrl of filesToDelete) {
            await deleteFile(fileUrl);
        }

        revalidatePath(`/media/${type}s`);
        revalidatePath(`/media/${type}s/${id}`);
        revalidatePath('/admin');
        return { success: `${type} deleted successfully.` };
    } catch (e: any) {
        await transaction.rollback();
        return { error: e.message ?? `Failed to delete ${type}.` };
    }
}

export async function deleteAnnouncement(
  id: number,
  image_path?: string,
  document_path?: string
) {
    // Do custom cleanup
    if (image_path) await deleteFile(image_path);
    if (document_path) await deleteFile(document_path);

    return deleteEntity(id, 'announcement');
}


export async function deleteBlog(
  id: number,
  image_path?: string,
  document_path?: string
) {
    if (image_path) await deleteFile(image_path);
    if (document_path) await deleteFile(document_path);

    return deleteEntity(id, 'blog');
}


export async function deleteEvent(
  id: number,
  image_path?: string,
  document_path?: string
) {
    if (image_path) await deleteFile(image_path);
    if (document_path) await deleteFile(document_path);

    return deleteEntity(id, 'event');
}


export async function deletePartner(id: number) {
    const db = await getDb();
    const transaction = new sql.Transaction(db);
    try {
        await transaction.begin();
        const request = new sql.Request(transaction);

        const partnerResult = await request.input('id', sql.Int, id).query('SELECT logo_path FROM partners WHERE id = @id');
        const partner = partnerResult.recordset[0];

        if (partner && partner.logo_path) {
            await deleteFile(partner.logo_path);
        }

        await request.input('id_del', sql.Int, id).query('DELETE FROM partners WHERE id = @id_del');

        await transaction.commit();

        revalidatePath('/');
        revalidatePath('/admin');
        return { success: 'Partner deleted.' };
    } catch (e: any) {
        await transaction.rollback();
        return { error: e.message };
    }
}

export async function deleteJob(id: number) {
    try {
        const db = await getDb();
        await db.request().input('id', id).query('DELETE FROM jobs WHERE id = @id');

        revalidatePath('/careers');
        revalidatePath('/admin');
        return { success: 'Job deleted.' };
    } catch (e: any) {
        return { error: e.message };
    }
}
