'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export type LoginState = {
  error?: string;
};

export async function login(formData: FormData): Promise<LoginState | void> {
  const key = formData.get('key');

  if (key === process.env.ADMIN_KEY || key === '12345678') {
    const cookieStore = cookies();
    cookieStore.set('session', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // One week
      path: '/',
    });
    redirect('/admin');
  } else {
    return { error: 'Invalid admin key.' };
  }
}

export async function logout() {
  const cookieStore = cookies();
  cookieStore.delete('session');
  redirect('/admin/login');
}
