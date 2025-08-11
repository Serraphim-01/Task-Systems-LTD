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
  const { title, description, location, type, department } = Object.fromEntries(formData.entries());

  const { error } = await supabase.from('jobs').insert([{ title, description, location, type, department }]);

  if (error) {
    return { error: 'Failed to add job.' };
  }

  revalidatePath('/careers');

  return { success: 'Job added successfully.' };
}
