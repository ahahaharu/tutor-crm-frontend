import { describe, it, expect } from 'vitest';
import { registerSchema } from './schema';

describe('Register Schema', () => {
  const validData = {
    name: 'Иван Иванов',
    email: 'tutor@test.com',
    password: 'Password123!',
    confirmPassword: 'Password123!',
  };

  it('should pass validation with valid data', () => {
    const result = registerSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should fail validation if passwords do not match', () => {
    const result = registerSchema.safeParse({
      ...validData,
      confirmPassword: 'DifferentPassword!',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('confirmPassword');
      expect(result.error.issues[0].code).toBe('custom');
    }
  });

  it('should fail validation if name is too short', () => {
    const result = registerSchema.safeParse({
      ...validData,
      name: 'И',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain('name');
      expect(result.error.issues[0].code).toBe('too_small');
    }
  });
});
