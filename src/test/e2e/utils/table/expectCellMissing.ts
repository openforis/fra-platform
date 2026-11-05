import { expect, Page } from '@playwright/test'

import { Timeouts } from 'test/e2e/config/timeouts'

import { cellLocator } from './_cellLocator'

// A NDP column only exists while there is NDP for that year
export const expectCellMissing = async (page: Page, variableName: string, colName: string): Promise<void> => {
  await expect(cellLocator(page, variableName, colName)).toHaveCount(0, { timeout: Timeouts.medium })
}
