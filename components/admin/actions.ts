'use server';

import { supabase, uploadFile } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

// Generic function to handle file uploads and return the path
async function handleFileUpload(formData: FormData, fieldName: string, bucket: string): Promise<string | null> {
    const file = formData.get(fieldName) as File;
    if (file && file.size > 0) {
        return await uploadFile(bucket, file);
    }
    return null;
}

async function handleSectionUploads(
    entityId: number,
    entityType: 'announcement' | 'blog' | 'event',
    formData: FormData
) {
    const sections = formData.get('sections') ? JSON.parse(formData.get('sections') as string) : [];

    for (const [sectionIndex, section] of sections.entries()) {
        const { data: sectionData, error: sectionError } = await supabase.from(`${entityType}_sections`).insert([{
            [`${entityType}_id`]: entityId,
            section_order: sectionIndex,
            layout: section.layout,
        }]).select();

        if (sectionError) throw sectionError;

        const newSection = sectionData[0];

        for (const [contentIndex, contentBlock] of section.content.entries()) {
            let contentToInsert = contentBlock.content;
            if (contentBlock.content_type === 'image_with_description' && contentBlock.content.image) {
                const imageFile = formData.get(`section_image_${sectionIndex}_${contentIndex}`) as File;
                if (imageFile) {
                    const imagePath = await uploadFile('images', imageFile);
                    contentToInsert = { ...contentToInsert, image: imagePath };
                }
            }

            const { error: contentError } = await supabase.from(`${entityType}_section_content`).insert([{
                section_id: newSection.id,
                content_order: contentIndex,
                content_type: contentBlock.content_type,
                content: contentToInsert,
            }]);

            if (contentError) throw contentError;
        }
    }
}

export async function addAnnouncement(formData: FormData) {
    try {
        const image_path = await handleFileUpload(formData, 'image', 'images');
        const document_path = await handleFileUpload(formData, 'document', 'documents');

        const { data, error } = await supabase.from('announcements').insert([{
            title: formData.get('title'),
            short_description: formData.get('short_description'),
            expires_at: formData.get('expires_at') || null,
            links: formData.get('links') ? JSON.parse(formData.get('links') as string) : null,
            image_path,
            document_path,
        }]).select();

        if (error) throw error;

        const newAnnouncement = data[0];
        await handleSectionUploads(newAnnouncement.id, 'announcement', formData);

        revalidatePath('/media/announcements');
        revalidatePath(`/media/announcements/${newAnnouncement.id}`);
        return { success: 'Announcement added successfully.' };
    } catch (e: any) {
        return { error: e.message };
    }
}

export async function deleteJob(id: number) {
    try {
        const { error } = await supabase.from('jobs').delete().eq('id', id);
        if (error) throw error;

        revalidatePath('/careers');
        revalidatePath('/admin');
        return { success: 'Job deleted.' };
    } catch (e: any) {
        return { error: e.message };
    }
}

export async function deletePartner(id: number, logoPath?: string) {
    try {
        await deleteFiles('images', [logoPath]);

        const { error } = await supabase.from('partners').delete().eq('id', id);
        if (error) throw error;

        revalidatePath('/');
        revalidatePath('/admin');
        return { success: 'Partner deleted.' };
    } catch (e: any) {
        return { error: e.message };
    }
}

export async function addBlog(formData: FormData) {
    try {
        const image_path = await handleFileUpload(formData, 'image', 'images');
        const document_path = await handleFileUpload(formData, 'document', 'documents');

        const { data, error } = await supabase.from('blogs').insert([{
            title: formData.get('title'),
            short_description: formData.get('short_description'),
            author: formData.get('author'),
            expires_at: formData.get('expires_at') || null,
            links: formData.get('links') ? JSON.parse(formData.get('links') as string) : null,
            image_path,
            document_path,
        }]).select();

        if (error) throw error;

        const newBlog = data[0];
        await handleSectionUploads(newBlog.id, 'blog', formData);

        revalidatePath('/media/blogs');
        revalidatePath(`/media/blogs/${newBlog.id}`);
        return { success: 'Blog post added successfully.' };
    } catch (e: any) {
        return { error: e.message };
    }
}

