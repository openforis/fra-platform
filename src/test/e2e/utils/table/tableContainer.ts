import { Locator, Page } from '@playwright/test'

export const tableContainer = (page: Page, tableName: string): Locator =>
  page.locator(`[id$="tableName_${tableName}"]`).locator('xpath=..')
