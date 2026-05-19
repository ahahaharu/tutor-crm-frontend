'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { type LoginInput } from './schema';

export async function loginAction(values: LoginInput) {
  let isSuccess = false;

  try {
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      const errorData = await response.json();

      return {
        error: errorData.message?.[0] || 'Ошибка сервера',
        code: errorData.code || 'UNKNOWN_ERROR',
        field: errorData.field,
      };
    }

    const data = await response.json();

    if (!data.access_token) {
      return { error: 'Токен не получаен от сервера' };
    }

    const cookieStore = await cookies();
    cookieStore.set('auth_token', 'fake-jwt-token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
    });

    isSuccess = true;
  } catch (error) {
    console.error('Ошибка сети:', error);
    return { error: 'Не удалось подключится к серверу' };
  }

  if (isSuccess) {
    redirect('/dashboard');
  }
}
