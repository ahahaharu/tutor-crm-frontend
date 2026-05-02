'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { type LoginInput } from './schema';

export async function loginAction(values: LoginInput) {
  console.log('Server Action получил данные:', values.email);

  await new Promise((res) => setTimeout(res, 1000));

  const cookieStore = await cookies();
  cookieStore.set('auth_token', 'fake-jwt-token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect('/dashboard');
}
