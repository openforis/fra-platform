import { expect, Locator, Page } from '@playwright/test'
import { enTranslation } from 'i18n/resources/en'

import { Timeouts } from 'test/e2e/config/timeouts'

import { TooltipUtils } from '../tooltip'

// Type, variables and year only have the empty value error
export const expectCellError = async (page: Page, cell: Locator): Promise<void> => {
  await expect(cell).toHaveClass(/validation-error/, { timeout: Timeouts.medium })
  await TooltipUtils.expectValidationTooltip(page, cell, enTranslation.generalValidation.notEmpty)
}
