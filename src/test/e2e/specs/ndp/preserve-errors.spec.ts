import { SectionNames } from 'meta/assessment/section'
import { TableNames } from 'meta/assessment/table'

import { NdpApi } from 'test/e2e/api/ndp'
import { Timeouts } from 'test/e2e/config/timeouts'
import { expect, test } from 'test/e2e/fixtures/ndp'
import { DOMUtils } from 'test/e2e/utils/dom'
import { LinkBuilder } from 'test/e2e/utils/links'
import { NavigationUtils } from 'test/e2e/utils/navigation'
import { NDPDomUtils } from 'test/e2e/utils/ndpDom'
import { SectionUtils } from 'test/e2e/utils/section'

const countryIso = 'X12'
const extentOfForestPath = SectionUtils.path({ countryIso, sectionName: SectionNames.extentOfForest })

const seededYear = 2015
const ndp1aPath = SectionUtils.ndpPath({ countryIso, sectionName: SectionNames.extentOfForest, year: seededYear })
const className = 'Forest land'

const randomString = Date.now().toString()
const invalidLinks = LinkBuilder.buildInvalidLinksHtml(`ndp-preserve-${randomString}`)
const validLink = LinkBuilder.buildValidLinkHtml(`ndp-preserve-${randomString}`)

// The links worker and the class validator write to the same stored record, so each error must survive the other's fix
test.describe('National data point: preserve errors', () => {
  test.use({ ndpSeeds: [{ countryIso, nationalClasses: [], year: seededYear }] })

  test('NC fixes the area and the invalid link error stays until the link is fixed', async ({
    authenticatedPage,
    ndp,
  }) => {
    const page = authenticatedPage
    expect(ndp.id).toBeTruthy()

    await page.goto(ndp1aPath)
    await DOMUtils.ensureEditingUnlocked(page)

    // ==== a class without area and invalid links in the comments put two errors on 1a
    await NDPDomUtils.createNewNationalClassification(page, className)
    const areaCell = page.locator('td.fra-table__cell.fra-table__divider.validation-error')
    await expect(areaCell).toBeVisible({ timeout: Timeouts.medium })

    await NDPDomUtils.fillComments(page, invalidLinks.html)
    const commentsValidationError = NDPDomUtils.getCommentsValidationError(page)
    await expect(commentsValidationError).toBeVisible({ timeout: Timeouts.extraLong })
    await NavigationUtils.subSectionHasError(page, extentOfForestPath, true)

    // ==== fixing the area leaves the link error in place
    await NDPDomUtils.fillNationalClassArea(page, className, '1000')
    await expect(areaCell).toHaveCount(0, { timeout: Timeouts.medium })
    await expect(commentsValidationError).toBeVisible()
    await NavigationUtils.subSectionHasError(page, extentOfForestPath, true)

    let storedValidations = NdpApi.waitForValidations(page)
    await page.goto(ndp1aPath)
    let storedValidation = (await storedValidations)[ndp.uuid]
    expect(storedValidation?.comments?.[TableNames.extentOfForest]?.valid).toBe(false)
    expect(storedValidation?.nationalClasses).toBeUndefined()
    await expect(commentsValidationError).toBeVisible()
    await expect(areaCell).toHaveCount(0)

    // ==== fixing the link clears the point
    await DOMUtils.ensureEditingUnlocked(page)
    await NDPDomUtils.fillComments(page, validLink.html)
    await expect(commentsValidationError).not.toBeVisible({ timeout: Timeouts.extraLong })
    await NavigationUtils.subSectionHasError(page, extentOfForestPath, false)

    storedValidations = NdpApi.waitForValidations(page)
    await page.goto(ndp1aPath)
    storedValidation = (await storedValidations)[ndp.uuid]
    expect(storedValidation?.comments?.[TableNames.extentOfForest]).toBeUndefined()
    expect(storedValidation?.nationalClasses).toBeUndefined()
  })

  test('NC fixes the invalid link and the area error stays until the area is filled', async ({
    authenticatedPage,
    ndp,
  }) => {
    const page = authenticatedPage
    expect(ndp.id).toBeTruthy()

    await page.goto(ndp1aPath)
    await DOMUtils.ensureEditingUnlocked(page)

    // ==== a class without area and invalid links in the comments put two errors on 1a
    await NDPDomUtils.createNewNationalClassification(page, className)
    const areaCell = page.locator('td.fra-table__cell.fra-table__divider.validation-error')
    await expect(areaCell).toBeVisible({ timeout: Timeouts.medium })

    await NDPDomUtils.fillComments(page, invalidLinks.html)
    const commentsValidationError = NDPDomUtils.getCommentsValidationError(page)
    await expect(commentsValidationError).toBeVisible({ timeout: Timeouts.extraLong })
    await NavigationUtils.subSectionHasError(page, extentOfForestPath, true)

    // ==== fixing the link leaves the area error in place
    await NDPDomUtils.fillComments(page, validLink.html)
    await expect(commentsValidationError).not.toBeVisible({ timeout: Timeouts.extraLong })
    await expect(areaCell).toBeVisible()
    await NavigationUtils.subSectionHasError(page, extentOfForestPath, true)

    let storedValidations = NdpApi.waitForValidations(page)
    await page.goto(ndp1aPath)
    let storedValidation = (await storedValidations)[ndp.uuid]
    expect(storedValidation?.comments?.[TableNames.extentOfForest]).toBeUndefined()
    expect(Object.values(storedValidation?.nationalClasses ?? {})[0]?.area?.valid).toBe(false)
    await expect(areaCell).toBeVisible()
    await expect(commentsValidationError).not.toBeVisible()

    // ==== filling the area clears the point
    await DOMUtils.ensureEditingUnlocked(page)
    await NDPDomUtils.fillNationalClassArea(page, className, '1000')
    await expect(areaCell).toHaveCount(0, { timeout: Timeouts.medium })
    await NavigationUtils.subSectionHasError(page, extentOfForestPath, false)

    storedValidations = NdpApi.waitForValidations(page)
    await page.goto(ndp1aPath)
    storedValidation = (await storedValidations)[ndp.uuid]
    expect(storedValidation?.comments?.[TableNames.extentOfForest]).toBeUndefined()
    expect(storedValidation?.nationalClasses).toBeUndefined()
  })
})
