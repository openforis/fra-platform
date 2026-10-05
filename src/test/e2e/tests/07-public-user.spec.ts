import { expect, test } from '@playwright/test'

import { CountryIso } from 'meta/area/countryIso'
import { AssessmentNames } from 'meta/assessment/assessment'
import { CycleNames } from 'meta/assessment/cycle/names'
import { Routes } from 'meta/routes/routes'

const assessmentName = AssessmentNames.fra
const cycleName = CycleNames._2025
const countryIso: CountryIso = 'X01'

const countryHomeUrl = Routes.CountryHome.generatePath({ assessmentName, countryIso, cycleName })

test.describe('Public user (not logged in)', () => {
  test('can access a country overview page', async ({ page }) => {
    await page.goto(countryHomeUrl)

    await expect(page).toHaveURL(new RegExp(countryHomeUrl))
    await expect(page.locator('.nav-section__header').first()).toBeVisible()
    await expect(page.locator('.toast.error')).toHaveCount(0)
  })
})
