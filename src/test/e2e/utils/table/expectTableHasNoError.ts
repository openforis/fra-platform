import { expect, Page } from '@playwright/test'

import { tableValidationErrors } from './tableValidationErrors'

export const expectTableHasNoError = async (page: Page, tableName: string): Promise<void> => {
  await expect(tableValidationErrors(page, tableName)).toHaveCount(0)
}
