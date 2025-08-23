'use server';

import { getDb } from '@/lib/azure';
import { uploadFile } from '@/lib/storage';
import { revalidatePath } from 'next/cache';

// Generic function to handle file uploads and return the path
async function handleFileUpload(formData: FormData, fieldName: string): Promise<string | null> {
    const file = formData.get(fieldName) as File;
    if (file && file.size > 0) {
        return await uploadFile(file);
    }
    return null;
}

async function handleSectionUploads(
    entityId: number,
    entityType: 'announcement' | 'blog' | 'event',
    formData: FormData
) {
    const sections = formData.get('sections') ? JSON.parse(formData.get('sections') as string) : [];
    const db = await getDb();

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
                    const imagePath = await uploadFile(imageFile);
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
        const image_path = await handleFileUpload(formData, 'image');
        const document_path = await handleFileUpload(formData, 'document');
        const db = await getDb();

        const result = await db.request()
            .input('title', formData.get('title'))
            .input('short_description', formData.get('short_description'))
            .input('expires_at', formData.get('expires_at') || null)
            .input('links', formData.get('links') as string || null)
            .input('image_path', image_path)
            .input('document_path', document_path)
            .query('INSERT INTO announcements (title, short_description, expires_at, links, image_path, document_path) OUTPUT INSERTED.id VALUES (@title, @short_description, @expires_at, @links, @image_path, @document_path)');
        const newAnnouncementId = result.recordset[0].id;

        await handleSectionUploads(newAnnouncementId, 'announcement', formData);

        revalidatePath('/media/announcements');
        revalidatePath(`/media/announcements/${newAnnouncementId}`);
        return { success: 'Announcement added successfully.' };
    } catch (e: any) {
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

export async function deletePartner(id: number, logoPath?: string) {
  try {
    const db = await getDb();
    await db.request().input("id", id).query("DELETE FROM partners WHERE id = @id");

    // Optional: clean up logo from Blob storage later
    if (logoPath) {
      // await deleteBlob(logoPath);
    }

    revalidatePath("/");
    revalidatePath("/admin");
    return { success: "Partner deleted." };
  } catch (e: any) {
    return { error: e.message };
  }
}


export async function addBlog(formData: FormData) {
    try {
        const image_path = await handleFileUpload(formData, 'image');
        const document_path = await handleFileUpload(formData, 'document');
        const db = await getDb();

        const result = await db.request()
            .input('title', formData.get('title'))
            .input('short_description', formData.get('short_description'))
            .input('author', formData.get('author'))
            .input('expires_at', formData.get('expires_at') || null)
            .input('links', formData.get('links') as string || null)
            .input('image_path', image_path)
            .input('document_path', document_path)
            .query('INSERT INTO blogs (title, short_description, author, expires_at, links, image_path, document_path) OUTPUT INSERTED.id VALUES (@title, @short_description, @author, @expires_at, @links, @image_path, @document_path)');
        const newBlogId = result.recordset[0].id;

        await handleSectionUploads(newBlogId, 'blog', formData);

        revalidatePath('/media/blogs');
        revalidatePath(`/media/blogs/${newBlogId}`);
        return { success: 'Blog post added successfully.' };
    } catch (e: any) {
        return { error: e.message };
    }
}

export async function addEvent(formData: FormData) {
    try {
        const image_path = await handleFileUpload(formData, 'image');
        const document_path = await handleFileUpload(formData, 'document');
        const db = await getDb();

        const result = await db.request()
            .input('title', formData.get('title'))
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

        await handleSectionUploads(newEventId, 'event', formData);

        revalidatePath('/media/events');
        revalidatePath(`/media/events/${newEventId}`);
        return { success: 'Event added successfully.' };
    } catch (e: any) {
        return { error: e.message };
    }
}

export async function addPartner(formData: FormData) {
    try {
        const logo_path = await handleFileUpload(formData, 'logo');
        const db = await getDb();

        const services = formData.get('services') as string;
        const servicesArray = services ? services.split(',').map(s => s.trim()) : [];

        await db.request()
            .input('name', formData.get('name'))
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

export async function deleteAnnouncement(
  id: number,
  imagePath?: string,
  documentPath?: string
) {
  try {
    const db = await getDb();
    await db.request().input("id", id).query("DELETE FROM announcements WHERE id = @id");

    // optionally remove files from Blob Storage
    if (imagePath) {
      // await deleteBlob(imagePath);
    }
    if (documentPath) {
      // await deleteBlob(documentPath);
    }

    revalidatePath("/media/announcements");
    revalidatePath("/admin");
    return { success: "Announcement deleted." };
  } catch (e: any) {
    return { error: e.message };
  }
}


export async function deleteBlog(
  id: number,
  imagePath?: string,
  documentPath?: string
) {
  try {
    const db = await getDb();
    await db.request()
      .input("id", id)
      .query("DELETE FROM blogs WHERE id = @id");

    // TODO: delete from Azure Blob if needed
    if (imagePath) {
      // await deleteBlob(imagePath);
    }
    if (documentPath) {
      // await deleteBlob(documentPath);
    }

    revalidatePath("/media/blogs");
    revalidatePath("/admin");
    return { success: "Blog post deleted." };
  } catch (e: any) {
    return { error: e.message };
  }
}



export async function deleteEvent(
  id: number,
  imagePath?: string,
  documentPath?: string
) {
  try {
    const db = await getDb();
    await db.request().input("id", id).query("DELETE FROM events WHERE id = @id");

    // If you want to also delete files from Blob storage:
    if (imagePath) {
      // await deleteBlob(imagePath);
    }
    if (documentPath) {
      // await deleteBlob(documentPath);
    }

    revalidatePath("/media/events");
    revalidatePath("/admin");

    return { success: "Event deleted." };
  } catch (e: any) {
    return { error: e.message };
  }
}

