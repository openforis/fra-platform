import { expect, Page } from '@playwright/test'

import { Timeouts } from 'test/e2e/config/timeouts'

import { getCellValue } from './getCellValue'

export const expectCellValue = async (
  page: Page,
  variableName: string,
  colName: string,
  value: string,
  tableName?: string
): Promise<void> => {
  // The default intervals slow down to one check a second, which can add almost a second to every cell check
  await expect(async () => {
    expect(await getCellValue(page, variableName, colName, tableName)).toBe(value)
  }).toPass({ intervals: [100, 250], timeout: Timeouts.medium })
}
