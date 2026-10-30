import { Page } from '@playwright/test'

import { cellLocator } from './_cellLocator'

const _toTableHtml = (rows: Array<Array<string>>): string => {
  const rowsHtml = rows.map<string>((cells) => `<tr>${cells.map<string>((cell) => `<td>${cell}</td>`).join('')}</tr>`)
  return `<table>${rowsHtml.join('')}</table>`
}

// Pastes the rows into the table starting at the given cell, going right and down
export const pasteCells = async (
  page: Page,
  variableName: string,
  colName: string,
  rows: Array<Array<string>>
): Promise<void> => {
  const cellInput = cellLocator(page, variableName, colName).locator('input')
  await cellInput.click()

  await cellInput.evaluate((el, html) => {
    const dataTransfer = new DataTransfer()
    dataTransfer.setData('text/html', html)
    el.dispatchEvent(new ClipboardEvent('paste', { bubbles: true, cancelable: true, clipboardData: dataTransfer }))
  }, _toTableHtml(rows))
}
