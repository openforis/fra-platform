import { Locator, Page } from '@playwright/test'
import { enTranslation } from 'i18n/resources/en'

import { DataSourceType } from 'meta/assessment/description/dataSourceType'
import { type DataSource } from 'meta/assessment/descriptionValue/dataSource'
import { UUIDs } from 'meta/uuid/uuids'

import { DescriptionsApi } from 'test/e2e/api/descriptions'
import { x12AreaAffectedByFire, x12AreaAffectedByFirePath, x12Disturbances } from 'test/e2e/data/sectionDescriptions'
import { expect, test } from 'test/e2e/fixtures/auth'
import { DataSourceUtils } from 'test/e2e/utils/dataSource'
import { DescriptionUtils } from 'test/e2e/utils/description'
import { DOMUtils } from 'test/e2e/utils/dom'
import { LinkBuilder } from 'test/e2e/utils/links'
import { NavigationUtils } from 'test/e2e/utils/navigation'
import { TooltipUtils } from 'test/e2e/utils/tooltip'

const dataSourcesTitle = enTranslation.description.dataSourcesPlus
const copyLabel = enTranslation.nationalDataPoint.copyPreviousValues
const emptyValueMessage = enTranslation.generalValidation.notEmpty
const variableOption = enTranslation.areaAffectedByFire.totalLandAreaAffectedByFire
const yearOption = '2020'

const randomString = Date.now().toString()

// Timeout time for the socket event that updates the cell errors
const cellTimeout = 10_000

const expectCellError = async (page: Page, cell: Locator): Promise<void> => {
  await expect(cell).toHaveClass(/validation-error/, { timeout: cellTimeout })
  await TooltipUtils.expectValidationTooltip(page, cell, emptyValueMessage)
}

const getCopyButton = (page: Page): Locator =>
  DescriptionUtils.getDescriptionBlock(page, dataSourcesTitle).locator('button', { hasText: copyLabel })

const buildDataSource = (reference: string, variables: Array<string>): DataSource => ({
  comments: '',
  reference,
  type: DataSourceType.nationalForestInventory,
  uuid: UUIDs.getUuid(),
  variables,
  year: [yearOption],
})

