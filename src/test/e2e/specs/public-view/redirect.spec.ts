import { expect, test } from '@playwright/test'

import { type CountryIso } from 'meta/area/countryIso'
import { AssessmentNames } from 'meta/assessment/assessment'
import { CycleNames } from 'meta/assessment/cycle/names'
import { SectionNames } from 'meta/assessment/section'
import { Routes } from 'meta/routes/routes'

import { SectionUtils } from 'test/e2e/utils/section'

const countryIso: CountryIso = 'X01'
const assessmentName = AssessmentNames.fra
const cycleName = CycleNames._2025
const defaultCyclePath = Routes.Cycle.generatePath({ assessmentName, cycleName })

test.describe('Public view: redirects for unreachable URLs', () => {
  test('an unknown path redirects to the default assessment cycle page', async ({ page }) => {
    await page.goto('/this-page-doesnt-exist')

    await expect(page).toHaveURL(new RegExp(`${defaultCyclePath}$`))
    await expect(page.locator('.toast.error')).toHaveCount(0)
  })

  test('an unknown cycleName redirects to the default assessment cycle page', async ({ page }) => {
    const path = SectionUtils.path({
      countryIso,
      cycleName: 'foobar' as CycleNames,
      sectionName: SectionNames.extentOfForest,
    })

    await page.goto(path)

    await expect(page).toHaveURL(new RegExp(`${defaultCyclePath}$`))
    await expect(page.locator('.toast.error')).toHaveCount(0)
  })

  test('an unpublished (draft) cycleName "latest" redirects to the country\'s last published cycle', async ({
    page,
  }) => {
    const path = SectionUtils.path({
      countryIso,
      cycleName: CycleNames.latest,
      sectionName: SectionNames.extentOfForest,
    })

    await page.goto(path)

    // Atlantis countries last published data is in 2020 so expected redirect there
    await expect(page).toHaveURL(/\/assessments\/fra\/2020\/X01\/home/)

    await expect(page.locator('.toast.error')).toHaveCount(2)
  })

  test('an admin-only route redirects a public (not logged in) user to the default assessment cycle page', async ({
    page,
  }) => {
    const path = Routes.Admin.generatePath({ assessmentName, cycleName })

    await page.goto(path)

    await expect(page).toHaveURL(new RegExp(`${defaultCyclePath}$`))
    await expect(page.locator('.toast.error')).toHaveCount(0)
  })
})
