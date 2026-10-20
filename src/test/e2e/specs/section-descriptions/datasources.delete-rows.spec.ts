import { Page } from '@playwright/test'
import { enTranslation } from 'i18n/resources/en'

import { DescriptionsApi } from 'test/e2e/api/descriptions'
import { x12BiomassStock, x12BiomassStockPath } from 'test/e2e/data/sectionDescriptions'
import { expect, test } from 'test/e2e/fixtures/auth'
import { DataSourceUtils } from 'test/e2e/utils/dataSource'
import { DescriptionUtils } from 'test/e2e/utils/description'
import { DOMUtils } from 'test/e2e/utils/dom'
import { LinkBuilder } from 'test/e2e/utils/links'
import { NavigationUtils } from 'test/e2e/utils/navigation'

const dataSourcesTitle = enTranslation.description.dataSourcesPlus
const typeOption = enTranslation.dataSource.nationalForestInventory
const variableOption = enTranslation.biomassStock.aboveGround
const yearOption = '2020'

const randomString = Date.now().toString()

const addDataSource = async (page: Page, html: string): Promise<void> => {
  await DescriptionUtils.save(page, async () => {
    const referenceEditor = await DataSourceUtils.addRow(page)
    await DescriptionUtils.pasteIntoEditorWysiwygLinksOnly(page, referenceEditor, html)
  })
}

