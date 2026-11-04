import { expect, Page } from '@playwright/test'

import { Timeouts } from 'test/e2e/config/timeouts'

import { cellLocator } from './_cellLocator'

export const expectCellReadOnly = async (page: Page, variableName: string, colName: string): Promise<void> => {
  await expect(cellLocator(page, variableName, colName).locator('.input-text.disabled')).toBeVisible({
    timeout: Timeouts.medium,
  })
}
