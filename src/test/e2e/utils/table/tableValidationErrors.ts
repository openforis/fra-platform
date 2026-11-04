import { Locator, Page } from '@playwright/test'

import { tableContainer } from './tableContainer'

export const tableValidationErrors = (page: Page, tableName: string): Locator =>
  tableContainer(page, tableName).locator('.data-validations')