export async function addEvent(formData: FormData) {
    try {
        const image_path = await handleFileUpload(formData, 'image', 'images');
        const document_path = await handleFileUpload(formData, 'document', 'documents');

        const { data, error } = await supabase.from('events').insert([{
            title: formData.get('title'),
            short_description: formData.get('short_description'),
            "time": formData.get('time'),
            "date": formData.get('date'),
            location: formData.get('location'),
            expires_at: formData.get('expires_at') || null,
            links: formData.get('links') ? JSON.parse(formData.get('links') as string) : null,
            image_path,
            document_path,
        }]).select();

        if (error) throw error;

        const newEvent = data[0];
        await handleSectionUploads(newEvent.id, 'event', formData);

        revalidatePath('/media/events');
        revalidatePath(`/media/events/${newEvent.id}`);
        return { success: 'Event added successfully.' };
    } catch (e: any) {
        return { error: e.message };
    }
}

export async function addPartner(formData: FormData) {
    try {
        const logo_path = await handleFileUpload(formData, 'logo', 'images');

        const { error } = await supabase.from('partners').insert([{
            name: formData.get('name'),
            status: formData.get('status'),
            link: formData.get('link'),
            services: (formData.get('services') as string).split(',').map(s => s.trim()),
            logo_path,
        }]);

        if (error) throw error;

        revalidatePath('/');
        return { success: 'Partner added successfully.' };
    } catch (e: any) {
        return { error: e.message };
    }
}

export async function addJob(formData: FormData) {
  try {
    const { error } = await supabase.from('jobs').insert([{
      title: formData.get('title'),
      description: formData.get('description'),
      location: formData.get('location'),
      type: formData.get('type'),
      department: formData.get('department'),
      apply_link: formData.get('apply_link'),
      expires_at: formData.get('expires_at') || null,
    }]);

    if (error) throw error;


    revalidatePath('/careers');
    revalidatePath('/admin');
    return { success: 'Job added successfully.' };
  } catch (e: any) {
    return { error: e.message };
  }
}

// Helper function to delete files from storage, ignoring errors if files don't exist
async function deleteFiles(bucket: string, paths: (string | null | undefined)[]) {
    const validPaths = paths.filter(p => typeof p === 'string' && p) as string[];
    if (validPaths.length > 0) {
        const { error } = await supabase.storage.from(bucket).remove(validPaths);
        if (error && error.message !== 'The resource was not found') {
            // Log error if it's not a "not found" error
            console.error(`Storage delete error in bucket ${bucket}:`, error);
        }
    }
}

export async function deleteAnnouncement(id: number, imagePath?: string, docPath?: string) {
    try {
        await deleteFiles('images', [imagePath]);
        await deleteFiles('documents', [docPath]);

        const { error } = await supabase.from('announcements').delete().eq('id', id);
        if (error) throw error;

        revalidatePath('/media/announcements');
        revalidatePath('/admin');
        return { success: 'Announcement deleted.' };
    } catch (e: any) {
        return { error: e.message };
    }
}

export async function deleteBlog(id: number, imagePath?: string, docPath?: string) {
    try {
        await deleteFiles('images', [imagePath]);
        await deleteFiles('documents', [docPath]);

        const { error } = await supabase.from('blogs').delete().eq('id', id);
        if (error) throw error;

        revalidatePath('/media/blogs');
        revalidatePath('/admin');
        return { success: 'Blog post deleted.' };
    } catch (e: any) {
        return { error: e.message };
    }
}


export async function deleteEvent(id: number, imagePath?: string, docPath?: string) {
    try {
        await deleteFiles('images', [imagePath]);
        await deleteFiles('documents', [docPath]);

        const { error } = await supabase.from('events').delete().eq('id', id);
        if (error) throw error;

        revalidatePath('/media/events');
        revalidatePath('/admin');
        return { success: 'Event deleted.' };
    } catch (e: any) {
        return { error: e.message };
    }
}