test.describe.serial('Section descriptions: data sources - copy previous section', () => {
  const firstReference = LinkBuilder.buildValidLinkHtml(`data-source-copy-first-${randomString}`)
  const secondReference = LinkBuilder.buildValidLinkHtml(`data-source-copy-second-${randomString}`)
  const existingReference = LinkBuilder.buildValidLinkHtml(`data-source-copy-existing-${randomString}`)
  const copiedReferences = [firstReference, secondReference]

  test.afterAll(async ({ browser }) => {
    await DescriptionsApi.clear(browser, x12Disturbances)
    await DescriptionsApi.clear(browser, x12AreaAffectedByFire)
  })

  test("NC can't copy the previous section's data sources while the section has its own", async ({
    authenticatedPage,
  }) => {
    const page = authenticatedPage

    const sourceDataSources = copiedReferences.map<DataSource>((reference) =>
      buildDataSource(reference.html, ['insects'])
    )
    await DescriptionsApi.setValue(page, x12Disturbances, { text: '', dataSources: sourceDataSources })
    const existingDataSource = buildDataSource(existingReference.html, ['total_land_area_affected_by_fire'])
    await DescriptionsApi.setValue(page, x12AreaAffectedByFire, { text: '', dataSources: [existingDataSource] })

    await page.goto(x12AreaAffectedByFirePath)
    await DOMUtils.ensureEditingUnlocked(page)
    await DescriptionUtils.getDescriptionToggleEditButton(page, dataSourcesTitle, 'Edit').click()

    // Copying replaces every row of the section, so it's only possible once the section has none
    await expect(getCopyButton(page)).toBeDisabled()
    await DataSourceUtils.deleteDataSourceRow(page, existingReference.text)
    await expect(getCopyButton(page)).toBeEnabled()
  })

  test('NC copies the data sources of the previous section and sees only the variables marked as empty', async ({
    authenticatedPage,
  }) => {
    const page = authenticatedPage

    const summaryLoaded = NavigationUtils.waitForValidationSummary(page)
    await page.goto(x12AreaAffectedByFirePath)
    await summaryLoaded
    await DOMUtils.ensureEditingUnlocked(page)
    await NavigationUtils.subSectionHasError(page, x12AreaAffectedByFirePath, false)

    await DescriptionUtils.getDescriptionToggleEditButton(page, dataSourcesTitle, 'Edit').click()
    await DescriptionUtils.save(page, () => getCopyButton(page).click())

    const sourceDataSources = (await DescriptionsApi.getValue(page, x12Disturbances))?.dataSources ?? []
    const copiedDataSources = (await DescriptionsApi.getValue(page, x12AreaAffectedByFire))?.dataSources ?? []
    const sourceUuids = sourceDataSources.map<string>((dataSource) => dataSource.uuid)

    // The deleted row doesn't come back, the section only has the copied rows
    expect(copiedDataSources).toHaveLength(sourceDataSources.length)
    copiedDataSources.forEach((copied, index) => {
      const source = sourceDataSources[index]
      expect(sourceUuids).not.toContain(copied.uuid)
      expect(copied.reference).toBe(source.reference)
      expect(copied.type).toBe(source.type)
      expect(copied.year).toEqual(source.year)
      expect(copied.variables).toEqual([])
    })

    const firstVariablesCell = await DataSourceUtils.getDataSourceVariablesCell(page, firstReference.text)
    const secondVariablesCell = await DataSourceUtils.getDataSourceVariablesCell(page, secondReference.text)
    await expectCellError(page, firstVariablesCell)
    await expectCellError(page, secondVariablesCell)

    // The variable errors are already shown, so the type and year results have arrived too
    const firstTypeCell = await DataSourceUtils.getDataSourceTypeCell(page, firstReference.text)
    const firstYearCell = await DataSourceUtils.getDataSourceYearCell(page, firstReference.text)
    const secondTypeCell = await DataSourceUtils.getDataSourceTypeCell(page, secondReference.text)
    const secondYearCell = await DataSourceUtils.getDataSourceYearCell(page, secondReference.text)
    await expect(firstTypeCell).not.toHaveClass(/validation-error/)
    await expect(firstYearCell).not.toHaveClass(/validation-error/)
    await expect(secondTypeCell).not.toHaveClass(/validation-error/)
    await expect(secondYearCell).not.toHaveClass(/validation-error/)
    await NavigationUtils.subSectionHasError(page, x12AreaAffectedByFirePath, true)
  })

  test('NC picks the variables of the copied data sources and sees the errors clear', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    const summaryLoaded = NavigationUtils.waitForValidationSummary(page)
    await page.goto(x12AreaAffectedByFirePath)
    await summaryLoaded
    await DOMUtils.ensureEditingUnlocked(page)
    await DescriptionUtils.getDescriptionToggleEditButton(page, dataSourcesTitle, 'Edit').click()

    const firstVariablesCell = await DataSourceUtils.getDataSourceVariablesCell(page, firstReference.text)
    const secondVariablesCell = await DataSourceUtils.getDataSourceVariablesCell(page, secondReference.text)
    await expectCellError(page, firstVariablesCell)

    await DescriptionUtils.save(page, () =>
      DataSourceUtils.selectDataSourceOption(page, firstReference.text, 'variables', variableOption)
    )
    await expect(firstVariablesCell).not.toHaveClass(/validation-error/, { timeout: cellTimeout })
    await expectCellError(page, secondVariablesCell)
    await NavigationUtils.subSectionHasError(page, x12AreaAffectedByFirePath, true)

    await DescriptionUtils.save(page, () =>
      DataSourceUtils.selectDataSourceOption(page, secondReference.text, 'variables', variableOption)
    )
    await expect(secondVariablesCell).not.toHaveClass(/validation-error/, { timeout: cellTimeout })
    await NavigationUtils.subSectionHasError(page, x12AreaAffectedByFirePath, false)
  })

  test('NC reloads the page and sees the copied data sources still valid', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    const storedValidations = DescriptionsApi.waitForValidations(page)
    await page.goto(x12AreaAffectedByFirePath)
    const dataSourceValidations = (await storedValidations)[x12AreaAffectedByFire.sectionName]?.dataSources ?? {}

    const firstUuid = await DataSourceUtils.getDataSourceRowUuid(page, firstReference.text)
    const secondUuid = await DataSourceUtils.getDataSourceRowUuid(page, secondReference.text)
    expect(Object.keys(dataSourceValidations).sort()).toEqual([firstUuid, secondUuid].sort())
    expect(dataSourceValidations[firstUuid]?.variables?.valid).toBe(true)
    expect(dataSourceValidations[secondUuid]?.variables?.valid).toBe(true)
  })
})
