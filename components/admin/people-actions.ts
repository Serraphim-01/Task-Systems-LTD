'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

// Helper function to upload image and get path
async function uploadImage(file: File, bucket: string) {
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage.from(bucket).upload(fileName, file);
    if (error) {
        console.error('Error uploading image:', error);
        return null;
    }
    return data.path;
}

// Director Actions
export async function addDirector(formData: FormData) {
    const name = formData.get('name') as string;
    const position = formData.get('position') as string;
    const company = formData.get('company') as string;
    const person_group = formData.get('person_group') as string;
    const image = formData.get('image') as File;
    const sections = formData.get('sections') as string;

    if (!name || !position || !image) {
        return { error: 'Missing required fields.' };
    }

    const image_path = await uploadImage(image, 'images');
    if (!image_path) {
        return { error: 'Failed to upload image.' };
    }

    const { data: directorData, error: directorError } = await supabase
        .from('directors')
        .insert({ name, position, image_path, company, person_group })
        .select()
        .single();

    if (directorError) {
        return { error: directorError.message };
    }

    if (sections) {
        const parsedSections = JSON.parse(sections);
        for (const [sectionIndex, section] of parsedSections.entries()) {
            const { data: sectionData, error: sectionError } = await supabase
                .from('director_sections')
                .insert({ director_id: directorData.id, section_order: sectionIndex, layout: section.layout })
                .select()
                .single();

            if (sectionError) return { error: `Failed to create section: ${sectionError.message}` };

            for (const [contentIndex, contentBlock] of section.content.entries()) {
                let finalContent = contentBlock.content;
                if (contentBlock.content_type === 'image_with_description') {
                    const sectionImageFile = formData.get(`section_image_${sectionIndex}_${contentIndex}`) as File;
                    if (sectionImageFile) {
                        const sectionImagePath = await uploadImage(sectionImageFile, 'images');
                        if (!sectionImagePath) return { error: 'Failed to upload section image.' };
                        finalContent = { ...finalContent, image: sectionImagePath };
                    }
                }

                const { error: contentError } = await supabase
                    .from('director_section_content')
                    .insert({
                        section_id: sectionData.id,
                        content_order: contentIndex,
                        content_type: contentBlock.content_type,
                        content: finalContent,
                    });

                if (contentError) return { error: `Failed to create content: ${contentError.message}` };
            }
        }
    }

    revalidatePath('/admin');
    revalidatePath('/');
    return { success: 'Director added successfully.' };
}

export async function deleteDirector(id: number, image_path: string) {
    // First, delete the image from storage
    if (image_path) {
        const { error: imageError } = await supabase.storage.from('images').remove([image_path]);
        if (imageError) {
            console.error('Error deleting image:', imageError);
            // Don't block deletion of DB record if image deletion fails
        }
    }

    // Then, delete the record from the database
    const { error } = await supabase.from('directors').delete().eq('id', id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/admin');
    revalidatePath('/');
    return { success: 'Director deleted successfully.' };
}

// Management Actions
export async function addManagement(formData: FormData) {
    const name = formData.get('name') as string;
    const position = formData.get('position') as string;
    const company = formData.get('company') as string;
    const person_group = formData.get('person_group') as string;
    const image = formData.get('image') as File;
    const sections = formData.get('sections') as string;

    if (!name || !position || !image) {
        return { error: 'Missing required fields.' };
    }

    const image_path = await uploadImage(image, 'images');
    if (!image_path) {
        return { error: 'Failed to upload image.' };
    }

    const { data: managementData, error: managementError } = await supabase
        .from('management')
        .insert({ name, position, image_path, company, person_group })
        .select()
        .single();

    if (managementError) {
        return { error: managementError.message };
    }

    if (sections) {
        const parsedSections = JSON.parse(sections);
        for (const [sectionIndex, section] of parsedSections.entries()) {
            const { data: sectionData, error: sectionError } = await supabase
                .from('management_sections')
                .insert({ management_id: managementData.id, section_order: sectionIndex, layout: section.layout })
                .select()
                .single();

            if (sectionError) return { error: `Failed to create section: ${sectionError.message}` };

            for (const [contentIndex, contentBlock] of section.content.entries()) {
                let finalContent = contentBlock.content;
                if (contentBlock.content_type === 'image_with_description') {
                    const sectionImageFile = formData.get(`section_image_${sectionIndex}_${contentIndex}`) as File;
                    if (sectionImageFile) {
                        const sectionImagePath = await uploadImage(sectionImageFile, 'images');
                        if (!sectionImagePath) return { error: 'Failed to upload section image.' };
                        finalContent = { ...finalContent, image: sectionImagePath };
                    }
                }

                const { error: contentError } = await supabase
                    .from('management_section_content')
                    .insert({
                        section_id: sectionData.id,
                        content_order: contentIndex,
                        content_type: contentBlock.content_type,
                        content: finalContent,
                    });

                if (contentError) return { error: `Failed to create content: ${contentError.message}` };
            }
        }
    }

    revalidatePath('/admin');
    revalidatePath('/');
    return { success: 'Management person added successfully.' };
}

export async function deleteManagement(id: number, image_path: string) {
    if (image_path) {
        const { error: imageError } = await supabase.storage.from('images').remove([image_path]);
        if (imageError) {
            console.error('Error deleting image:', imageError);
        }
    }

    const { error } = await supabase.from('management').delete().eq('id', id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/admin');
    revalidatePath('/');
    return { success: 'Management person deleted successfully.' };
}
