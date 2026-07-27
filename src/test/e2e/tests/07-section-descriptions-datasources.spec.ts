import { Locator, Page } from '@playwright/test'

import { expect, test } from '../fixtures/auth'
import { DataSourceUtils } from '../utils/dataSource'
import { DescriptionUtils } from '../utils/description'
import { DOMUtils } from '../utils/dom'
import { LinkFixtures } from '../utils/links'
import { TooltipUtils } from '../utils/tooltip'
import { dataSourcesSectionPath } from './07-section-descriptions.fixture'

const dataSourcesTitle = 'Data sources + type of data source eg NFI, etc'

const randomString = Date.now().toString()

const dataSourcesToggleEditButton = (page: Page, name: 'Done' | 'Edit'): Locator =>
  DescriptionUtils.getDescriptionToggleEditButton(page, dataSourcesTitle, name)

test.describe.serial('Section descriptions: data sources', () => {
  const validReference = LinkFixtures.buildValidLinkHtml(`data-source-${randomString}`)
  const updatedReference = LinkFixtures.buildValidLinkHtml(`data-source-updated-${randomString}`)

  test('NC sees no existing data source with the fixture reference', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    await page.goto(dataSourcesSectionPath)

    await expect(page.getByText(dataSourcesTitle)).toBeVisible()
    await DOMUtils.elementNotExists(DataSourceUtils.getDataSourceTable(page).filter({ hasText: validReference.text }))
  })

  test('NC creates a new data source with a valid reference', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    await page.goto(dataSourcesSectionPath)
    await DOMUtils.ensureEditingUnlocked(page)

    await DescriptionUtils.save(page, async () => {
      await dataSourcesToggleEditButton(page, 'Edit').click()
      const referenceEditor = await DataSourceUtils.addDataSource(page)
      await DescriptionUtils.pasteIntoEditorWysiwygLinksOnly(page, referenceEditor, validReference.html)
      await dataSourcesToggleEditButton(page, 'Done').click()
    })

    await expect(DataSourceUtils.getDataSourceReferenceValidationError(page, validReference.text)).not.toBeVisible()
  })

  test('NC edits the data source reference', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    await page.goto(dataSourcesSectionPath)
    await DOMUtils.ensureEditingUnlocked(page)

    await DescriptionUtils.save(page, async () => {
      await dataSourcesToggleEditButton(page, 'Edit').click()
      const referenceEditor = DataSourceUtils.getDataSourceReferenceEditor(page, validReference.text)
      await DescriptionUtils.pasteIntoEditorWysiwygLinksOnly(page, referenceEditor, updatedReference.html)
      await dataSourcesToggleEditButton(page, 'Done').click()
    })

    const table = DataSourceUtils.getDataSourceTable(page)
    await expect(table).toContainText(updatedReference.text, { timeout: 10000 })
    await expect(table).not.toContainText(validReference.text, { timeout: 10000 })
  })

  test('NC removes the data source', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    await page.goto(dataSourcesSectionPath)
    await DOMUtils.ensureEditingUnlocked(page)

    await dataSourcesToggleEditButton(page, 'Edit').click()
    await DataSourceUtils.deleteDataSourceRow(page, updatedReference.text)

    await expect(DataSourceUtils.getDataSourceTable(page)).not.toContainText(updatedReference.text, {
      timeout: 10000,
    })
  })
})

test.describe.serial('Section descriptions: data sources - invalid reference', () => {
  const invalidLinks = LinkFixtures.buildInvalidLinksHtml(`data-source-${randomString}`)
  const fixedReference = LinkFixtures.buildValidLinkHtml(`data-source-fixed-${randomString}`)

  test('NC creates a data source with an empty link and a broken link', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    await page.goto(dataSourcesSectionPath)
    await DOMUtils.ensureEditingUnlocked(page)

    await DescriptionUtils.save(page, async () => {
      await dataSourcesToggleEditButton(page, 'Edit').click()
      const referenceEditor = await DataSourceUtils.addDataSource(page)
      await DescriptionUtils.pasteIntoEditorWysiwygLinksOnly(page, referenceEditor, invalidLinks.html)
      await dataSourcesToggleEditButton(page, 'Done').click()
    })

    const validationError = DataSourceUtils.getDataSourceReferenceValidationError(page, invalidLinks.emptyLinkText)
    await expect(validationError).toBeVisible({ timeout: 20000 })
    await TooltipUtils.expectValidationTooltip(
      page,
      validationError,
      `Invalid link: "${invalidLinks.emptyLinkText}" (Empty)`
    )
    await TooltipUtils.expectValidationTooltip(
      page,
      validationError,
      `Invalid link: "${invalidLinks.brokenLinkDisplayUrl}" (DNS error)`
    )

    // Check that empty cells are showing validation error
    const emptyValueMessage = 'Value cannot be empty'
    const typeCell = await DataSourceUtils.getDataSourceTypeCell(page, invalidLinks.emptyLinkText)
    const variablesCell = await DataSourceUtils.getDataSourceVariablesCell(page, invalidLinks.emptyLinkText)
    const yearCell = await DataSourceUtils.getDataSourceYearCell(page, invalidLinks.emptyLinkText)

    await expect(typeCell).toHaveClass(/validation-error/)
    await TooltipUtils.expectValidationTooltip(page, typeCell, emptyValueMessage)

    await expect(variablesCell).toHaveClass(/validation-error/)
    await TooltipUtils.expectValidationTooltip(page, variablesCell, emptyValueMessage)

    await expect(yearCell).toHaveClass(/validation-error/)
    await TooltipUtils.expectValidationTooltip(page, yearCell, emptyValueMessage)

    // Comment cell is the only cell without errors (optional)
    const commentsCell = await DataSourceUtils.getDataSourceCommentsCell(page, invalidLinks.emptyLinkText)
    await expect(commentsCell).not.toHaveClass(/validation-error/)
  })

  test('NC fixes the invalid reference', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    await page.goto(dataSourcesSectionPath)
    await DOMUtils.ensureEditingUnlocked(page)

    await DescriptionUtils.save(page, async () => {
      await dataSourcesToggleEditButton(page, 'Edit').click()
      const referenceEditor = DataSourceUtils.getDataSourceReferenceEditor(page, invalidLinks.emptyLinkText)
      await DescriptionUtils.pasteIntoEditorWysiwygLinksOnly(page, referenceEditor, fixedReference.html)
      await dataSourcesToggleEditButton(page, 'Done').click()
    })

    await expect(DataSourceUtils.getDataSourceReferenceValidationError(page, fixedReference.text)).not.toBeVisible({
      timeout: 20000,
    })
  })

  test('NC removes the data source', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    await page.goto(dataSourcesSectionPath)
    await DOMUtils.ensureEditingUnlocked(page)

    await dataSourcesToggleEditButton(page, 'Edit').click()
    await DataSourceUtils.deleteDataSourceRow(page, fixedReference.text)

    await expect(DataSourceUtils.getDataSourceTable(page)).not.toContainText(fixedReference.text, {
      timeout: 10000,
    })
  })
})
