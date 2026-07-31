import { expect, Locator, Page } from '@playwright/test'

import { DescriptionUtils } from '../description'
import { DOMUtils } from '../dom'

const nationalDataPointApi = '/api/cycle-data/national-data-points/national-data-point'

const _nationalClassesGrid = (page: Page): Locator =>
  page.locator('.data-grid', { has: page.getByText('Definition', { exact: true }) })

const _nationalClassesSection = (page: Page): Locator =>
  page.locator('.odp__section', { has: _nationalClassesGrid(page) })

const _nationalClassNameInputs = (page: Page): Locator =>
  _nationalClassesGrid(page).locator('.data-cell.firstCol input.input-text')

const _existingNationalClassNameInput = (page: Page): Locator => _nationalClassNameInputs(page).first()

const _commentsBlock = (page: Page): Locator => page.locator('.data-grid.odp__section.description')

const _commentsEditor = (page: Page): Locator => _commentsBlock(page).locator('.jodit-wysiwyg')

const fillYear = async (page: Page, year: string): Promise<void> => {
  // New odp year defaults to -1 before selecting a year.
  // When selecting a year, the ODP gets created via POST request
  // Wait for that response so the editor becomes editable
  const created = DOMUtils.waitForResponse(page, nationalDataPointApi, 'POST')
  await page.locator('.odp__year-selection .select__wrapper').click()
  await page.getByRole('option', { name: year }).click()
  await created
}

// DataSourceV1
const fillDataSourceReference = async (page: Page, reference: string): Promise<void> => {
  const editor = page.locator('.editor-wysiwyg-links .jodit-wysiwyg[contenteditable="true"]').first()
  await editor.click()
  await page.keyboard.type(reference)
  await editor.blur()
}

// Comments of the active ODP tab (1a extentOfForest / 1b forestCharacteristics)
const fillComments = async (page: Page, html: string): Promise<void> => {
  const commentsBlock = _commentsBlock(page)
  await commentsBlock.getByRole('button', { name: 'Edit', exact: true }).click()

  const saved = DOMUtils.waitForResponse(page, `${nationalDataPointApi}/description`, 'PUT')
  await DescriptionUtils.pasteIntoEditorWysiwyg(page, _commentsEditor(page), html)
  await commentsBlock.getByRole('button', { name: 'Done', exact: true }).click()
  await saved
}

const getCommentsValidationError = (page: Page): Locator =>
  _commentsBlock(page).locator('.editorWYSIWYG.validation-error')

const createNewNationalClassification = async (page: Page, name: string): Promise<void> => {
  const inputs = _nationalClassNameInputs(page)
  const inputCount = await inputs.count()

  await _nationalClassesSection(page).getByRole('button', { name: 'Add', exact: true }).click()
  await expect(inputs).toHaveCount(inputCount + 1)

  const input = inputs.nth(inputCount)

  const saved = DOMUtils.waitForResponse(page, `${nationalDataPointApi}/national-classes`, 'PUT')
  await input.fill(name)
  await saved

  await expect(input).toHaveValue(name)
}

const editNationalClassification = async (page: Page, name: string): Promise<void> => {
  const input = _existingNationalClassNameInput(page)
  await input.waitFor()

  const saved = DOMUtils.waitForResponse(page, `${nationalDataPointApi}/national-classes`, 'PUT')
  await input.fill(name)
  await saved

  await expect(input).toHaveValue(name)
}

const _fillOriginalData = async (page: Page, input: Locator, value: string): Promise<void> => {
  const saved = DOMUtils.waitForResponse(page, `${nationalDataPointApi}/original-data`, 'PUT')
  await input.fill(value)
  await input.press('Tab')
  await saved
}

const _tableRow = (page: Page, className: string): Locator =>
  page.locator('tr', { has: page.locator('.fra-table__category-cell', { hasText: className }) })

const _main1bRow = (page: Page, className: string): Locator =>
  page.locator('.fra-table:not(.odp__sub-table) tr', {
    has: page.locator('.fra-table__category-cell', { hasText: className }),
  })

// 1a area
const fillNationalClassArea = async (page: Page, className: string, value: string): Promise<void> =>
  _fillOriginalData(page, _tableRow(page, className).locator('td.fra-table__cell.fra-table__divider input'), value)

// 1a forest%
const fillNationalClassForestPercent = async (page: Page, className: string, value: string): Promise<void> =>
  _fillOriginalData(
    page,
    _tableRow(page, className).locator('td.fra-table__cell:not(.fra-table__divider) input').nth(0),
    value
  )

// 1a owl%
const fillNationalClassOWLPercent = async (page: Page, className: string, value: string): Promise<void> =>
  _fillOriginalData(
    page,
    _tableRow(page, className).locator('td.fra-table__cell:not(.fra-table__divider) input').nth(1),
    value
  )

// 1b natural forest%
const fillNationalClassNaturalForestPercent = async (page: Page, className: string, value: string): Promise<void> =>
  _fillOriginalData(page, _main1bRow(page, className).locator('td.fra-table__cell input').nth(0), value)

// 1b plantation forest%
const fillNationalClassPlantationForestPercent = async (page: Page, className: string, value: string): Promise<void> =>
  _fillOriginalData(page, _main1bRow(page, className).locator('td.fra-table__cell input').nth(1), value)

// 1b other planted%
const fillNationalClassOtherPlantedForestPercent = async (
  page: Page,
  className: string,
  value: string
): Promise<void> =>
  _fillOriginalData(page, _main1bRow(page, className).locator('td.fra-table__cell input').nth(2), value)

// 1b naturally regenerating sub-table: primary forest%
const fillNationalClassPrimaryForestPercent = async (page: Page, className: string, value: string): Promise<void> =>
  _fillOriginalData(
    page,
    page
      .locator('.fra-table.odp__sub-table')
      .nth(0)
      .locator('tr', { has: page.locator('.fra-table__category-cell', { hasText: className }) })
      .locator('td.fra-table__cell input'),
    value
  )

// 1b plantation sub-table: introduced%
const fillNationalClassPlantationIntroducedPercent = async (
  page: Page,
  className: string,
  value: string
): Promise<void> =>
  _fillOriginalData(
    page,
    page
      .locator('.fra-table.odp__sub-table')
      .nth(1)
      .locator('tr', { has: page.locator('.fra-table__category-cell', { hasText: className }) })
      .locator('td.fra-table__cell input'),
    value
  )

const doneEditing = async (page: Page): Promise<void> => {
  await page.getByRole('link', { name: 'Done editing' }).first().click()
}

const switchTab = async (page: Page, tabName: string, urlRegex: RegExp): Promise<void> => {
  const tab = page.locator('.odp__tab-item', { hasText: tabName })
  await tab.click()
  await page.waitForURL(urlRegex)
  await expect(tab).toHaveClass(/active/)
}

export const NDPDomUtils = {
  createNewNationalClassification,
  doneEditing,
  editNationalClassification,
  fillComments,
  fillDataSourceReference,
  fillNationalClassArea,
  fillNationalClassForestPercent,
  fillNationalClassNaturalForestPercent,
  fillNationalClassOtherPlantedForestPercent,
  fillNationalClassOWLPercent,
  fillNationalClassPlantationForestPercent,
  fillNationalClassPlantationIntroducedPercent,
  fillNationalClassPrimaryForestPercent,
  fillYear,
  getCommentsValidationError,
  switchTab,
}
