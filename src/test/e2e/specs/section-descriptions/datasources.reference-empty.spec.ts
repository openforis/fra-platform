import { Page } from '@playwright/test'
import { enTranslation } from 'i18n/resources/en'

import { DescriptionsApi } from 'test/e2e/api/descriptions'
import { x13CarbonStock, x13CarbonStockPath } from 'test/e2e/data/sectionDescriptions'
import { expect, test } from 'test/e2e/fixtures/auth'
import { DataSourceUtils } from 'test/e2e/utils/dataSource'
import { DescriptionUtils } from 'test/e2e/utils/description'
import { DOMUtils } from 'test/e2e/utils/dom'
import { LinkBuilder } from 'test/e2e/utils/links'
import { NavigationUtils } from 'test/e2e/utils/navigation'
import { TooltipUtils } from 'test/e2e/utils/tooltip'

const dataSourcesTitle = enTranslation.description.dataSourcesPlus
const emptyValueMessage = enTranslation.generalValidation.notEmpty
const typeOption = enTranslation.dataSource.nationalForestInventory
const yearOption = '2020'

const randomString = Date.now().toString()

// Timeout time for the links worker that checks the reference and updates its errors
const referenceTimeout = 20_000

const fillRequiredFields = async (page: Page, text: string, variableOption: string): Promise<void> => {
  await DescriptionUtils.save(page, () => DataSourceUtils.selectOption(page, text, 'type', typeOption))
  await DescriptionUtils.save(page, () => DataSourceUtils.selectOption(page, text, 'variables', variableOption))
  await DescriptionUtils.save(page, () => DataSourceUtils.selectOption(page, text, 'year', yearOption))
}

test.describe.serial('Section descriptions: data sources - empty reference', () => {
  const reference = LinkBuilder.buildValidLinkHtml(`data-source-empty-reference-${randomString}`)
  const variableOption = enTranslation.carbonStock.carbonDeadwood

  test.afterAll(async ({ browser }) => {
    await DescriptionsApi.clear(browser, x13CarbonStock)
  })

  test('NC empties the reference of a filled data source and sees the error until it is filled again', async ({
    authenticatedPage,
  }) => {
    const page = authenticatedPage

    const summaryLoaded = NavigationUtils.waitForValidationSummary(page)
    await page.goto(x13CarbonStockPath)
    await summaryLoaded
    await DOMUtils.ensureEditingUnlocked(page)
    await NavigationUtils.subSectionHasError(page, x13CarbonStockPath, false)

    await DescriptionUtils.getDescriptionToggleEditButton(page, dataSourcesTitle, 'Edit').click()
    await DescriptionUtils.save(page, async () => {
      const referenceEditor = await DataSourceUtils.addRow(page)
      await DescriptionUtils.pasteIntoEditorWysiwygLinksOnly(page, referenceEditor, reference.html)
    })
    await fillRequiredFields(page, reference.text, variableOption)
    await NavigationUtils.subSectionHasError(page, x13CarbonStockPath, false)

    const referenceCell = await DataSourceUtils.getReferenceCell(page, reference.text)
    const referenceField = referenceCell.locator('.editorWYSIWYG')
    const referenceEditor = referenceCell.locator('.jodit-wysiwyg')

    await DescriptionUtils.save(page, () => DescriptionUtils.fillEditorWysiwyg(page, referenceEditor, []))
    await expect(referenceField).toHaveClass(/validation-error/, { timeout: referenceTimeout })
    await TooltipUtils.expectValidationTooltip(page, referenceField, emptyValueMessage)
    await NavigationUtils.subSectionHasError(page, x13CarbonStockPath, true)

    await DescriptionUtils.save(page, () =>
      DescriptionUtils.pasteIntoEditorWysiwygLinksOnly(page, referenceEditor, reference.html)
    )
    await expect(referenceField).not.toHaveClass(/validation-error/, { timeout: referenceTimeout })
    await NavigationUtils.subSectionHasError(page, x13CarbonStockPath, false)
  })

  test('NC reloads the page and sees the reference still valid', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    const storedValidations = DescriptionsApi.waitForValidations(page)
    const summaryLoaded = NavigationUtils.waitForValidationSummary(page)
    await page.goto(x13CarbonStockPath)
    const validations = await storedValidations
    await summaryLoaded

    const uuid = await DataSourceUtils.getRowUuid(page, reference.text)
    const rowValidations = validations[x13CarbonStock.sectionName]?.dataSources?.[uuid]
    // The server stores the reference as valid, the cell check below only makes sure the UI matches
    expect(rowValidations?.reference?.valid).toBe(true)

    const referenceCell = await DataSourceUtils.getReferenceCell(page, reference.text)
    await expect(referenceCell.locator('.editorWYSIWYG')).not.toHaveClass(/validation-error/)
    await NavigationUtils.subSectionHasError(page, x13CarbonStockPath, false)
  })
})
