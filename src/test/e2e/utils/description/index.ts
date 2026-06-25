import { Locator, Page } from '@playwright/test'

import { Promises } from 'utils/promises'

import { DOMUtils } from '../dom'

const getDescriptionBlock = (page: Page, title: string): Locator =>
  page
    .locator('.description-title', { hasText: title })
    .first()
    .locator('xpath=ancestor::*[contains(@class, "data-grid") and contains(@class, "description")][1]')

const getDescriptionEditor = (page: Page, title: string): Locator =>
  getDescriptionBlock(page, title).locator('.jodit-wysiwyg')

const getDescriptionValidationError = (page: Page, title: string): Locator =>
  getDescriptionBlock(page, title).locator('.validation-error')

const getDescriptionToggleEditButton = (page: Page, title: string, name: 'Done' | 'Edit'): Locator =>
  getDescriptionBlock(page, title).locator('button:visible', { hasText: name })

const fillEditorWysiwyg = async (page: Page, editor: Locator, lines: Array<string>): Promise<void> => {
  await editor.click()
  await editor.selectText()
  await page.keyboard.press('Backspace')

  await Promises.each(lines, async (line, index) => {
    if (index > 0) await page.keyboard.press('Enter')
    await page.keyboard.type(line)
  })

  await page.waitForTimeout(300)
  await editor.blur()
}

const pasteIntoEditorWysiwyg = async (page: Page, editor: Locator, html: string): Promise<void> => {
  await editor.click()
  await editor.selectText()
  await page.keyboard.press('Backspace')

  await editor.evaluate((el, pastedHtml) => {
    const dataTransfer = new DataTransfer()
    dataTransfer.setData('text/html', pastedHtml)
    el.dispatchEvent(new ClipboardEvent('paste', { bubbles: true, cancelable: true, clipboardData: dataTransfer }))
  }, html)

  // jodit popup
  const keepHtmlButton = page.locator('.jodit-dialog button[data-ref="keep"]')
  await keepHtmlButton.waitFor({ state: 'visible', timeout: 2000 }).catch((): void => undefined)
  if (await keepHtmlButton.isVisible()) await keepHtmlButton.click()

  await page.waitForTimeout(300)
  await editor.blur()
}

const save = async (page: Page, action: () => Promise<void>): Promise<void> => {
  const descriptionSaved = DOMUtils.waitForResponse(page, '/api/cycle-data/descriptions', 'PUT')
  await action()
  await descriptionSaved
}

export const DescriptionUtils = {
  fillEditorWysiwyg,
  getDescriptionBlock,
  getDescriptionEditor,
  getDescriptionToggleEditButton,
  getDescriptionValidationError,
  pasteIntoEditorWysiwyg,
  save,
}
