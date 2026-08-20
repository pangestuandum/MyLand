import { test, expect } from '@playwright/test';

test.describe('contact-modal-submit-success', () => {
  test('submits the conversation form with all required fields filled', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Atur percakapan ↗' }).click();

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('heading', { name: 'Mari mulai dari yang penting.' })).toBeVisible();

    const nameField = dialog.getByRole('textbox', { name: 'Nama lengkap' });
    const emailField = dialog.getByRole('textbox', { name: 'Email kerja' });
    const orgField = dialog.getByRole('textbox', { name: 'Organisasi' });
    const messageField = dialog.getByRole('textbox', { name: 'Yang ingin Anda bicarakan' });

    await expect(nameField).toBeVisible();
    await expect(emailField).toBeVisible();
    await expect(orgField).toBeVisible();
    await expect(messageField).toBeVisible();

    await nameField.fill('Andi Test');
    await emailField.fill('andumpangestu12345@gmail.com');
    await orgField.fill('QA Corp');
    await messageField.fill('Ingin membahas transformasi organisasi kami.');

    await dialog.getByRole('button', { name: 'Siapkan email ↗' }).click();

    await expect(dialog).toBeVisible();
    await expect(page.locator('.form-status')).toHaveText('Membuka aplikasi email Anda…');

    await expect(nameField).toHaveValue('Andi Test');
    await expect(emailField).toHaveValue('andumpangestu12345@gmail.com');
    await expect(orgField).toHaveValue('QA Corp');
    await expect(messageField).toHaveValue('Ingin membahas transformasi organisasi kami.');
  });
});
