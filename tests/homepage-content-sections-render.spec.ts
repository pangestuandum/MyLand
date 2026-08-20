import { test, expect } from '@playwright/test';

test.describe('homepage-content-sections-render', () => {
  test('renders all key marketing sections and content on load', async ({ page }) => {
    await page.goto('/');

    // Hero
    await expect(page.getByRole('heading', { name: 'Kejelasan untuk langkah besar berikutnya.' })).toBeVisible();
    await expect(
      page.getByText('Kami adalah partner strategi bagi pemimpin yang berani merapikan yang rumit')
    ).toBeVisible();

    // Stats row
    await expect(page.getByText('12+', { exact: true })).toBeVisible();
    await expect(page.getByText('tahun membangunnilai bersama')).toBeVisible();
    await expect(page.getByText('84', { exact: true })).toBeVisible();
    await expect(page.getByText('transformasiyang dijalankan')).toBeVisible();
    await expect(page.getByText('17', { exact: true })).toBeVisible();
    await expect(page.getByText('sektoryang kami pahami')).toBeVisible();

    // Expertise cards (accessible name has a space where the source has a <br/>)
    await expect(page.getByRole('heading', { name: 'Strategi & Pertumbuhan' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Organisasi & Talenta' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Transformasi & Eksekusi' })).toBeVisible();

    // Testimonial
    await expect(
      page.getByText('MyLand tidak datang membawa jawaban siap pakai.')
    ).toBeVisible();
    await expect(page.getByText('NARA PRAMESWARI, CEO ARUNIKA GROUP')).toBeVisible();

    // Insight articles
    await expect(page.getByText('PERSPECTIVE / 08.2024')).toBeVisible();
    await expect(page.getByText('FIELD NOTE / 07.2024')).toBeVisible();
    await expect(page.getByText('POINT OF VIEW / 06.2024')).toBeVisible();

    // Footer
    await expect(page.getByText('© 2024 MYLAND')).toBeVisible();
    const backToTop = page.getByRole('link', { name: 'KEMBALI KE ATAS ↑' });
    await expect(backToTop).toBeVisible();
    await expect(backToTop).toHaveAttribute('href', '#top');
  });
});
