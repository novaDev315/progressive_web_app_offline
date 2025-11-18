import { test, expect } from '@playwright/test';

test.describe('PWA Task Manager', () => {
  test('should load the application', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('PWA Task Manager');
  });

  test('should add a new task', async ({ page }) => {
    await page.goto('/');

    // Fill in the task form
    await page.fill('input[placeholder*="Task title"]', 'Test Task');
    await page.fill('textarea[placeholder*="description"]', 'This is a test task');

    // Submit the form
    await page.click('button[type="submit"]');

    // Verify the task appears in the list
    await expect(page.locator('text=Test Task')).toBeVisible();
  });

  test('should toggle task completion', async ({ page }) => {
    await page.goto('/');

    // Add a task first
    await page.fill('input[placeholder*="Task title"]', 'Task to Complete');
    await page.click('button[type="submit"]');

    // Toggle the task
    const checkbox = page.locator('button').first();
    await checkbox.click();

    // Verify task is marked as completed
    await expect(page.locator('text=Completed Tasks')).toBeVisible();
  });

  test('should show offline indicator when offline', async ({ page, context }) => {
    await page.goto('/');

    // Go offline
    await context.setOffline(true);

    // Check for offline indicator
    await expect(page.locator('text=Offline')).toBeVisible();
  });
});
