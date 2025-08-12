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

export async function addAnnouncement(formData: FormData) {
    try {
        const image_path = await handleFileUpload(formData, 'image', 'images');
        const document_path = await handleFileUpload(formData, 'document', 'documents');

        const { error } = await supabase.from('announcements').insert([{
            title: formData.get('title'),
            short_description: formData.get('short_description'),
            full_text: formData.get('full_text'),
            expires_at: formData.get('expires_at') || null,
            links: formData.get('links') ? JSON.parse(formData.get('links') as string) : null,
            image_path,
            document_path,
        }]);

        if (error) throw error;

        revalidatePath('/media/announcements');
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

        const { error } = await supabase.from('blogs').insert([{
            title: formData.get('title'),
            short_description: formData.get('short_description'),
            full_text: formData.get('full_text'),
            author: formData.get('author'),
            expires_at: formData.get('expires_at') || null,
            links: formData.get('links') ? JSON.parse(formData.get('links') as string) : null,
            image_path,
            document_path,
        }]);

        if (error) throw error;

        revalidatePath('/media/blogs');
        return { success: 'Blog post added successfully.' };
    } catch (e: any) {
        return { error: e.message };
    }
}

export async function addEvent(formData: FormData) {
    try {
        const image_path = await handleFileUpload(formData, 'image', 'images');
        const document_path = await handleFileUpload(formData, 'document', 'documents');

        const { error } = await supabase.from('events').insert([{
            title: formData.get('title'),
            short_description: formData.get('short_description'),
            full_text: formData.get('full_text'),
            "time": formData.get('time'),
            "date": formData.get('date'),
            location: formData.get('location'),
            expires_at: formData.get('expires_at') || null,
            links: formData.get('links') ? JSON.parse(formData.get('links') as string) : null,
            image_path,
            document_path,
        }]);

        if (error) throw error;

        revalidatePath('/media/events');
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
