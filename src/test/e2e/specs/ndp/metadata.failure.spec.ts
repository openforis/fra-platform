import { SectionNames } from 'meta/assessment/section'

import { Timeouts } from 'test/e2e/config/timeouts'
import { expect, test } from 'test/e2e/fixtures/ndp'
import { DOMUtils } from 'test/e2e/utils/dom'
import { LinkBuilder } from 'test/e2e/utils/links'
import { NavigationUtils } from 'test/e2e/utils/navigation'
import { NDPDomUtils } from 'test/e2e/utils/ndpDom'
import { SectionUtils } from 'test/e2e/utils/section'
import { TooltipUtils } from 'test/e2e/utils/tooltip'

const countryIso = 'X20'
const extentOfForestPath = SectionUtils.path({ countryIso, sectionName: SectionNames.extentOfForest })
const forestCharacteristicsPath = SectionUtils.path({
  countryIso,
  sectionName: SectionNames.forestCharacteristics,
})

const seededYear = 2015
const ndp1aPath = SectionUtils.ndpPath({ countryIso, sectionName: SectionNames.extentOfForest, year: seededYear })
const ndp1bPath = SectionUtils.ndpPath({
  countryIso,
  sectionName: SectionNames.forestCharacteristics,
  year: seededYear,
})

const randomString = Date.now().toString()
const extentOfForestInvalidLinks = LinkBuilder.buildInvalidLinksHtml(`ndp-extent-of-forest-${randomString}`)
const forestCharacteristicsInvalidLinks = LinkBuilder.buildInvalidLinksHtml(
  `ndp-forest-characteristics-${randomString}`
)
const referenceInvalidLinks = LinkBuilder.buildInvalidLinksHtml(`ndp-reference-${randomString}`)

test.describe('National data point: metadata - failure', () => {
  test.use({ ndpSeeds: [{ countryIso, nationalClasses: [], year: seededYear }] })

  test('NC enters invalid links in the 1a comments and sees validation errors', async ({ authenticatedPage, ndp }) => {
    const page = authenticatedPage
    expect(ndp.id).toBeTruthy()

    await page.goto(ndp1aPath)
    await DOMUtils.ensureEditingUnlocked(page)

    // links worker flags the empty and the broken link
    await NDPDomUtils.fillComments(page, extentOfForestInvalidLinks.html)

    const extentOfForestValidationError = NDPDomUtils.getCommentsValidationError(page)
    await expect(extentOfForestValidationError).toBeVisible({ timeout: Timeouts.extraLong })
    await TooltipUtils.expectValidationTooltip(
      page,
      extentOfForestValidationError,
      `Invalid link: "${extentOfForestInvalidLinks.emptyLinkText}" (Empty)`
    )
    await TooltipUtils.expectValidationTooltip(
      page,
      extentOfForestValidationError,
      `Invalid link: "${extentOfForestInvalidLinks.brokenLinkDisplayUrl}" (DNS error)`
    )

    // A comment link error only flags its own section
    await expect(NDPDomUtils.getSectionTabErrorIndicator(page, '1a')).toBeVisible()
    await expect(NDPDomUtils.getSectionTabErrorIndicator(page, '1b')).toHaveCount(0)
    await NavigationUtils.subSectionHasError(page, extentOfForestPath, true)
    await NavigationUtils.subSectionHasError(page, forestCharacteristicsPath, false)
  })

  test('NC enters invalid links in the 1b comments and sees validation errors', async ({ authenticatedPage, ndp }) => {
    const page = authenticatedPage
    expect(ndp.id).toBeTruthy()

    await page.goto(ndp1bPath)
    await DOMUtils.ensureEditingUnlocked(page)

    await NDPDomUtils.fillComments(page, forestCharacteristicsInvalidLinks.html)

    const forestCharacteristicsValidationError = NDPDomUtils.getCommentsValidationError(page)
    await expect(forestCharacteristicsValidationError).toBeVisible({ timeout: Timeouts.extraLong })
    await TooltipUtils.expectValidationTooltip(
      page,
      forestCharacteristicsValidationError,
      `Invalid link: "${forestCharacteristicsInvalidLinks.emptyLinkText}" (Empty)`
    )
    await TooltipUtils.expectValidationTooltip(
      page,
      forestCharacteristicsValidationError,
      `Invalid link: "${forestCharacteristicsInvalidLinks.brokenLinkDisplayUrl}" (DNS error)`
    )

    // A comment link error only flags its own section
    await expect(NDPDomUtils.getSectionTabErrorIndicator(page, '1b')).toBeVisible()
    await expect(NDPDomUtils.getSectionTabErrorIndicator(page, '1a')).toHaveCount(0)
    await NavigationUtils.subSectionHasError(page, forestCharacteristicsPath, true)
    await NavigationUtils.subSectionHasError(page, extentOfForestPath, false)
  })

  test('NC enters invalid links in the data source reference and sees validation errors', async ({
    authenticatedPage,
    ndp,
  }) => {
    const page = authenticatedPage
    expect(ndp.id).toBeTruthy()

    await page.goto(ndp1aPath)
    await DOMUtils.ensureEditingUnlocked(page)

    await NDPDomUtils.fillDataSourcesV1Reference(page, referenceInvalidLinks.html)

    const referenceValidationError = NDPDomUtils.getDataSourcesV1ReferenceValidationError(page)
    await expect(referenceValidationError).toBeVisible({ timeout: Timeouts.extraLong })
    await TooltipUtils.expectValidationTooltip(
      page,
      referenceValidationError,
      `Invalid link: "${referenceInvalidLinks.emptyLinkText}" (Empty)`
    )
    await TooltipUtils.expectValidationTooltip(
      page,
      referenceValidationError,
      `Invalid link: "${referenceInvalidLinks.brokenLinkDisplayUrl}" (DNS error)`
    )

    // The data source is shared by both sections, so a reference link error flags 1a and 1b
    await expect(NDPDomUtils.getSectionTabErrorIndicator(page, '1a')).toBeVisible()
    await expect(NDPDomUtils.getSectionTabErrorIndicator(page, '1b')).toBeVisible()
    await NavigationUtils.subSectionHasError(page, extentOfForestPath, true)
    await NavigationUtils.subSectionHasError(page, forestCharacteristicsPath, true)
  })
})
