import { z } from 'zod';

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: 'Имя должно содержать минимум 2 символа.' }),
    email: z.string().email({ message: 'Введите корректный email адрес.' }),
    password: z
      .string()
      .min(6, { message: 'Пароль должен содержать миниум 6 символов.' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

export type RegisterInput = z.infer<typeof registerSchema>;
