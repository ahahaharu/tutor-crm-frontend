'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Field, FieldLabel, FieldError } from '@/components/ui/field';

import { loginSchema, type LoginInput } from '@/app/(auth)/login/schema';
import { loginAction } from '@/app/(auth)/login/actions';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export function LoginForm() {
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(data: LoginInput) {
    try {
      const result = await loginAction(data);
      if (result?.error) {
        form.setError('root', { message: result.error });
      }
    } catch (error) {
      console.error(error);
      form.setError('root', { message: 'Произошла непредвиденная ошибка' });
    }
  }

  return (
    <div className="bg-card w-full max-w-sm rounded-xl border p-8 shadow-sm">
      <div className="mb-6 flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          С возвращением
        </h1>
        <p className="text-muted-foreground text-sm">
          Введите email и пароль для входа
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="email"
                placeholder="tutor@example.com"
                aria-invalid={fieldState.invalid}
                autoFocus
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Пароль</FieldLabel>
              <div className="relative">
                <Input
                  {...field}
                  id={field.name}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  aria-invalid={fieldState.invalid}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <EyeOff className="text-muted-foreground h-4 w-4" />
                  ) : (
                    <Eye className="text-muted-foreground h-4 w-4" />
                  )}
                </Button>
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {form.formState.errors.root && (
          <div className="text-destructive text-center text-sm font-medium">
            {form.formState.errors.root.message}
          </div>
        )}

        <Button
          type="submit"
          className="w-full font-semibold"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? 'Вход...' : 'Войти'}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm">
        Нет аккаунта?{' '}
        <Link
          href="/register"
          className="text-primary font-medium hover:underline"
        >
          Зарегистрироваться
        </Link>
      </div>
    </div>
  );
}
