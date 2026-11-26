import { Page } from '@playwright/test'

import { DOMUtils } from 'test/e2e/utils/dom'

import { tableContainer } from './tableContainer'

export const clearTable = async (page: Page, tableName: string): Promise<void> => {
  page.once('dialog', (dialog): Promise<void> => dialog.accept())
  const cleared = DOMUtils.waitForResponse(page, '/api/cycle-data/table/clear', 'POST')
  await tableContainer(page, tableName).getByRole('button', { name: 'Clear table' }).click()
  await cleared
}
