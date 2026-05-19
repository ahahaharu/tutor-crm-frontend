import { test, expect } from '@playwright/test';

test.describe('Login Form (E2E)', () => {
  test('should show Zod validation errors when submitting invalid data', async ({
    page,
  }) => {
    await page.goto('/login');

    await page.fill('input[name="email"]', 'bad-email');
    await page.fill('input[name="password"]', '123');
    await page.click('button[type="submit"]');

    await expect(page.getByTestId('field-error')).toHaveCount(2);
  });

  test('should successfully toggle password visibility when clicking the eye icon', async ({
    page,
  }) => {
    await page.goto('/login');
    const passwordInput = page.locator('input[name="password"]');

    await expect(passwordInput).toHaveAttribute('type', 'password');

    await page.getByTestId('toggle-password').click();

    await expect(passwordInput).toHaveAttribute('type', 'text');
  });

  test('should receive an error from the real backend when using invalid credentials', async ({
    page,
  }) => {
    await page.goto('/login');

    await page.fill('input[name="email"]', 'nobody@test.com');
    await page.fill('input[name="password"]', 'WrongPassword123!');
    await page.click('button[type="submit"]');

    const passwordGroup = page.locator('[data-slot="field"]', {
      has: page.locator('input[name="password"]'),
    });

    await expect(passwordGroup.getByTestId('field-error')).toBeVisible();

    const emailGroup = page.locator('[data-slot="field"]', {
      has: page.locator('input[name="email"]'),
    });
    await expect(emailGroup).toHaveAttribute('data-invalid', 'true');
  });

  test('HAPPY PATH: should log in the user and redirect to the Dashboard', async ({
    request,
    page,
  }) => {
    const API_URL = process.env.API_URL || 'http://127.0.0.1:3000';

    const testEmail = `test-${Date.now()}@example.com`;
    await request.post(`${API_URL}/auth/register`, {
      data: {
        email: testEmail,
        password: 'ValidPassword123!',
        name: 'E2E User',
      },
    });

    await page.goto('/login');

    await page.fill('input[name="email"]', testEmail);
    await page.fill('input[name="password"]', 'ValidPassword123!');
    await page.click('button[type="submit"]');

    await page.waitForURL('**/dashboard');
    expect(page.url()).toContain('/dashboard');
  });
});