test.describe.serial('Section descriptions: data sources - delete rows', () => {
  const keptReference = LinkBuilder.buildValidLinkHtml(`data-source-kept-${randomString}`)
  const deletedReference = LinkBuilder.buildValidLinkHtml(`data-source-deleted-${randomString}`)
  const firstReference = LinkBuilder.buildValidLinkHtml(`data-source-first-${randomString}`)
  const secondReference = LinkBuilder.buildValidLinkHtml(`data-source-second-${randomString}`)

  test.afterAll(async ({ browser }) => {
    await DescriptionsApi.clear(browser, x12BiomassStock)
  })

  test('NC adds a filled and an empty data source and sees only the empty one marked', async ({
    authenticatedPage,
  }) => {
    const page = authenticatedPage

    const summaryLoaded = NavigationUtils.waitForValidationSummary(page)
    await page.goto(x12BiomassStockPath)
    await summaryLoaded
    await DOMUtils.ensureEditingUnlocked(page)
    await NavigationUtils.subSectionHasError(page, x12BiomassStockPath, false)

    await DescriptionUtils.getDescriptionToggleEditButton(page, dataSourcesTitle, 'Edit').click()
    await addDataSource(page, keptReference.html)
    await DescriptionUtils.save(page, () => DataSourceUtils.selectOption(page, keptReference.text, 'type', typeOption))
    await DescriptionUtils.save(page, () =>
      DataSourceUtils.selectOption(page, keptReference.text, 'variables', variableOption)
    )
    await DescriptionUtils.save(page, () => DataSourceUtils.selectOption(page, keptReference.text, 'year', yearOption))

    await addDataSource(page, deletedReference.html)
    const deletedTypeCell = await DataSourceUtils.getTypeCell(page, deletedReference.text)
    const deletedVariablesCell = await DataSourceUtils.getVariablesCell(page, deletedReference.text)
    const deletedYearCell = await DataSourceUtils.getYearCell(page, deletedReference.text)
    await DataSourceUtils.expectCellError(page, deletedTypeCell)
    await DataSourceUtils.expectCellError(page, deletedVariablesCell)
    await DataSourceUtils.expectCellError(page, deletedYearCell)
    await NavigationUtils.subSectionHasError(page, x12BiomassStockPath, true)

    const keptTypeCell = await DataSourceUtils.getTypeCell(page, keptReference.text)
    const keptVariablesCell = await DataSourceUtils.getVariablesCell(page, keptReference.text)
    const keptYearCell = await DataSourceUtils.getYearCell(page, keptReference.text)

    await expect(keptTypeCell).not.toHaveClass(/validation-error/)
    await expect(keptVariablesCell).not.toHaveClass(/validation-error/)
    await expect(keptYearCell).not.toHaveClass(/validation-error/)
  })

  test('NC deletes the empty data source and sees its errors and the warning go away', async ({
    authenticatedPage,
  }) => {
    const page = authenticatedPage

    const summaryLoaded = NavigationUtils.waitForValidationSummary(page)
    await page.goto(x12BiomassStockPath)
    await summaryLoaded
    await DOMUtils.ensureEditingUnlocked(page)
    await NavigationUtils.subSectionHasError(page, x12BiomassStockPath, true)

    const keptUuid = await DataSourceUtils.getRowUuid(page, keptReference.text)
    const deletedUuid = await DataSourceUtils.getRowUuid(page, deletedReference.text)

    await DescriptionUtils.getDescriptionToggleEditButton(page, dataSourcesTitle, 'Edit').click()
    await DataSourceUtils.deleteRow(page, deletedReference.text)
    await expect(DataSourceUtils.getTable(page)).not.toContainText(deletedReference.text)
    await NavigationUtils.subSectionHasError(page, x12BiomassStockPath, false)

    const storedValidations = DescriptionsApi.waitForValidations(page)
    await page.reload()
    const dataSourceValidations = (await storedValidations)[x12BiomassStock.sectionName]?.dataSources
    expect(dataSourceValidations?.[deletedUuid]).toBeUndefined()
    expect(dataSourceValidations?.[keptUuid]?.type?.valid).toBe(true)
  })

  test('NC deletes one of two empty data sources and sees the other one keep its errors', async ({
    authenticatedPage,
  }) => {
    const page = authenticatedPage

    const summaryLoaded = NavigationUtils.waitForValidationSummary(page)
    await page.goto(x12BiomassStockPath)
    await summaryLoaded
    await DOMUtils.ensureEditingUnlocked(page)
    await NavigationUtils.subSectionHasError(page, x12BiomassStockPath, false)

    await DescriptionUtils.getDescriptionToggleEditButton(page, dataSourcesTitle, 'Edit').click()
    await addDataSource(page, firstReference.html)
    await addDataSource(page, secondReference.html)

    const firstTypeCell = await DataSourceUtils.getTypeCell(page, firstReference.text)
    const secondTypeCell = await DataSourceUtils.getTypeCell(page, secondReference.text)
    const secondVariablesCell = await DataSourceUtils.getVariablesCell(page, secondReference.text)
    const secondYearCell = await DataSourceUtils.getYearCell(page, secondReference.text)
    await DataSourceUtils.expectCellError(page, firstTypeCell)
    await DataSourceUtils.expectCellError(page, secondTypeCell)
    await NavigationUtils.subSectionHasError(page, x12BiomassStockPath, true)

    const firstUuid = await DataSourceUtils.getRowUuid(page, firstReference.text)
    const secondUuid = await DataSourceUtils.getRowUuid(page, secondReference.text)

    await DataSourceUtils.deleteRow(page, firstReference.text)
    await expect(DataSourceUtils.getTable(page)).not.toContainText(firstReference.text)
    await DataSourceUtils.expectCellError(page, secondTypeCell)
    await DataSourceUtils.expectCellError(page, secondVariablesCell)
    await DataSourceUtils.expectCellError(page, secondYearCell)
    await NavigationUtils.subSectionHasError(page, x12BiomassStockPath, true)

    const storedValidations = DescriptionsApi.waitForValidations(page)
    await page.reload()
    const dataSourceValidations = (await storedValidations)[x12BiomassStock.sectionName]?.dataSources
    expect(dataSourceValidations?.[firstUuid]).toBeUndefined()
    expect(dataSourceValidations?.[secondUuid]?.type?.valid).toBe(false)
    expect(dataSourceValidations?.[secondUuid]?.variables?.valid).toBe(false)
    expect(dataSourceValidations?.[secondUuid]?.year?.valid).toBe(false)
  })
})
