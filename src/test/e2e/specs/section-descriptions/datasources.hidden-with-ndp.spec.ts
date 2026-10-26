import { Page } from '@playwright/test'
import { enTranslation } from 'i18n/resources/en'

import { type CountryProps } from 'meta/area/country'
import { CycleNames } from 'meta/assessment/cycle/names'
import { DataSourceType } from 'meta/assessment/description/dataSourceType'
import { type DataSource } from 'meta/assessment/descriptionValue/dataSource'
import { type SectionName } from 'meta/assessment/section'
import { type ValidationSummary, type ValidationSummarySubsection } from 'meta/assessment/validation/summary'
import { UUIDs } from 'meta/uuid/uuids'

import { CountryApi, type CountryLocation } from 'test/e2e/api/country'
import { type DescriptionLocation, DescriptionsApi } from 'test/e2e/api/descriptions'
import { NdpApi, type NdpSeed } from 'test/e2e/api/ndp'
import { ValidationsApi } from 'test/e2e/api/validations'
import { Timeouts } from 'test/e2e/config/timeouts'
import {
  belExtentOfForest,
  belExtentOfForestPath,
  belForestCharacteristics,
  belForestCharacteristicsPath,
} from 'test/e2e/data/sectionDescriptions'
import { expect, test } from 'test/e2e/fixtures/auth'
import { DataSourceUtils } from 'test/e2e/utils/dataSource'
import { DescriptionUtils } from 'test/e2e/utils/description'
import { DOMUtils } from 'test/e2e/utils/dom'
import { NavigationUtils } from 'test/e2e/utils/navigation'
import { NDPDomUtils } from 'test/e2e/utils/ndpDom'

const commentsTitle = enTranslation.description.generalCommentsTitle
const yearOption = '2020'

const randomString = Date.now().toString()

const country: CountryLocation = { countryIso: 'BEL', cycleName: CycleNames._2025 }
// One NDP to hide the data sources
const ndpSeed: NdpSeed = { countryIso: 'BEL', nationalClasses: [], year: 2015 }

const getSubsection = (summary: ValidationSummary, sectionName: SectionName): ValidationSummarySubsection | undefined =>
  Object.values(summary.subsections).find((s) => s.sectionName === sectionName)

const seedDataSourceWithoutVariables = async (page: Page, location: DescriptionLocation): Promise<string> => {
  const reference = `hidden data source ${location.sectionName} ${randomString}`
  const dataSource: DataSource = {
    comments: '',
    reference,
    type: DataSourceType.nationalForestInventory,
    uuid: UUIDs.getUuid(),
    variables: [],
    year: [yearOption],
  }
  await DescriptionsApi.setValue(page, location, { text: '', dataSources: [dataSource] })
  return reference
}

const expectDataSourcesHidden = async (page: Page): Promise<void> => {
  await expect(DescriptionUtils.getDescriptionBlock(page, commentsTitle)).toBeVisible()
  // When the page is already open, the NDP change reaches it over the socket
  await expect(DataSourceUtils.getTable(page)).toHaveCount(0, { timeout: Timeouts.medium })
}

test.describe('Section descriptions: data sources - hidden with NDP data', () => {
  let originalUseNationalDataPoints: CountryProps['forestCharacteristics']['useOriginalDataPoint']

  test.beforeEach(async ({ authenticatedPage }) => {
    const { props } = await CountryApi.get(authenticatedPage, country)
    originalUseNationalDataPoints = props.forestCharacteristics.useOriginalDataPoint
  })

  test.afterEach(async ({ authenticatedPage, browser }) => {
    await NdpApi.removeIfExists(authenticatedPage, ndpSeed)
    await CountryApi.setUseNationalDataPoints(authenticatedPage, country, originalUseNationalDataPoints)
    await DescriptionsApi.clear(browser, belExtentOfForest)
    await DescriptionsApi.clear(browser, belForestCharacteristics)
  })

  test('NC sees the 1a data source error hidden while the country has NDP data', async ({ authenticatedPage }) => {
    const page = authenticatedPage
    const reference = await seedDataSourceWithoutVariables(page, belExtentOfForest)

    await page.goto(belExtentOfForestPath)
    const variablesCell = await DataSourceUtils.getVariablesCell(page, reference)
    await DataSourceUtils.expectCellError(page, variablesCell)
    await NavigationUtils.subSectionHasError(page, belExtentOfForestPath, true)

    await NdpApi.create(page, ndpSeed)
    const summary = await ValidationsApi.getSummary(page, country)

    // The error is still stored, it just doesn't count while the data sources are hidden
    expect(summary.descriptions[belExtentOfForest.sectionName]?.dataSources?.valid).toBe(false)
    expect(getSubsection(summary, belExtentOfForest.sectionName)?.valid).toBe(true)
    // No reload, so the table and the error the page showed have to go away
    await expectDataSourcesHidden(page)
    await NavigationUtils.subSectionHasError(page, belExtentOfForestPath, false)

    await NdpApi.removeIfExists(page, ndpSeed)
    // Reload because the open page can refetch the summary before the server drops the NDP from its cache
    await page.goto(belExtentOfForestPath)
    await DataSourceUtils.expectCellError(page, variablesCell)
    await NavigationUtils.subSectionHasError(page, belExtentOfForestPath, true)
  })

  test('NC turns on the NDP option in 1b and sees the 1b data source error hidden until it is turned off', async ({
    authenticatedPage,
  }) => {
    const page = authenticatedPage
    await NdpApi.create(page, ndpSeed)
    const reference = await seedDataSourceWithoutVariables(page, belForestCharacteristics)

    const summaryLoaded = NavigationUtils.waitForValidationSummary(page)
    await page.goto(belForestCharacteristicsPath)
    await summaryLoaded
    await DOMUtils.ensureEditingUnlocked(page)
    const variablesCell = await DataSourceUtils.getVariablesCell(page, reference)
    await DataSourceUtils.expectCellError(page, variablesCell)
    await NavigationUtils.subSectionHasError(page, belForestCharacteristicsPath, true)
    await NavigationUtils.subSectionHasError(page, belExtentOfForestPath, false)

    await NDPDomUtils.clickToggleNDPUsage(page)
    // The page also refetches the summary when the 1b NDP data loads, so a wait could get that one
    const summary = await ValidationsApi.getSummary(page, country)

    expect(summary.descriptions[belForestCharacteristics.sectionName]?.dataSources?.valid).toBe(false)
    expect(getSubsection(summary, belForestCharacteristics.sectionName)?.valid).toBe(true)
    await expectDataSourcesHidden(page)
    await NavigationUtils.subSectionHasError(page, belForestCharacteristicsPath, false)
    await NavigationUtils.subSectionHasError(page, belExtentOfForestPath, false)

    const summaryRefetched = NavigationUtils.waitForValidationSummary(page)
    await NDPDomUtils.clickToggleNDPUsage(page)
    await summaryRefetched
    await DataSourceUtils.expectCellError(page, variablesCell)
    await NavigationUtils.subSectionHasError(page, belForestCharacteristicsPath, true)
    await NavigationUtils.subSectionHasError(page, belExtentOfForestPath, false)
  })
})
