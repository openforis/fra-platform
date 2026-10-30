import { type Locator, type Page } from '@playwright/test'

import { CycleNames } from 'meta/assessment/cycle/names'
import { SectionNames } from 'meta/assessment/section'

import { CountryApi } from 'test/e2e/api/country'
import { NdpApi, type NdpSeed } from 'test/e2e/api/ndp'
import { expect, test } from 'test/e2e/fixtures/ndp'
import { DOMUtils } from 'test/e2e/utils/dom'
import { NDPDomUtils } from 'test/e2e/utils/ndpDom'
import { SectionUtils } from 'test/e2e/utils/section'

const countryIso = 'X14'
const cycleName = CycleNames._2025

const seededYear = 2015
const otherYear = 2016
const ndpPath = (year: number): string =>
  SectionUtils.ndpPath({ countryIso, sectionName: SectionNames.extentOfForest, year })

const recentActivityPath = `/assessments/fra/${cycleName}/${countryIso}/home/recentActivity`

const goToCreatedActivityLink = async (page: Page): Promise<Locator> => {
  await CountryApi.refreshRecentActivity(page, { countryIso, cycleName })
  await page.goto(recentActivityPath)

  return page
    .locator('.landing__activity-item', { hasText: 'added' })
    .getByRole('link', { name: 'National data point' })
    .first()
}

test.describe('Recent activity: national data point links', () => {
  test.use({ ndpSeeds: [{ countryIso, nationalClasses: [], year: seededYear }] })

  test('a created national data point links to its page', async ({ authenticatedPage, ndp }) => {
    const page = authenticatedPage
    expect(ndp.id).toBeTruthy()

    const link = await goToCreatedActivityLink(page)
    await expect(link).not.toHaveClass(/disabled/)

    await link.click()
    await expect(page).toHaveURL(new RegExp(`${ndpPath(seededYear)}$`))
  })

  test.describe('edited', () => {
    const movedSeed: NdpSeed = { countryIso, nationalClasses: [], year: otherYear }

    test.beforeEach(async ({ authenticatedPage }) => {
      await NdpApi.removeIfExists(authenticatedPage, movedSeed)
    })

    test.afterEach(async ({ authenticatedPage }) => {
      await NdpApi.removeIfExists(authenticatedPage, movedSeed)
    })

    test('a national data point moved to another year links to its current year', async ({
      authenticatedPage,
      ndp,
    }) => {
      const page = authenticatedPage
      expect(ndp.id).toBeTruthy()

      await page.goto(ndpPath(seededYear))
      await DOMUtils.ensureEditingUnlocked(page)
      await NDPDomUtils.changeYear(page, String(otherYear))
      await expect(page).toHaveURL(new RegExp(`${ndpPath(otherYear)}$`))

      // ==== the creation was logged with the seeded year
      const link = await goToCreatedActivityLink(page)
      await expect(link).not.toHaveClass(/disabled/)

      await link.click()
      await expect(page).toHaveURL(new RegExp(`${ndpPath(otherYear)}$`))
    })
  })

  test('a deleted national data point has no link', async ({ authenticatedPage, ndp }) => {
    const page = authenticatedPage
    expect(ndp.id).toBeTruthy()

    await NdpApi.removeIfExists(page, { countryIso, nationalClasses: [], year: seededYear })

    const link = await goToCreatedActivityLink(page)
    await expect(link).toHaveClass(/disabled/)
  })
})
