import { expect, Page } from '@playwright/test'

import { Timeouts } from 'test/e2e/config/timeouts'

import { tableValidationErrors } from './tableValidationErrors'

export const expectTableHasError = async (page: Page, tableName: string): Promise<void> => {
  await expect(tableValidationErrors(page, tableName)).toBeVisible({ timeout: Timeouts.medium })
}
