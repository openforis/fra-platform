import { expect, test } from '../fixtures/auth'
import { DOMUtils } from '../utils/dom'
import { NDPDomUtils } from '../utils/ndpDom'
import { TableDomUtils } from '../utils/table'
import { TooltipUtils } from '../utils/tooltip'
import {
  ndpClassName,
  ndpOdp1aUrlRegex,
  ndpOdp1bUrlRegex,
  ndpYear,
  x01ExtentOfForestPath,
} from './06-national-data-point.fixture'

// TODO: Validate links

test.describe.serial('National data point: ', () => {
  test('NC creates a national data point and sees it back on the table', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    await page.goto(x01ExtentOfForestPath)
    await DOMUtils.unlockEditing(page)

    await page.getByRole('link', { name: 'Add national data point' }).click()

    await NDPDomUtils.fillYear(page, ndpYear)
    await NDPDomUtils.fillDataSourceReference(page, 'https://example.com/e2e-reference')

    await NDPDomUtils.doneEditing(page)
    await expect(page).toHaveURL(/\/sections\/extentOfForest$/)

    await expect(page.locator('.table-grid__odp-link', { hasText: ndpYear })).toBeVisible({ timeout: 10000 })
  })

  test('NC edits the national data point with incorrect data and sees validation errors', async ({
    authenticatedPage,
  }) => {
    const page = authenticatedPage

    await page.goto(x01ExtentOfForestPath)
    await DOMUtils.unlockEditing(page)
    await TableDomUtils.clickOdpLink(page, ndpYear, ndpOdp1aUrlRegex)

    // ==== National classifications name
    await NDPDomUtils.createNewNationalClassification(page, ndpClassName)
    // Clear the name to create validation error
    await NDPDomUtils.editNationalClassification(page, '')
    await expect(page.locator('.data-cell.validation-error')).toBeVisible({ timeout: 10000 })
    await TooltipUtils.expectValidationTooltip(
      page,
      page.locator('.data-cell.validation-error'),
      'Value cannot be empty'
    )
    await NDPDomUtils.editNationalClassification(page, ndpClassName)
    await expect(page.locator('.data-cell.validation-error')).toHaveCount(0, { timeout: 10000 })

    // ==== National class area
    const areaCell = page.locator('td.fra-table__cell.fra-table__divider.validation-error')
    await expect(areaCell).toBeVisible({ timeout: 10000 })
    await TooltipUtils.expectValidationTooltip(page, areaCell, 'Value cannot be empty')
    await NDPDomUtils.fillNationalClassArea(page, ndpClassName, '1000')
    await expect(areaCell).toHaveCount(0, { timeout: 10000 })

    // ==== Validate sum (forest + owl > 100)
    await NDPDomUtils.fillNationalClassForestPercent(page, ndpClassName, '60')
    await NDPDomUtils.fillNationalClassOWLPercent(page, ndpClassName, '50') // totals to 110
    const percentageCell = page.locator('td.fra-table__cell.validation-error')
    await expect(percentageCell.first()).toBeVisible({ timeout: 10000 })
    await TooltipUtils.expectValidationTooltip(
      page,
      percentageCell.first(),
      `${ndpClassName} should be not greater than 100%`
    )
    await NDPDomUtils.fillNationalClassOWLPercent(page, ndpClassName, '30') // totals to 90
    await expect(percentageCell).toHaveCount(0, { timeout: 10000 })

    // === Renavigate to ODP to activate "Forest characteristics" -tab link
    await NDPDomUtils.doneEditing(page)
    await expect(page).toHaveURL(/\/sections\/extentOfForest$/)
    await TableDomUtils.clickOdpLink(page, ndpYear, ndpOdp1aUrlRegex)

    await NDPDomUtils.switchTab(page, '1b Forest characteristics', ndpOdp1bUrlRegex)

    // ==== Validate sum (natural + plantation + other planted > 100)
    await NDPDomUtils.fillNationalClassNaturalForestPercent(page, ndpClassName, '50')
    await NDPDomUtils.fillNationalClassPlantationForestPercent(page, ndpClassName, '30')
    await NDPDomUtils.fillNationalClassOtherPlantedForestPercent(page, ndpClassName, '10') // 90
    const forestCharsCell = page.locator('.fra-table:not(.odp__sub-table) td.fra-table__cell.validation-error')
    await expect(forestCharsCell.first()).toBeVisible({ timeout: 10000 })
    await TooltipUtils.expectValidationTooltip(
      page,
      forestCharsCell.first(),
      `${ndpClassName} sum must be equal to 100%`
    )
    await NDPDomUtils.fillNationalClassOtherPlantedForestPercent(page, ndpClassName, '20') // 100
    await expect(forestCharsCell).toHaveCount(0, { timeout: 10000 })

    // ==== Validate (plantation introduced > 100 )
    await NDPDomUtils.fillNationalClassPlantationIntroducedPercent(page, ndpClassName, '110')
    const plantationCell = page
      .locator('.fra-table.odp__sub-table')
      .nth(1)
      .locator('td.fra-table__cell.validation-error')
    await expect(plantationCell).toBeVisible({ timeout: 10000 })
    await TooltipUtils.expectValidationTooltip(page, plantationCell, `${ndpClassName} should be not greater than 100%`)
    await NDPDomUtils.fillNationalClassPlantationIntroducedPercent(page, ndpClassName, '50')
    await expect(plantationCell).toHaveCount(0, { timeout: 10000 })

    // ==== Validate (primary forest > 100 )
    await NDPDomUtils.fillNationalClassPrimaryForestPercent(page, ndpClassName, '110')
    const primaryForestCell = page
      .locator('.fra-table.odp__sub-table')
      .nth(0)
      .locator('td.fra-table__cell.validation-error')
    await expect(primaryForestCell).toBeVisible({ timeout: 10000 })
    await TooltipUtils.expectValidationTooltip(
      page,
      primaryForestCell,
      `${ndpClassName} should be not greater than 100%`
    )
    await NDPDomUtils.fillNationalClassPrimaryForestPercent(page, ndpClassName, '50')
    await expect(primaryForestCell).toHaveCount(0, { timeout: 10000 })

    // When clicking 'done' when on 1b tab, expect to be redirected to section 1b
    await NDPDomUtils.doneEditing(page)
    await expect(page).toHaveURL(/\/sections\/forestCharacteristics$/)
  })

  test('NC deletes the national data point', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    await page.goto(x01ExtentOfForestPath)
    await DOMUtils.unlockEditing(page)
    await TableDomUtils.clickOdpLink(page, ndpYear, ndpOdp1aUrlRegex)

    page.once('dialog', (dialog) => dialog.accept())
    await page.getByRole('button', { name: 'Delete' }).first().click()

    await expect(page).toHaveURL(/\/sections\/extentOfForest$/)
    await expect(page.locator('.table-grid__odp-link', { hasText: ndpYear })).toHaveCount(0, { timeout: 10000 })
  })
})
