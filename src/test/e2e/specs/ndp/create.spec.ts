import { SectionNames } from 'meta/assessment/section'

import { NdpApiUtils, type NdpSeed } from 'test/e2e/api/ndp'
import { expect, test } from 'test/e2e/fixtures/ndp'
import { DOMUtils } from 'test/e2e/utils/dom'
import { NDPDomUtils } from 'test/e2e/utils/ndpDom'
import { SectionUtils } from 'test/e2e/utils/section'

const countryIso = 'X08'
const extentOfForestPath = SectionUtils.path({ countryIso, sectionName: SectionNames.extentOfForest })

const createdYear = 2015

test.describe('National data point: create', () => {
  const createdSeed: NdpSeed = { countryIso, nationalClasses: [], year: createdYear }

  test.beforeEach(async ({ authenticatedPage }) => {
    await NdpApiUtils.removeIfExists(authenticatedPage, createdSeed)
  })

  test.afterEach(async ({ authenticatedPage }) => {
    await NdpApiUtils.removeIfExists(authenticatedPage, createdSeed)
  })

  test('NC creates a national data point and sees it back on the table', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    await page.goto(extentOfForestPath)
    await DOMUtils.ensureEditingUnlocked(page)

    await page.getByRole('link', { name: 'Add national data point' }).click()

    await NDPDomUtils.fillYear(page, String(createdYear))
    await NDPDomUtils.fillDataSourcesV1Reference(page, 'https://example.com/e2e-reference')

    await NDPDomUtils.doneEditing(page)
    await expect(page).toHaveURL(/\/sections\/extentOfForest$/)

    await expect(page.locator('.table-grid__odp-link', { hasText: String(createdYear) })).toBeVisible({
      timeout: 10000,
    })
  })
})
