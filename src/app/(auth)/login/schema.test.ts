import { describe, it, expect } from 'vitest';
import { loginSchema } from './schema';

describe('Login Schema', () => {
  it('should pass validation with valid data', () => {
    const result = loginSchema.safeParse({
      email: 'tutor@test.com',
      password: 'Password123!',
    });

    expect(result.success).toBe(true);
  });

  it('should fail validation with an invalid email', () => {
    const result = loginSchema.safeParse({
      email: 'not-an-email',
      password: 'Password123!',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('email');
      expect(result.error.issues[0].code).toBe('invalid_string');
    }
  });

  it('should fail validation if password is shorter than 6 characters', () => {
    const result = loginSchema.safeParse({
      email: 'tutor@test.com',
      password: '12345',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('password');
      expect(result.error.issues[0].code).toBe('too_small');
    }
  });
});
