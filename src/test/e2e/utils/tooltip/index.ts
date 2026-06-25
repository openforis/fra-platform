import { expect, Locator, Page } from '@playwright/test'

const expectValidationTooltip = async (page: Page, locator: Locator, text: string): Promise<void> => {
  await locator.hover()

  // When one or more tooltips are visible at the same time, choose the one that's not closing
  // __closing = we are not hovering it anymore
  const tooltip = page.locator('[role="tooltip"]:not(.react-tooltip__closing)').filter({ hasText: text })
  await expect(tooltip).toBeVisible({ timeout: 20000 })
}

export const TooltipUtils = {
  expectValidationTooltip,
}
