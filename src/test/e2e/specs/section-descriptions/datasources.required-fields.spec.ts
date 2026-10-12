import { enTranslation } from 'i18n/resources/en'

import { DescriptionsApi } from 'test/e2e/api/descriptions'
import { x13BiomassStock, x13BiomassStockPath } from 'test/e2e/data/sectionDescriptions'
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

// Timeout time for the socket event that updates the cell errors
const cellTimeout = 10_000

test.describe.serial('Section descriptions: data sources - required fields', () => {
  const reference = LinkBuilder.buildValidLinkHtml(`data-source-required-${randomString}`)

  test.afterAll(async ({ browser }) => {
    await DescriptionsApi.clear(browser, x13BiomassStock)
  })

  test('NC fills type, variables and year one at a time and sees each error clear on its own', async ({
    authenticatedPage,
  }) => {
    const page = authenticatedPage

    const summaryLoaded = NavigationUtils.waitForValidationSummary(page)
    await page.goto(x13BiomassStockPath)
    await summaryLoaded
    await DOMUtils.ensureEditingUnlocked(page)
    await NavigationUtils.subSectionHasError(page, x13BiomassStockPath, false)

    await DescriptionUtils.getDescriptionToggleEditButton(page, dataSourcesTitle, 'Edit').click()
    await DescriptionUtils.save(page, async () => {
      const referenceEditor = await DataSourceUtils.addRow(page)
      await DescriptionUtils.pasteIntoEditorWysiwygLinksOnly(page, referenceEditor, reference.html)
    })

    const typeCell = await DataSourceUtils.getTypeCell(page, reference.text)
    const variablesCell = await DataSourceUtils.getVariablesCell(page, reference.text)
    const yearCell = await DataSourceUtils.getYearCell(page, reference.text)

    // A new row with only a reference has all three required fields marked
    await DataSourceUtils.expectCellError(page, typeCell)
    await DataSourceUtils.expectCellError(page, variablesCell)
    await DataSourceUtils.expectCellError(page, yearCell)
    await NavigationUtils.subSectionHasError(page, x13BiomassStockPath, true)

    await DescriptionUtils.save(page, () => DataSourceUtils.selectOption(page, reference.text, 'type', typeOption))
    await expect(typeCell).not.toHaveClass(/validation-error/, { timeout: cellTimeout })
    await DataSourceUtils.expectCellError(page, variablesCell)
    await DataSourceUtils.expectCellError(page, yearCell)

    // The error comes back once a filled field is empty again
    await DescriptionUtils.save(page, () => DataSourceUtils.clearOption(page, reference.text, 'type'))
    await DataSourceUtils.expectCellError(page, typeCell)

    await DescriptionUtils.save(page, () => DataSourceUtils.selectOption(page, reference.text, 'type', typeOption))
    await expect(typeCell).not.toHaveClass(/validation-error/, { timeout: cellTimeout })

    await DescriptionUtils.save(page, () =>
      DataSourceUtils.selectOption(page, reference.text, 'variables', variableOption)
    )
    await expect(variablesCell).not.toHaveClass(/validation-error/, { timeout: cellTimeout })
    await DataSourceUtils.expectCellError(page, yearCell)
    await NavigationUtils.subSectionHasError(page, x13BiomassStockPath, true)

    // Year is the last empty field, so the section isn't flagged anymore
    await DescriptionUtils.save(page, () => DataSourceUtils.selectOption(page, reference.text, 'year', yearOption))
    await expect(yearCell).not.toHaveClass(/validation-error/, { timeout: cellTimeout })
    await expect(typeCell).not.toHaveClass(/validation-error/, { timeout: cellTimeout })
    await expect(variablesCell).not.toHaveClass(/validation-error/, { timeout: cellTimeout })
    await NavigationUtils.subSectionHasError(page, x13BiomassStockPath, false)
  })

  test('NC reloads the page and sees the data source still valid', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    const storedValidations = DescriptionsApi.waitForValidations(page)
    const summaryLoaded = NavigationUtils.waitForValidationSummary(page)
    await page.goto(x13BiomassStockPath)
    const validations = await storedValidations
    await summaryLoaded

    const uuid = await DataSourceUtils.getRowUuid(page, reference.text)
    const rowValidations = validations[x13BiomassStock.sectionName]?.dataSources?.[uuid]
    expect(rowValidations?.type?.valid).toBe(true)
    expect(rowValidations?.variables?.valid).toBe(true)
    expect(rowValidations?.year?.valid).toBe(true)

    const typeCell = await DataSourceUtils.getTypeCell(page, reference.text)
    const variablesCell = await DataSourceUtils.getVariablesCell(page, reference.text)
    const yearCell = await DataSourceUtils.getYearCell(page, reference.text)
    await expect(typeCell).not.toHaveClass(/validation-error/)
    await expect(variablesCell).not.toHaveClass(/validation-error/)
    await expect(yearCell).not.toHaveClass(/validation-error/)
    await NavigationUtils.subSectionHasError(page, x13BiomassStockPath, false)
  })
})
