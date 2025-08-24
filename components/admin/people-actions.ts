'use server';

import { getDb } from '@/lib/azure';
import { uploadFile } from '@/lib/storage';
import { revalidatePath } from 'next/cache';

export async function getDirectors() {
    const db = await getDb();
    const result = await db.request().query('SELECT * FROM directors ORDER BY created_at DESC');
    return result.recordset;
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

    const image_path = await uploadFile(image, 'directors', name);
    if (!image_path) {
        return { error: 'Failed to upload image.' };
    }

    const db = await getDb();
    const directorResult = await db.request()
        .input('name', name)
        .input('position', position)
        .input('image_path', image_path)
        .input('company', company)
        .input('person_group', person_group)
        .query('INSERT INTO directors (name, position, image_path, company, person_group) OUTPUT INSERTED.id VALUES (@name, @position, @image_path, @company, @person_group)');
    const directorId = directorResult.recordset[0].id;

    if (sections) {
        const parsedSections = JSON.parse(sections);
        for (const [sectionIndex, section] of parsedSections.entries()) {
            const sectionResult = await db.request()
                .input('director_id', directorId)
                .input('section_order', sectionIndex)
                .input('layout', section.layout)
                .query('INSERT INTO director_sections (director_id, section_order, layout) OUTPUT INSERTED.id VALUES (@director_id, @section_order, @layout)');
            const sectionId = sectionResult.recordset[0].id;

            for (const [contentIndex, contentBlock] of section.content.entries()) {
                let finalContent = contentBlock.content;
                if (contentBlock.content_type === 'image_with_description' && contentBlock.content.image) {
                    const sectionImageFile = formData.get(`section_image_${sectionIndex}_${contentIndex}`) as File;
                    if (sectionImageFile) {
                        const sanitizedName = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
                        const sectionImagePath = await uploadFile(
                            sectionImageFile,
                            `directors/${sanitizedName}`,
                            `section-${sectionIndex}-${contentIndex}`
                        );
                        if (!sectionImagePath) return { error: 'Failed to upload section image.' };
                        finalContent = { ...finalContent, image: sectionImagePath };
                    }
                }

                await db.request()
                    .input('section_id', sectionId)
                    .input('content_order', contentIndex)
                    .input('content_type', contentBlock.content_type)
                    .input('content', JSON.stringify(finalContent))
                    .query('INSERT INTO director_section_content (section_id, content_order, content_type, content) VALUES (@section_id, @content_order, @content_type, @content)');
            }
        }
    }

    revalidatePath('/admin');
    revalidatePath('/');
    return { success: 'Director added successfully.' };
}

export async function deleteDirector(id: number): Promise<{ success?: string; error?: string }> {
  try {
    const db = await getDb();
    await db.request().input('id', id).query('DELETE FROM directors WHERE id = @id');

    revalidatePath('/admin');
    revalidatePath('/');
    return { success: 'Director deleted successfully.' };
  } catch (e: any) {
    return { error: e.message ?? 'Failed to delete director.' };
  }
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

    const image_path = await uploadFile(image, 'management', name);
    if (!image_path) {
        return { error: 'Failed to upload image.' };
    }

    const db = await getDb();
    const managementResult = await db.request()
        .input('name', name)
        .input('position', position)
        .input('image_path', image_path)
        .input('company', company)
        .input('person_group', person_group)
        .query('INSERT INTO management (name, position, image_path, company, person_group) OUTPUT INSERTED.id VALUES (@name, @position, @image_path, @company, @person_group)');
    const managementId = managementResult.recordset[0].id;

    if (sections) {
        const parsedSections = JSON.parse(sections);
        for (const [sectionIndex, section] of parsedSections.entries()) {
            const sectionResult = await db.request()
                .input('management_id', managementId)
                .input('section_order', sectionIndex)
                .input('layout', section.layout)
                .query('INSERT INTO management_sections (management_id, section_order, layout) OUTPUT INSERTED.id VALUES (@management_id, @section_order, @layout)');
            const sectionId = sectionResult.recordset[0].id;

            for (const [contentIndex, contentBlock] of section.content.entries()) {
                let finalContent = contentBlock.content;
                if (contentBlock.content_type === 'image_with_description' && contentBlock.content.image) {
                    const sectionImageFile = formData.get(`section_image_${sectionIndex}_${contentIndex}`) as File;
                    if (sectionImageFile) {
                        const sanitizedName = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
                        const sectionImagePath = await uploadFile(
                            sectionImageFile,
                            `management/${sanitizedName}`,
                            `section-${sectionIndex}-${contentIndex}`
                        );
                        if (!sectionImagePath) return { error: 'Failed to upload section image.' };
                        finalContent = { ...finalContent, image: sectionImagePath };
                    }
                }

                await db.request()
                    .input('section_id', sectionId)
                    .input('content_order', contentIndex)
                    .input('content_type', contentBlock.content_type)
                    .input('content', JSON.stringify(finalContent))
                    .query('INSERT INTO management_section_content (section_id, content_order, content_type, content) VALUES (@section_id, @content_order, @content_type, @content)');
            }
        }
    }

    revalidatePath('/admin');
    revalidatePath('/');
    return { success: 'Management person added successfully.' };
}

type DeleteResult = { success: string } | { error: string };

export async function deleteManagement(id: number): Promise<DeleteResult> {
  try {
    const db = await getDb();
    await db.request().input("id", id).query("DELETE FROM management WHERE id = @id");

    revalidatePath("/admin");
    revalidatePath("/");

    return { success: "Management person deleted successfully." };
  } catch (e: any) {
    return { error: e.message };
  }
}


export async function getManagement() {
    const db = await getDb();
    const result = await db.request().query('SELECT * FROM management ORDER BY created_at DESC');
    return result.recordset;
}
