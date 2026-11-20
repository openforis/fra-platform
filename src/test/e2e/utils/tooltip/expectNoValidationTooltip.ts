import { expect, Page } from '@playwright/test'

export const expectNoValidationTooltip = async (page: Page, text: string): Promise<void> => {
  const tooltip = page.locator('[role="tooltip"]:not(.react-tooltip__closing)').filter({ hasText: text })

  await expect(tooltip).toHaveCount(0)
}
