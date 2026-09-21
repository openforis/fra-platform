import { SectionNames } from 'meta/assessment/section'

import { expect, test } from 'test/e2e/fixtures/ndp'
import { DOMUtils } from 'test/e2e/utils/dom'
import { LinkBuilder } from 'test/e2e/utils/links'
import { NDPDomUtils } from 'test/e2e/utils/ndpDom'
import { SectionUtils } from 'test/e2e/utils/section'

const countryIso = 'X15'
const seededYear = 2015
const ndp1aPath = SectionUtils.ndpPath({ countryIso, sectionName: SectionNames.extentOfForest, year: seededYear })

const randomString = Date.now().toString()
const extentOfForestValidLink = LinkBuilder.buildValidLinkHtml(`ndp-extent-of-forest-${randomString}`)
const forestCharacteristicsValidLink = LinkBuilder.buildValidLinkHtml(`ndp-forest-characteristics-${randomString}`)
const referenceValidLink = LinkBuilder.buildValidLinkHtml(`ndp-reference-${randomString}`)

test.describe('National data point: metadata - success', () => {
  test.use({ ndpSeeds: [{ countryIso, nationalClasses: [], year: seededYear }] })

  test('NC enters valid links in comments and sees no validation errors', async ({ authenticatedPage, ndp }) => {
    const page = authenticatedPage
    expect(ndp.id).toBeTruthy()

    await page.goto(ndp1aPath)
    await DOMUtils.ensureEditingUnlocked(page)

    await NDPDomUtils.fillComments(page, extentOfForestValidLink.html)
    await expect(NDPDomUtils.getCommentsValidationError(page)).not.toBeVisible({ timeout: 20000 })

    await NDPDomUtils.switchSection(page, {
      countryIso,
      sectionName: SectionNames.forestCharacteristics,
      year: seededYear,
    })
    await NDPDomUtils.fillComments(page, forestCharacteristicsValidLink.html)
    await expect(NDPDomUtils.getCommentsValidationError(page)).not.toBeVisible({ timeout: 20000 })
  })

  test('NC enters a valid link in the data source reference and sees no validation errors', async ({
    authenticatedPage,
    ndp,
  }) => {
    const page = authenticatedPage
    expect(ndp.id).toBeTruthy()

    await page.goto(ndp1aPath)
    await DOMUtils.ensureEditingUnlocked(page)

    await NDPDomUtils.fillDataSourcesV1Reference(page, referenceValidLink.html)
    await expect(NDPDomUtils.getDataSourcesV1ReferenceValidationError(page)).not.toBeVisible({ timeout: 20000 })
  })
})
