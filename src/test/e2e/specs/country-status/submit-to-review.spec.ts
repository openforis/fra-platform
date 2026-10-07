import { Locator, mergeTests, Page } from '@playwright/test'
import { enTranslation } from 'i18n/resources/en'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryStatus } from 'meta/area/countryStatus'
import { CycleNames } from 'meta/assessment/cycle/names'

import { CountryApi } from 'test/e2e/api/country'
import { andExtentOfForest, andExtentOfForestPath } from 'test/e2e/data/sectionTables'
import { test as countryTest } from 'test/e2e/fixtures/country'
import { expect, test as tableTest } from 'test/e2e/fixtures/table'
import { CountryStatusUtils } from 'test/e2e/utils/countryStatus'
import { DOMUtils } from 'test/e2e/utils/dom'
import { NavigationUtils } from 'test/e2e/utils/navigation'
import { TableDomUtils } from 'test/e2e/utils/table'

const test = mergeTests(tableTest, countryTest)

const countrySeed = {
  countryIso: andExtentOfForest.countryIso,
  cycleName: CycleNames._2025,
  status: CountryStatus.editing,
}

const statusLabel = (page: Page): Locator => page.locator('.nav-header__status')

test.describe('Country status: submit to review - without errors', () => {
  test.use({ countrySeed })

  test('Admin sends to review with no errors warning and sees the in review status', async ({
    authenticatedPage,
    country,
  }) => {
    const page = authenticatedPage
    expect(country.props.status).toBe(CountryStatus.editing)

    const summaryLoaded = NavigationUtils.waitForValidationSummary(page)
    await page.goto(andExtentOfForestPath)
    await summaryLoaded

    await expect(statusLabel(page)).toHaveText(enTranslation.assessment.status.editing.label)

    await CountryStatusUtils.sendToReviewHasWarning(page, false)
    await CountryStatusUtils.sendToReview(page)

    await expect(statusLabel(page)).toHaveText(enTranslation.assessment.status.review.label)
    const reviewCountry = await CountryApi.get(page, countrySeed)
    expect(reviewCountry.props.status).toBe(CountryStatus.review)
  })
})

test.describe('Country status: submit to review - with errors', () => {
  test.use({
    countrySeed,
    tableSeeds: [andExtentOfForest],
  })

  test('Admin enters an invalid value, opens send to review and sees the errors warning', async ({
    authenticatedPage,
    country,
  }) => {
    const page = authenticatedPage
    expect(country.props.status).toBe(CountryStatus.editing)

    const summaryLoaded = NavigationUtils.waitForValidationSummary(page)
    await page.goto(andExtentOfForestPath)
    await summaryLoaded
    await NavigationUtils.subSectionHasError(page, andExtentOfForestPath, false)

    await DOMUtils.ensureEditingUnlocked(page)
    const cellSaved = DOMUtils.waitForResponse(page, ApiEndPoint.CycleData.Table.nodes(), 'PATCH')
    await TableDomUtils.fillCell(page, 'forestArea', '2025', '-1')
    await cellSaved

    await NavigationUtils.subSectionHasError(page, andExtentOfForestPath, true)
    await CountryStatusUtils.sendToReviewHasWarning(page, true)
  })
})
