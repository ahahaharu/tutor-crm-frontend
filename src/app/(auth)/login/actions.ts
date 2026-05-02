'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { type LoginInput } from './schema';
import { error } from 'console';

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
      if (response.status === 401) {
        return { error: 'Неверный email или пароль' };
      }
      if (response.status === 429) {
        return { error: 'Слишком много попыток. Попробуйте позже.' };
      }
      return { error: `Ошибка сервера: ${response.status}` };
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
