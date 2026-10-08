import { Locator, Page } from '@playwright/test'
import { enTranslation } from 'i18n/resources/en'

import { DescriptionsApi } from 'test/e2e/api/descriptions'
import { x13Disturbances, x13DisturbancesPath } from 'test/e2e/data/sectionDescriptions'
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

// Timeout time for the socket event that updates the cell errors
const cellTimeout = 10_000
// Timeout time for the links worker that checks the reference and updates its errors
const referenceTimeout = 20_000

const expectCellError = async (page: Page, cell: Locator): Promise<void> => {
  await expect(cell).toHaveClass(/validation-error/, { timeout: cellTimeout })
  await TooltipUtils.expectValidationTooltip(page, cell, emptyValueMessage)
}

const fillRequiredFields = async (page: Page, text: string, variableOption: string): Promise<void> => {
  await DescriptionUtils.save(page, () => DataSourceUtils.selectDataSourceOption(page, text, 'type', typeOption))
  await DescriptionUtils.save(page, () =>
    DataSourceUtils.selectDataSourceOption(page, text, 'variables', variableOption)
  )
  await DescriptionUtils.save(page, () => DataSourceUtils.selectDataSourceOption(page, text, 'year', yearOption))
}

test.describe.serial('Section descriptions: data sources - reference and required field errors', () => {
  const invalidLinks = LinkBuilder.buildInvalidLinksHtml(`data-source-reference-errors-${randomString}`)
  const validReference = LinkBuilder.buildValidLinkHtml(`data-source-reference-errors-${randomString}`)
  const variableOption = enTranslation.disturbances.insects

  test.afterAll(async ({ browser }) => {
    await DescriptionsApi.clear(browser, x13Disturbances)
  })

  test('NC fixes an invalid reference and sees the required field errors stay', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    const summaryLoaded = NavigationUtils.waitForValidationSummary(page)
    await page.goto(x13DisturbancesPath)
    await summaryLoaded
    await DOMUtils.ensureEditingUnlocked(page)
    await NavigationUtils.subSectionHasError(page, x13DisturbancesPath, false)

    await DescriptionUtils.getDescriptionToggleEditButton(page, dataSourcesTitle, 'Edit').click()
    await DescriptionUtils.save(page, async () => {
      const referenceEditor = await DataSourceUtils.addDataSource(page)
      await DescriptionUtils.pasteIntoEditorWysiwygLinksOnly(page, referenceEditor, invalidLinks.html)
    })

    const referenceCell = await DataSourceUtils.getDataSourceRowReferenceCell(page, invalidLinks.emptyLinkText)
    const referenceField = referenceCell.locator('.editorWYSIWYG')
    const typeCell = await DataSourceUtils.getDataSourceTypeCell(page, invalidLinks.emptyLinkText)
    const variablesCell = await DataSourceUtils.getDataSourceVariablesCell(page, invalidLinks.emptyLinkText)
    const yearCell = await DataSourceUtils.getDataSourceYearCell(page, invalidLinks.emptyLinkText)

    await expect(referenceField).toHaveClass(/validation-error/, { timeout: referenceTimeout })
    await expectCellError(page, typeCell)
    await expectCellError(page, variablesCell)
    await expectCellError(page, yearCell)
    await NavigationUtils.subSectionHasError(page, x13DisturbancesPath, true)

    await DescriptionUtils.save(page, () =>
      DescriptionUtils.pasteIntoEditorWysiwygLinksOnly(
        page,
        referenceCell.locator('.jodit-wysiwyg'),
        validReference.html
      )
    )
    await expect(referenceField).not.toHaveClass(/validation-error/, { timeout: referenceTimeout })

    // The links worker only updates the reference, so the required field errors are still there
    await expectCellError(page, typeCell)
    await expectCellError(page, variablesCell)
    await expectCellError(page, yearCell)
    await NavigationUtils.subSectionHasError(page, x13DisturbancesPath, true)
  })

  test('NC reloads the page and sees only the required fields still invalid', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    const storedValidations = DescriptionsApi.waitForValidations(page)
    await page.goto(x13DisturbancesPath)
    const validations = await storedValidations

    const uuid = await DataSourceUtils.getDataSourceRowUuid(page, validReference.text)
    const rowValidations = validations[x13Disturbances.sectionName]?.dataSources?.[uuid]
    expect(rowValidations?.reference?.valid).toBe(true)
    expect(rowValidations?.type?.valid).toBe(false)
    expect(rowValidations?.variables?.valid).toBe(false)
    expect(rowValidations?.year?.valid).toBe(false)
  })

  test('NC breaks the reference again, fills the required fields and sees the reference error stay', async ({
    authenticatedPage,
  }) => {
    const page = authenticatedPage

    await page.goto(x13DisturbancesPath)
    await DOMUtils.ensureEditingUnlocked(page)
    await DescriptionUtils.getDescriptionToggleEditButton(page, dataSourcesTitle, 'Edit').click()

    const referenceCell = await DataSourceUtils.getDataSourceRowReferenceCell(page, validReference.text)
    const referenceField = referenceCell.locator('.editorWYSIWYG')
    const typeCell = await DataSourceUtils.getDataSourceTypeCell(page, validReference.text)
    const variablesCell = await DataSourceUtils.getDataSourceVariablesCell(page, validReference.text)
    const yearCell = await DataSourceUtils.getDataSourceYearCell(page, validReference.text)

    await DescriptionUtils.save(page, () =>
      DescriptionUtils.pasteIntoEditorWysiwygLinksOnly(page, referenceCell.locator('.jodit-wysiwyg'), invalidLinks.html)
    )
    await expect(referenceField).toHaveClass(/validation-error/, { timeout: referenceTimeout })

    await fillRequiredFields(page, invalidLinks.emptyLinkText, variableOption)
    await expect(typeCell).not.toHaveClass(/validation-error/, { timeout: cellTimeout })
    await expect(variablesCell).not.toHaveClass(/validation-error/, { timeout: cellTimeout })
    await expect(yearCell).not.toHaveClass(/validation-error/, { timeout: cellTimeout })

    // Saving the required fields keeps the stored reference result, so its error is still there
    await expect(referenceField).toHaveClass(/validation-error/)
    await NavigationUtils.subSectionHasError(page, x13DisturbancesPath, true)
  })

  test('NC reloads the page and sees only the reference still invalid', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    const storedValidations = DescriptionsApi.waitForValidations(page)
    await page.goto(x13DisturbancesPath)
    const validations = await storedValidations

    const uuid = await DataSourceUtils.getDataSourceRowUuid(page, invalidLinks.emptyLinkText)
    const rowValidations = validations[x13Disturbances.sectionName]?.dataSources?.[uuid]
    expect(rowValidations?.reference?.valid).toBe(false)
    expect(rowValidations?.type?.valid).toBe(true)
    expect(rowValidations?.variables?.valid).toBe(true)
    expect(rowValidations?.year?.valid).toBe(true)
  })
})
