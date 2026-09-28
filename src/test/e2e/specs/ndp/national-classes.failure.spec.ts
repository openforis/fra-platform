import { ODPNationalClassFactory } from 'meta/assessment/originalDataPoint'
import { SectionNames } from 'meta/assessment/section'

import { NdpApi } from 'test/e2e/api/ndp'
import { expect, test } from 'test/e2e/fixtures/ndp'
import { DOMUtils } from 'test/e2e/utils/dom'
import { NavigationUtils } from 'test/e2e/utils/navigation'
import { NDPDomUtils } from 'test/e2e/utils/ndpDom'
import { SectionUtils } from 'test/e2e/utils/section'
import { TooltipUtils } from 'test/e2e/utils/tooltip'

const countryIso = 'X13'
const extentOfForestPath = SectionUtils.path({ countryIso, sectionName: SectionNames.extentOfForest })
const forestCharacteristicsPath = SectionUtils.path({
  countryIso,
  sectionName: SectionNames.forestCharacteristics,
})

const seededYear = 2015
const ndp1aPath = SectionUtils.ndpPath({ countryIso, sectionName: SectionNames.extentOfForest, year: seededYear })

const classA = { ...ODPNationalClassFactory.newNationalClass({ name: 'Class A' }), area: '100' }
const classB = { ...ODPNationalClassFactory.newNationalClass({ name: 'Class B' }), area: '200' }
const classC = { ...ODPNationalClassFactory.newNationalClass({ name: 'Class C' }), area: '300' }

test.describe('National data point: national classes - failure', () => {
  test.use({ ndpSeeds: [{ countryIso, nationalClasses: [classA, classB, classC], year: seededYear }] })

  test('NC clears one class name and sees only that row marked, then deletes the class and the error clears', async ({
    authenticatedPage,
    ndp,
  }) => {
    const page = authenticatedPage
    expect(ndp.id).toBeTruthy()

    await page.goto(ndp1aPath)
    await DOMUtils.ensureEditingUnlocked(page)

    await NDPDomUtils.editNationalClassification(page, '', 1)

    const nameCells = page.locator('.data-cell.validation-error')
    await expect(nameCells).toHaveCount(1, { timeout: 10000 })
    await expect(nameCells.locator('input')).toHaveValue('')
    await TooltipUtils.expectValidationTooltip(page, nameCells, 'Value cannot be empty')

    await NavigationUtils.subSectionHasError(page, extentOfForestPath, true)
    await NavigationUtils.subSectionHasError(page, forestCharacteristicsPath, true)

    await NDPDomUtils.deleteNationalClass(page, 1)

    const nameInputs = NDPDomUtils.getNationalClassNameInputs(page)
    await expect(nameInputs.nth(0)).toHaveValue('Class A')
    await expect(nameInputs.nth(1)).toHaveValue('Class C')
    await expect(nameCells).toHaveCount(0, { timeout: 10000 })

    await NavigationUtils.subSectionHasError(page, extentOfForestPath, false)
    await NavigationUtils.subSectionHasError(page, forestCharacteristicsPath, false)

    // ==== with every class valid again, nothing is stored for the classes
    const storedValidations = NdpApi.waitForValidations(page)
    await page.goto(ndp1aPath)
    expect((await storedValidations)[ndp.uuid]?.nationalClasses).toBeUndefined()
    await expect(nameCells).toHaveCount(0)
  })

  test('NC deletes one of two invalid classes and the other keeps its error until its name is restored', async ({
    authenticatedPage,
    ndp,
  }) => {
    const page = authenticatedPage
    expect(ndp.id).toBeTruthy()

    await page.goto(ndp1aPath)
    await DOMUtils.ensureEditingUnlocked(page)

    await NDPDomUtils.editNationalClassification(page, '', 1)
    await NDPDomUtils.editNationalClassification(page, '', 2)

    const nameCells = page.locator('.data-cell.validation-error')
    await expect(nameCells).toHaveCount(2, { timeout: 10000 })

    await NDPDomUtils.deleteNationalClass(page, 1)

    // ==== Class C moved up one row and is still the one marked
    const nameInputs = NDPDomUtils.getNationalClassNameInputs(page)
    await expect(nameInputs.nth(0)).toHaveValue('Class A')
    await expect(nameInputs.nth(1)).toHaveValue('')
    await expect(nameCells).toHaveCount(1, { timeout: 10000 })
    await expect(nameCells.locator('input')).toHaveValue('')

    // ==== the stored errors are keyed by class uuid, so only Class C is left after the reload
    const storedValidations = NdpApi.waitForValidations(page)
    await page.goto(ndp1aPath)
    expect(Object.keys((await storedValidations)[ndp.uuid]?.nationalClasses ?? {})).toEqual([classC.uuid])
    await expect(nameCells).toHaveCount(1)

    await DOMUtils.ensureEditingUnlocked(page)
    await NDPDomUtils.editNationalClassification(page, 'Class C', 1)
    await expect(nameCells).toHaveCount(0, { timeout: 10000 })

    await NavigationUtils.subSectionHasError(page, extentOfForestPath, false)
    await NavigationUtils.subSectionHasError(page, forestCharacteristicsPath, false)
  })
})
