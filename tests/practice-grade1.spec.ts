import { test, expect } from '@playwright/test';

test.describe('Practice Pad - Grade 1 E2E Workflows', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate directly to the Practice Pad page
    await page.goto('/practice');
  });

  test('should display Grade 1 practice dashboard and subject cards', async ({ page }) => {
    // Verify welcome heading
    await expect(page.locator('h1')).toContainText('Practice Pad');
    
    // Verify stats widgets are rendered
    await expect(page.locator('text=Solved Questions')).toBeVisible();
    await expect(page.locator('text=Avg. Accuracy')).toBeVisible();
    await expect(page.locator('text=Total Stars')).toBeVisible();
    
    // Verify subject modules load
    await expect(page.locator('text=Grade 1 Maths & Reasoning')).toBeVisible();
    await expect(page.locator('text=Grade 1 Abacus Master')).toBeVisible();
    await expect(page.locator('text=Grade 1 English Logic')).toBeVisible();
    await expect(page.locator('text=Grade 1 Fraction Explorer')).toBeVisible();
  });

  test('should run through an MCQ quiz, select answers, view explanations, and exit', async ({ page }) => {
    // Start the Maths & Reasoning quiz
    const mathsCard = page.locator('text=Grade 1 Maths & Reasoning');
    await mathsCard.click();

    // Verify Quiz Runner renders
    await expect(page.locator('text=Question 1 of 8')).toBeVisible();
    await expect(page.locator('text=Aarav has 3 red balloons')).toBeVisible();
    
    // Verify option cards are present
    const firstOption = page.locator('text=3 balloons');
    const thirdOption = page.locator('text=5 balloons');
    await expect(firstOption).toBeVisible();
    await expect(thirdOption).toBeVisible();

    // Verify AI Hint toggle is present
    const hintButton = page.locator('text=Ask MyMate AI a Hint');
    await expect(hintButton).toBeVisible();

    // Select the correct answer (5 balloons - index 2, which matches option card "5 balloons")
    await thirdOption.click();

    // Verify choice gets locked and explanation box reveals
    await expect(page.locator('text=Learning Explanation')).toBeVisible();
    await expect(page.locator('text=3 + 4 = 7 balloons')).toBeVisible();

    // Verify "Next Question" appears
    const nextButton = page.locator('text=Next Question');
    await expect(nextButton).toBeVisible();

    // Click next and verify it updates to Question 2
    await nextButton.click();
    await expect(page.locator('text=Question 2 of 8')).toBeVisible();
    await expect(page.locator('text=Look at the pattern')).toBeVisible();

    // Exit the quiz halfway
    const exitButton = page.locator('text=Exit Quiz');
    await exitButton.click();

    // Verify we are safely back on the dashboard
    await expect(page.locator('h1')).toContainText('Practice Pad');
  });

  test('should toggle scaffolding AI hints on clicking the assistant', async ({ page }) => {
    // Start English Logic quiz
    await page.locator('text=Grade 1 English Logic').click();

    // Click "Ask MyMate AI a Hint"
    await page.locator('text=Ask MyMate AI a Hint').click();

    // Verify conceptual hint is shown
    await expect(page.locator('text=AI Conceptual Hint')).toBeVisible();
    await expect(page.locator('text=Listen to the end sound')).toBeVisible();

    // Click second level clue link
    const detailedClueLink = page.locator('text=Reveal detailed formula helper');
    await expect(detailedClueLink).toBeVisible();
    await detailedClueLink.click();

    // Verify detailed step-by-step numbers are shown
    await expect(page.locator('text=Detailed Clue Step')).toBeVisible();
    await expect(page.locator('text=ends with "-at"')).toBeVisible();
  });
});
