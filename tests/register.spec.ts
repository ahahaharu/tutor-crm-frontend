import { test, expect } from '@playwright/test';

test.describe('Register Form (E2E)', () => {
  test('should show validation errors when submitting an empty form', async ({
    page,
  }) => {
    await page.goto('/register');
    await page.click('button[type="submit"]');

    await expect(page.getByTestId('field-error')).toHaveCount(4);
  });

  test('should show an error if passwords do not match', async ({ page }) => {
    await page.goto('/register');

    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[name="email"]', 'john@test.com');
    await page.fill('input[name="password"]', 'Password123!');
    await page.fill('input[name="confirmPassword"]', 'WrongPassword!');
    await page.click('button[type="submit"]');

    const confirmPasswordGroup = page.locator('[data-slot="field"]', {
      has: page.locator('input[name="confirmPassword"]'),
    });

    await expect(confirmPasswordGroup.getByTestId('field-error')).toBeVisible();
    await expect(confirmPasswordGroup).toHaveAttribute('data-invalid', 'true');
  });

  test('should show an error from backend if email is already taken', async ({
    request,
    page,
  }) => {
    const API_URL = process.env.API_URL || 'http://127.0.0.1:3000';

    const existingEmail = `taken-${Date.now()}@example.com`;
    await request.post(`${API_URL}/auth/register`, {
      data: {
        email: existingEmail,
        password: 'ValidPassword123!',
        name: 'Existing User',
      },
    });

    await page.goto('/register');
    await page.fill('input[name="name"]', 'New User');
    await page.fill('input[name="email"]', existingEmail);
    await page.fill('input[name="password"]', 'Password123!');
    await page.fill('input[name="confirmPassword"]', 'Password123!');
    await page.click('button[type="submit"]');

    const emailGroup = page.locator('[data-slot="field"]', {
      has: page.locator('input[name="email"]'),
    });

    await expect(emailGroup.getByTestId('field-error')).toBeVisible();
    await expect(emailGroup).toHaveAttribute('data-invalid', 'true');
  });

  test('HAPPY PATH: should successfully register a new user and redirect to Dashboard', async ({
    page,
  }) => {
    await page.goto('/register');

    const uniqueEmail = `newuser-${Date.now()}@example.com`;

    await page.fill('input[name="name"]', 'Jane Doe');
    await page.fill('input[name="email"]', uniqueEmail);
    await page.fill('input[name="password"]', 'SuperSecret123!');
    await page.fill('input[name="confirmPassword"]', 'SuperSecret123!');
    await page.click('button[type="submit"]');

    await page.waitForURL('**/dashboard');
    expect(page.url()).toContain('/dashboard');
  });
});
