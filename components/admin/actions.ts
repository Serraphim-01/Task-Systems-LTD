'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function addAnnouncement(formData: FormData) {
  const { title, content } = Object.fromEntries(formData.entries());

  const { error } = await supabase.from('announcements').insert([{ title, content }]);

  if (error) {
    return { error: 'Failed to add announcement.' };
  }

  revalidatePath('/media/announcements');

  return { success: 'Announcement added successfully.' };
}

export async function addBlog(formData: FormData) {
  const { title, content, author, image_url } = Object.fromEntries(formData.entries());

  const { error } = await supabase.from('blogs').insert([{ title, content, author, image_url }]);

  if (error) {
    return { error: 'Failed to add blog.' };
  }

  revalidatePath('/media/blogs');

  return { success: 'Blog added successfully.' };
}

export async function addEvent(formData: FormData) {
  const { name, description, date, location, image_url } = Object.fromEntries(formData.entries());

  const { error } = await supabase.from('events').insert([{ name, description, date, location, image_url }]);

  if (error) {
    return { error: 'Failed to add event.' };
  }

  revalidatePath('/media/events');

  return { success: 'Event added successfully.' };
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

export async function addPartner(formData: FormData) {
  const { name, logo, status, link, services } = Object.fromEntries(formData.entries());
  const servicesArray = (services as string).split(',').map(s => s.trim());

  const { error } = await supabase.from('partners').insert([{ name, logo, status, link, services: servicesArray }]);

  if (error) {
    return { error: 'Failed to add partner.' };
  }

  revalidatePath('/');

  return { success: 'Partner added successfully.' };
}
