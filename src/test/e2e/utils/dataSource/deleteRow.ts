import { Locator, Page } from '@playwright/test'

import { ApiEndPoint } from 'meta/api/endpoint'

import { DOMUtils } from '../dom'
import { getReferenceCellByText, getReferenceCells, getTable } from './_cells'

const _findRowIndex = async (page: Page, text: string): Promise<number> => {
  await getReferenceCellByText(page, text).waitFor()
  const texts = await getReferenceCells(page).allInnerTexts()
  return texts.findIndex((cellText) => cellText.includes(text))
}

// the delete button has no accessible name, only an icon - identify it by icon class
const _getDeleteButtons = (page: Page): Locator => getTable(page).locator('button:has(svg.icon_trash-simple)')

// delete is only available when data source editing is unlocked
export const deleteRow = async (page: Page, text: string): Promise<void> => {
  const rowIndex = await _findRowIndex(page, text)

  const deleted = DOMUtils.waitForResponse(page, ApiEndPoint.CycleData.Descriptions.DataSources.one(), 'DELETE')
  page.once('dialog', (dialog) => dialog.accept())
  await _getDeleteButtons(page).nth(rowIndex).click()
  await deleted
}
