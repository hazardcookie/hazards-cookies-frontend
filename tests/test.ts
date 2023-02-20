import { expect, test } from '@playwright/test';

test('index page has expected cookie_titles', async ({ page }) => {
  await page.goto('/');
  await expect(page.getAttribute('span', 'class')).toBe('cookie_titles');
});
