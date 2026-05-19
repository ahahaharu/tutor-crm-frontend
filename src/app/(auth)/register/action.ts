'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { type RegisterInput } from './schema';

export async function registerAction(
  values: Omit<RegisterInput, 'confirmPassword'>,
) {
  let isSuccess = false;

  try {
    const API_URL = process.env.API_URL || 'http://127.0.0.1:3000';

    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      const errorData = await response.json();

      return {
        // Твой фильтр всегда возвращает message как массив, берем первый элемент
        error: errorData.message?.[0] || 'Ошибка сервера',
        code: errorData.code || 'UNKNOWN_ERROR',
        field: errorData.field,
      };
    }

    const data = await response.json();

    if (!data.access_token) {
      return { error: 'Токен не получен от сервера' };
    }

    const cookieStore = await cookies();
    cookieStore.set('auth_token', data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
    });

    isSuccess = true;
  } catch (error) {
    console.error('Ошибка сети:', error);
    return { error: 'Не удалось подключиться к серверу' };
  }

  if (isSuccess) {
    redirect('/dashboard');
  }
}
