import { expect, Locator, Page } from '@playwright/test'
import { enTranslation } from 'i18n/resources/en'

import { TooltipUtils } from '../tooltip'

// Timeout time for the socket event that updates the cell errors
const _cellErrorTimeout = 10_000

// Type, variables and year only have the empty value error
export const expectCellError = async (page: Page, cell: Locator): Promise<void> => {
  await expect(cell).toHaveClass(/validation-error/, { timeout: _cellErrorTimeout })
  await TooltipUtils.expectValidationTooltip(page, cell, enTranslation.generalValidation.notEmpty)
}
