import { expect, Locator, Page } from '@playwright/test'

import { getReferenceCells, getTable } from './_cells'

export const addRow = async (page: Page): Promise<Locator> => {
  const editors = getReferenceCells(page).locator('.jodit-wysiwyg')
  const editorCount = await editors.count()

  const addButton = page
    .locator('.data-grid.description', { has: getTable(page) })
    .getByRole('button', { name: 'Add', exact: true })
  await addButton.click()
  await expect(editors).toHaveCount(editorCount + 1)

  return editors.nth(editorCount)
}
