import { SectionNames } from 'meta/assessment/section'

import { NdpApiUtils, type NdpSeed } from '../../api/ndp'
import { expect, test } from '../../fixtures/ndp'
import { DOMUtils } from '../../utils/dom'
import { NDPDomUtils } from '../../utils/ndpDom'
import { SectionUtils } from '../../utils/section'
import { TableDomUtils } from '../../utils/table'

const countryIso = 'X08'
const extentOfForestPath = SectionUtils.path({ countryIso, sectionName: SectionNames.extentOfForest })

const year = 2015
const seed: NdpSeed = { countryIso, nationalClasses: [], year }

const seededYear = 2016
const seededUrlRegex = new RegExp(`/originalDataPoints/${seededYear}/extentOfForest$`)

test.describe('National data point: create', () => {
  test.beforeEach(async ({ authenticatedPage }) => {
    await NdpApiUtils.removeIfExists(authenticatedPage, seed)
  })

  test.afterEach(async ({ authenticatedPage }) => {
    await NdpApiUtils.removeIfExists(authenticatedPage, seed)
  })

  test('NC creates a national data point and sees it back on the table', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    await page.goto(extentOfForestPath)
    await DOMUtils.ensureEditingUnlocked(page)

    await page.getByRole('link', { name: 'Add national data point' }).click()

    await NDPDomUtils.fillYear(page, String(year))
    await NDPDomUtils.fillDataSourcesV1Reference(page, 'https://example.com/e2e-reference')

    await NDPDomUtils.doneEditing(page)
    await expect(page).toHaveURL(/\/sections\/extentOfForest$/)

    await expect(page.locator('.table-grid__odp-link', { hasText: String(year) })).toBeVisible({ timeout: 10000 })
  })
})

test.describe('National data point: delete', () => {
  test.use({ ndpSeeds: [{ countryIso, nationalClasses: [], year: seededYear }] })

  test('NC deletes the national data point', async ({ authenticatedPage, ndp }) => {
    const page = authenticatedPage
    expect(ndp.id).toBeTruthy()

    await page.goto(extentOfForestPath)
    await DOMUtils.ensureEditingUnlocked(page)
    await TableDomUtils.clickOdpLink(page, String(seededYear), seededUrlRegex)

    page.once('dialog', (dialog) => dialog.accept())
    await page.getByRole('button', { name: 'Delete' }).first().click()

    await expect(page).toHaveURL(/\/sections\/extentOfForest$/)
    await expect(page.locator('.table-grid__odp-link', { hasText: String(seededYear) })).toHaveCount(0, {
      timeout: 10000,
    })
  })
})
