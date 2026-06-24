import { expect, Locator, Page } from '@playwright/test'

const expectValidationTooltip = async (page: Page, locator: Locator, text: string): Promise<void> => {
  await locator.hover()
  await expect(page.getByRole('tooltip').filter({ hasText: text })).toBeVisible({ timeout: 20000 })
}

export const TooltipUtils = {
  expectValidationTooltip,
}
