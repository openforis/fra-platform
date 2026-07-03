import { expect, Locator, Page } from '@playwright/test'

const expectValidationTooltip = async (page: Page, locator: Locator, text: string): Promise<void> => {
  // When one or more tooltips are visible at the same time, choose the one that's not closing
  // __closing = we are not hovering it anymore
  const tooltip = page.locator('[role="tooltip"]:not(.react-tooltip__closing)').filter({ hasText: text })

  // Retry hover before failing - tooltip is flaky
  await expect(async () => {
    await locator.hover()
    await expect(tooltip).toBeVisible({ timeout: 2000 })
  }).toPass({ timeout: 20000 })
}

export const TooltipUtils = {
  expectValidationTooltip,
}
