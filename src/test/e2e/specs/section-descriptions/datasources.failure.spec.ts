import { Locator, Page } from '@playwright/test'

import { DescriptionsApi } from 'test/e2e/api/descriptions'
import { x13GrowingStock, x13GrowingStockPath } from 'test/e2e/data/sectionDescriptions'
import { expect, test } from 'test/e2e/fixtures/auth'
import { DataSourceUtils } from 'test/e2e/utils/dataSource'
import { DescriptionUtils } from 'test/e2e/utils/description'
import { DOMUtils } from 'test/e2e/utils/dom'
import { LinkBuilder } from 'test/e2e/utils/links'
import { NavigationUtils } from 'test/e2e/utils/navigation'
import { TooltipUtils } from 'test/e2e/utils/tooltip'

const dataSourcesTitle = 'Data sources + type of data source eg NFI, etc'

const randomString = Date.now().toString()

const dataSourcesToggleEditButton = (page: Page, name: 'Done' | 'Edit'): Locator =>
  DescriptionUtils.getDescriptionToggleEditButton(page, dataSourcesTitle, name)

test.describe.serial('Section descriptions: data sources - failure', () => {
  const invalidLinks = LinkBuilder.buildInvalidLinksHtml(`data-source-${randomString}`)
  const fixedReference = LinkBuilder.buildValidLinkHtml(`data-source-fixed-${randomString}`)

  test.afterAll(async ({ browser }) => {
    await DescriptionsApi.clear(browser, x13GrowingStock)
  })

  test('NC creates a data source with an empty link and a broken link', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    const summaryLoaded = NavigationUtils.waitForValidationSummary(page)
    await page.goto(x13GrowingStockPath)
    await summaryLoaded
    await DOMUtils.ensureEditingUnlocked(page)
    await NavigationUtils.subSectionHasError(page, x13GrowingStockPath, false)

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

    await NavigationUtils.subSectionHasError(page, x13GrowingStockPath, true)
  })

  test('NC fixes the invalid reference', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    await page.goto(x13GrowingStockPath)
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

    // Type, variables and year are still empty, so the section keeps the error
    await NavigationUtils.subSectionHasError(page, x13GrowingStockPath, true)
  })

  test('NC removes the data source', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    await page.goto(x13GrowingStockPath)
    await DOMUtils.ensureEditingUnlocked(page)
    await NavigationUtils.subSectionHasError(page, x13GrowingStockPath, true)

    await dataSourcesToggleEditButton(page, 'Edit').click()
    await DataSourceUtils.deleteDataSourceRow(page, fixedReference.text)

    await expect(DataSourceUtils.getDataSourceTable(page)).not.toContainText(fixedReference.text, {
      timeout: 10000,
    })
    await NavigationUtils.subSectionHasError(page, x13GrowingStockPath, false)
  })
})
