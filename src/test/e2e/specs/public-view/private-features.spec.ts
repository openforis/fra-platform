import { expect, test } from '@playwright/test'

import { type CountryIso } from 'meta/area/countryIso'
import { AssessmentNames } from 'meta/assessment/assessment'
import { CycleNames } from 'meta/assessment/cycle/names'
import { Routes } from 'meta/routes/routes'

const countryIso: CountryIso = 'X03'
const assessmentName = AssessmentNames.fra
const cycleName = CycleNames._2025
const homePath = Routes.CountryHome.generatePath({ assessmentName, countryIso, cycleName })

test.describe('Public view: private features are not available', () => {
  test('a public (not logged in) user cannot reach Admin or the lock control from the header', async ({ page }) => {
    await page.goto(homePath)

    // show navigation
    await expect(page.locator('.nav-section__header').first()).toBeVisible()
    // show login
    await expect(page.getByRole('link', { name: 'Reserved area' })).toBeVisible()
    // show last published date
    await expect(page.locator('.toolbar__published_date')).toBeVisible()
    // dont show toolbar-editor options wrapper (wrapper for lock, country status change, github)
    await expect(page.locator('.toolbar-editor')).toHaveCount(0)
    // dont show lock
    await expect(page.locator('.btn-lock')).toHaveCount(0)

    // dont show country home tabs
    await expect(page.locator('.country-header__tabs')).toHaveCount(0)

    await expect(page.locator('.toast.error')).toHaveCount(0)
  })
})
