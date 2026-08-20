import { test, expect } from '@playwright/test';

test.describe('in-page-nav-anchor-scroll', () => {
  test('top navigation links scroll to the corresponding page section', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: 'Keahlian' }).click();
    await expect(page).toHaveURL(/#expertise$/);
    await expect(
      page.getByRole('heading', { name: 'Kemajuan yang terasa jelas, bukan sekadar sibuk.' })
    ).toBeInViewport();

    await page.goto('/');
    await page.getByRole('link', { name: 'Pendekatan' }).click();
    await expect(page).toHaveURL(/#approach$/);
    await expect(page.getByRole('heading', { name: 'Berpikir dalam. Bergerak dekat.' })).toBeInViewport();

    await page.goto('/');
    // Exact match avoids matching the "Lihat semua insights →" link, which also
    // contains the substring "insights".
    await page.getByRole('link', { name: 'Insights', exact: true }).click();
    await expect(page).toHaveURL(/#insights$/);
    await expect(page.getByText('DARI MEJA KAMI')).toBeInViewport();
  });
});
