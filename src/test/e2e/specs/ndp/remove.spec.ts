import { SectionNames } from 'meta/assessment/section'

import { expect, test } from 'test/e2e/fixtures/ndp'
import { DOMUtils } from 'test/e2e/utils/dom'
import { SectionUtils } from 'test/e2e/utils/section'
import { TableDomUtils } from 'test/e2e/utils/table'

const countryIso = 'X09'
const extentOfForestPath = SectionUtils.path({ countryIso, sectionName: SectionNames.extentOfForest })

const seededYear = 2015

test.describe('National data point: remove', () => {
  test.use({ ndpSeeds: [{ countryIso, nationalClasses: [], year: seededYear }] })

  test('NC deletes the national data point', async ({ authenticatedPage, ndp }) => {
    const page = authenticatedPage
    expect(ndp.id).toBeTruthy()

    await page.goto(extentOfForestPath)
    await DOMUtils.ensureEditingUnlocked(page)
    await TableDomUtils.clickOdpLink(page, {
      countryIso,
      sectionName: SectionNames.extentOfForest,
      year: seededYear,
    })

    page.once('dialog', (dialog) => dialog.accept())
    await page.getByRole('button', { name: 'Delete' }).first().click()

    await expect(page).toHaveURL(/\/sections\/extentOfForest$/)
    await expect(page.locator('.table-grid__odp-link', { hasText: String(seededYear) })).toHaveCount(0, {
      timeout: 10000,
    })
  })
})
