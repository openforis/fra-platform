import { mergeTests } from '@playwright/test'

import { AssessmentNames } from 'meta/assessment/assessment'
import { CycleNames } from 'meta/assessment/cycle/names'
import { SectionNames } from 'meta/assessment/section'
import { TableNames } from 'meta/assessment/table'
import { RoleName } from 'meta/user/role/name'

import { NdpApi } from 'test/e2e/api/ndp'
import { Timeouts } from 'test/e2e/config/timeouts'
import { expect, test as ndpTest } from 'test/e2e/fixtures/ndp'
import { test as userTest } from 'test/e2e/fixtures/user'
import { DescriptionUtils } from 'test/e2e/utils/description'
import { DOMUtils } from 'test/e2e/utils/dom'
import { LinkBuilder } from 'test/e2e/utils/links'
import { LinksStatusUtils } from 'test/e2e/utils/linksStatus'
import { NavigationUtils } from 'test/e2e/utils/navigation'
import { NDPDomUtils } from 'test/e2e/utils/ndpDom'
import { SectionUtils } from 'test/e2e/utils/section'
import { TooltipUtils } from 'test/e2e/utils/tooltip'

const test = mergeTests(ndpTest, userTest)

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
const linksStatusInvalidLinks = LinkBuilder.buildInvalidLinksHtml(`ndp-links-status-${randomString}`)

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
      extentOfForestValidationError.locator('a', { hasText: extentOfForestInvalidLinks.emptyLinkText }),
      extentOfForestInvalidLinks.emptyLinkError
    )
    // The link sits inside the editor, so an editor tooltip would show up here too
    await TooltipUtils.expectNoValidationTooltip(page, extentOfForestInvalidLinks.brokenLinkError)
    await TooltipUtils.expectValidationTooltip(
      page,
      extentOfForestValidationError.locator('a', { hasText: extentOfForestInvalidLinks.brokenLinkText }),
      extentOfForestInvalidLinks.brokenLinkError
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
      forestCharacteristicsValidationError.locator('a', { hasText: forestCharacteristicsInvalidLinks.emptyLinkText }),
      forestCharacteristicsInvalidLinks.emptyLinkError
    )
    // The link sits inside the editor, so an editor tooltip would show up here too
    await TooltipUtils.expectNoValidationTooltip(page, forestCharacteristicsInvalidLinks.brokenLinkError)
    await TooltipUtils.expectValidationTooltip(
      page,
      forestCharacteristicsValidationError.locator('a', { hasText: forestCharacteristicsInvalidLinks.brokenLinkText }),
      forestCharacteristicsInvalidLinks.brokenLinkError
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
      referenceValidationError.locator('a', { hasText: referenceInvalidLinks.emptyLinkText }),
      referenceInvalidLinks.emptyLinkError
    )
    // The link sits inside the editor, so an editor tooltip would show up here too
    await TooltipUtils.expectNoValidationTooltip(page, referenceInvalidLinks.brokenLinkError)
    await TooltipUtils.expectValidationTooltip(
      page,
      referenceValidationError.locator('a', { hasText: referenceInvalidLinks.brokenLinkText }),
      referenceInvalidLinks.brokenLinkError
    )

    // The data source is shared by both sections, so a reference link error flags 1a and 1b
    await expect(NDPDomUtils.getSectionTabErrorIndicator(page, '1a')).toBeVisible()
    await expect(NDPDomUtils.getSectionTabErrorIndicator(page, '1b')).toBeVisible()
    await NavigationUtils.subSectionHasError(page, extentOfForestPath, true)
    await NavigationUtils.subSectionHasError(page, forestCharacteristicsPath, true)
  })

  test('Admin opens a 1a comments link from the links status and sees it focused in the comments', async ({
    authenticatedPage,
    ndp,
  }) => {
    const page = authenticatedPage
    expect(ndp.id).toBeTruthy()

    await page.goto(ndp1aPath)
    await DOMUtils.ensureEditingUnlocked(page)

    await NDPDomUtils.fillComments(page, linksStatusInvalidLinks.html)
    await expect(NDPDomUtils.getCommentsValidationError(page)).toBeVisible({ timeout: Timeouts.extraLong })

    await page.goto(LinksStatusUtils.path(countryIso))
    const ndpPage = await LinksStatusUtils.openLocation(page, linksStatusInvalidLinks.brokenLinkDisplayUrl)

    await expect.poll(() => DescriptionUtils.getFocusedLinks(ndpPage)).toEqual([linksStatusInvalidLinks.brokenLinkText])
    const focusedLink = ndpPage.getByRole('link', { name: linksStatusInvalidLinks.brokenLinkText, exact: true })
    await expect(focusedLink).toBeInViewport()
    // Pages open at the top, so if this one is scrolled down, the app scrolled to the link
    await expect.poll(() => ndpPage.locator('#main').evaluate((main) => main.scrollTop)).toBeGreaterThan(0)
  })
})

test.describe('National data point: metadata - failure for a collaborator', () => {
  test.use({
    ndpSeeds: [{ countryIso, nationalClasses: [], year: seededYear }],
    userSeed: {
      assessmentName: AssessmentNames.fra,
      countryIso,
      cycleName: CycleNames._2025,
      permissions: { descriptions: ['all'], tableData: ['none'] },
      role: RoleName.COLLABORATOR,
    },
  })

  test('Collaborator who can only edit descriptions opens an NDP and sees the comments error', async ({
    authenticatedPage,
    ndp,
    userPage,
  }) => {
    const adminPage = authenticatedPage
    const collaboratorPage = userPage

    await adminPage.goto(ndp1aPath)
    await DOMUtils.ensureEditingUnlocked(adminPage)
    await NDPDomUtils.fillComments(adminPage, extentOfForestInvalidLinks.html)
    // The error shows for the admin once the links worker has stored it
    await expect(NDPDomUtils.getCommentsValidationError(adminPage)).toBeVisible({ timeout: Timeouts.extraLong })

    const validationsResponse = NdpApi.waitForValidations(collaboratorPage)
    await collaboratorPage.goto(ndp1aPath)
    const validations = await validationsResponse

    expect(validations[ndp.uuid]?.comments?.[TableNames.extentOfForest]?.valid).toBe(false)
    await expect(NDPDomUtils.getCommentsValidationError(collaboratorPage)).toBeVisible()
    await expect(collaboratorPage.locator('.toast.error')).toHaveCount(0)
  })
})
