import { test, expect } from '@playwright/test';

test.describe('contact-modal-open-close', () => {
  test('opens from multiple entry points and closes via the × button', async ({ page }) => {
    await page.goto('/');

    const dialog = page.getByRole('dialog');
    const heading = dialog.getByRole('heading', { name: 'Mari mulai dari yang penting.' });

    // Open from the top navigation.
    await page.getByRole('link', { name: 'Mari bicara ↗' }).click();
    await expect(dialog).toBeVisible();
    await expect(heading).toBeVisible();

    // Field values persist across close/reopen within the same session.
    const nameField = dialog.getByRole('textbox', { name: 'Nama lengkap' });
    await nameField.fill('Persisted Name');

    // Close via the × button.
    await dialog.getByRole('button', { name: 'Tutup formulir' }).click();
    await expect(dialog).toBeHidden();

    // Reopen from the hero CTA.
    await page.getByRole('link', { name: 'Mulai percakapan →' }).click();
    await expect(dialog).toBeVisible();
    await expect(heading).toBeVisible();
    await expect(nameField).toHaveValue('Persisted Name');

    await dialog.getByRole('button', { name: 'Tutup formulir' }).click();
    await expect(dialog).toBeHidden();

    // Reopen from the closing CTA section.
    await page.getByRole('button', { name: 'Atur percakapan ↗' }).click();
    await expect(dialog).toBeVisible();
    await expect(heading).toBeVisible();
  });
});
