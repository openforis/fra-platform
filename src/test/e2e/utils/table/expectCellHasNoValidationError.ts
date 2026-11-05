import { expect, Page } from '@playwright/test'

import { Timeouts } from 'test/e2e/config/timeouts'

import { cellLocator } from './_cellLocator'

export const expectCellHasNoValidationError = async (
  page: Page,
  variableName: string,
  colName: string
): Promise<void> => {
  await expect(cellLocator(page, variableName, colName)).not.toHaveClass(/validation-error/, {
    timeout: Timeouts.medium,
  })
}
