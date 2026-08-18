import { SectionNames } from 'meta/assessment/section'

import { expect, test } from 'test/e2e/fixtures/ndp'
import { DOMUtils } from 'test/e2e/utils/dom'
import { LinkBuilder } from 'test/e2e/utils/links'
import { NDPDomUtils } from 'test/e2e/utils/ndpDom'
import { SectionUtils } from 'test/e2e/utils/section'
import { TableDomUtils } from 'test/e2e/utils/table'
import { TooltipUtils } from 'test/e2e/utils/tooltip'

const countryIso = 'X20'
const extentOfForestPath = SectionUtils.path({ countryIso, sectionName: SectionNames.extentOfForest })

const seededYear = 2015
const url1aRegex = new RegExp(`/originalDataPoints/${seededYear}/extentOfForest$`)
const url1bRegex = new RegExp(`/originalDataPoints/${seededYear}/forestCharacteristics$`)

const randomString = Date.now().toString()
const extentOfForestInvalidLinks = LinkBuilder.buildInvalidLinksHtml(`ndp-extent-of-forest-${randomString}`)
const forestCharacteristicsInvalidLinks = LinkBuilder.buildInvalidLinksHtml(
  `ndp-forest-characteristics-${randomString}`
)
const referenceInvalidLinks = LinkBuilder.buildInvalidLinksHtml(`ndp-reference-${randomString}`)

test.describe('National data point: metadata - failure', () => {
  test.use({ ndpSeeds: [{ countryIso, nationalClasses: [], year: seededYear }] })

  test('NC enters invalid links in comments and sees validation errors', async ({ authenticatedPage, ndp }) => {
    const page = authenticatedPage
    expect(ndp.id).toBeTruthy()

    await page.goto(extentOfForestPath)
    await DOMUtils.ensureEditingUnlocked(page)
    await TableDomUtils.clickOdpLink(page, String(seededYear), url1aRegex)

    //  links worker flags the empty and the broken link
    // ==== 1a comments
    await NDPDomUtils.fillComments(page, extentOfForestInvalidLinks.html)

    const extentOfForestValidationError = NDPDomUtils.getCommentsValidationError(page)
    await expect(extentOfForestValidationError).toBeVisible({ timeout: 20000 })
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

    // ==== 1b comments: same flagging on the forestCharacteristics link field
    await NDPDomUtils.switchTab(page, '1b Forest characteristics', url1bRegex)
    await NDPDomUtils.fillComments(page, forestCharacteristicsInvalidLinks.html)

    const forestCharacteristicsValidationError = NDPDomUtils.getCommentsValidationError(page)
    await expect(forestCharacteristicsValidationError).toBeVisible({ timeout: 20000 })
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
  })

  test('NC enters invalid links in the data source reference and sees validation errors', async ({
    authenticatedPage,
    ndp,
  }) => {
    const page = authenticatedPage
    expect(ndp.id).toBeTruthy()

    await page.goto(extentOfForestPath)
    await DOMUtils.ensureEditingUnlocked(page)
    await TableDomUtils.clickOdpLink(page, String(seededYear), url1aRegex)

    await NDPDomUtils.fillDataSourcesV1Reference(page, referenceInvalidLinks.html)

    const referenceValidationError = NDPDomUtils.getDataSourcesV1ReferenceValidationError(page)
    await expect(referenceValidationError).toBeVisible({ timeout: 20000 })
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
  })
})
