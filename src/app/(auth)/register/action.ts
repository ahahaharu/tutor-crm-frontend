'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { type RegisterInput } from './schema';

export async function registerAction(
  values: Omit<RegisterInput, 'confirmPassword'>,
) {
  let isSuccess = false;

  try {
    const response = await fetch('http://localhost:3000/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      if (response.status === 400) {
        const errorData = await response.json();
        const errorMessage = Array.isArray(errorData.message)
          ? errorData.message[0]
          : errorData.message || 'Ошибка регистрации';

        return { error: errorMessage };
      }
      return { error: `Ошибка сервера: ${response.status}` };
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
