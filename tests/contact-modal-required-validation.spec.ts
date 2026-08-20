import { test, expect } from '@playwright/test';

test.describe('contact-modal-required-validation', () => {
  test('blocks submission when required fields are empty', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: 'Mari bicara ↗' }).click();

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();

    const nameField = dialog.getByRole('textbox', { name: 'Nama lengkap' });
    const emailField = dialog.getByRole('textbox', { name: 'Email kerja' });
    const messageField = dialog.getByRole('textbox', { name: 'Yang ingin Anda bicarakan' });

    // Organisasi is optional and left empty by default.
    await nameField.fill('');
    await emailField.fill('');
    await messageField.fill('');

    await dialog.getByRole('button', { name: 'Siapkan email ↗' }).click();

    // Native required-field validation blocks the submit and refocuses the first empty field.
    await expect(nameField).toBeFocused();
    await expect(page.locator('.form-status')).toHaveText('');
    await expect(dialog).toBeVisible();
  });
});
