import { SectionNames } from 'meta/assessment/section'
import { TableNames } from 'meta/assessment/table'

import { NdpApi } from 'test/e2e/api/ndp'
import { expect, test } from 'test/e2e/fixtures/ndp'
import { DOMUtils } from 'test/e2e/utils/dom'
import { LinkBuilder } from 'test/e2e/utils/links'
import { NDPDomUtils } from 'test/e2e/utils/ndpDom'
import { SectionUtils } from 'test/e2e/utils/section'

const countryIso = 'X03'
const seededYear = 2015
const ndp1aPath = SectionUtils.ndpPath({ countryIso, sectionName: SectionNames.extentOfForest, year: seededYear })
const ndp1bPath = SectionUtils.ndpPath({
  countryIso,
  sectionName: SectionNames.forestCharacteristics,
  year: seededYear,
})

const randomString = Date.now().toString()
const extentOfForestInvalidLinks = LinkBuilder.buildInvalidLinksHtml(`ndp-extent-of-forest-${randomString}`)
const extentOfForestValidLink = LinkBuilder.buildValidLinkHtml(`ndp-extent-of-forest-${randomString}`)
const forestCharacteristicsInvalidLinks = LinkBuilder.buildInvalidLinksHtml(
  `ndp-forest-characteristics-${randomString}`
)
const forestCharacteristicsValidLink = LinkBuilder.buildValidLinkHtml(`ndp-forest-characteristics-${randomString}`)
const referenceInvalidLinks = LinkBuilder.buildInvalidLinksHtml(`ndp-reference-${randomString}`)
const referenceValidLink = LinkBuilder.buildValidLinkHtml(`ndp-reference-${randomString}`)

test.describe('National data point: metadata - fix links', () => {
  test.use({ ndpSeeds: [{ countryIso, nationalClasses: [], year: seededYear }] })

  test('NC replaces invalid links in comments with valid ones and sees the errors clear', async ({
    authenticatedPage,
    ndp,
  }) => {
    const page = authenticatedPage
    expect(ndp.id).toBeTruthy()

    await page.goto(ndp1aPath)
    await DOMUtils.ensureEditingUnlocked(page)

    // ==== 1a comments: the links worker flags the invalid links, then clears them once replaced
    await NDPDomUtils.fillComments(page, extentOfForestInvalidLinks.html)
    const extentOfForestValidationError = NDPDomUtils.getCommentsValidationError(page)
    await expect(extentOfForestValidationError).toBeVisible({ timeout: 20000 })

    await NDPDomUtils.fillComments(page, extentOfForestValidLink.html)
    await expect(extentOfForestValidationError).not.toBeVisible({ timeout: 20000 })

    // ==== 1b comments: same clearing on the forestCharacteristics link field
    await NDPDomUtils.switchSection(page, {
      countryIso,
      sectionName: SectionNames.forestCharacteristics,
      year: seededYear,
    })
    await NDPDomUtils.fillComments(page, forestCharacteristicsInvalidLinks.html)
    const forestCharacteristicsValidationError = NDPDomUtils.getCommentsValidationError(page)
    await expect(forestCharacteristicsValidationError).toBeVisible({ timeout: 20000 })

    await NDPDomUtils.fillComments(page, forestCharacteristicsValidLink.html)
    await expect(forestCharacteristicsValidationError).not.toBeVisible({ timeout: 20000 })

    // ==== valid links aren't stored, so after a reload the fixed fields are missing from the stored validations
    let storedValidations = NdpApi.waitForValidations(page)
    await page.goto(ndp1aPath)
    expect((await storedValidations)[ndp.uuid]?.comments?.[TableNames.extentOfForest]).toBeUndefined()
    await expect(page.getByRole('link', { name: extentOfForestValidLink.text, exact: true })).toBeVisible()
    await expect(NDPDomUtils.getCommentsValidationError(page)).not.toBeVisible()

    storedValidations = NdpApi.waitForValidations(page)
    await page.goto(ndp1bPath)
    expect((await storedValidations)[ndp.uuid]?.comments?.[TableNames.forestCharacteristics]).toBeUndefined()
    await expect(page.getByRole('link', { name: forestCharacteristicsValidLink.text, exact: true })).toBeVisible()
    await expect(NDPDomUtils.getCommentsValidationError(page)).not.toBeVisible()
  })

  test('NC replaces invalid links in the data source reference with a valid one and sees the error clear', async ({
    authenticatedPage,
    ndp,
  }) => {
    const page = authenticatedPage
    expect(ndp.id).toBeTruthy()

    await page.goto(ndp1aPath)
    await DOMUtils.ensureEditingUnlocked(page)

    await NDPDomUtils.fillDataSourcesV1Reference(page, referenceInvalidLinks.html)
    const referenceValidationError = NDPDomUtils.getDataSourcesV1ReferenceValidationError(page)
    await expect(referenceValidationError).toBeVisible({ timeout: 20000 })

    await NDPDomUtils.fillDataSourcesV1Reference(page, referenceValidLink.html)
    await expect(referenceValidationError).not.toBeVisible({ timeout: 20000 })

    // ==== valid links aren't stored, so after a reload the fixed reference is missing from the stored validations
    const storedValidations = NdpApi.waitForValidations(page)
    await page.goto(ndp1aPath)
    expect((await storedValidations)[ndp.uuid]?.dataSourceReference).toBeUndefined()
    await expect(page.getByRole('link', { name: referenceValidLink.text, exact: true })).toBeVisible()
    await expect(NDPDomUtils.getDataSourcesV1ReferenceValidationError(page)).not.toBeVisible()
  })
})
