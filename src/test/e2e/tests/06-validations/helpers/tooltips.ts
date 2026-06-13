import { expect, type Locator, type Page } from '@playwright/test'

type ExpectValidationTooltipProps = {
  locator: Locator
  text: string
}

export const expectValidationTooltip = async (page: Page, props: ExpectValidationTooltipProps): Promise<void> => {
  const { locator, text } = props
  await locator.hover()
  await expect(page.getByRole('tooltip').filter({ hasText: text })).toBeVisible({ timeout: 20000 })
}
