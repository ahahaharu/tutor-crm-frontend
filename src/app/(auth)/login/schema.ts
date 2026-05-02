import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: 'Пожалуйста, введите корректный email адрес.' }),
  password: z
    .string()
    .min(6, { message: 'Пароль должен содержать минимум 6 символов.' }),
});

export type LoginInput = z.infer<typeof loginSchema>;
