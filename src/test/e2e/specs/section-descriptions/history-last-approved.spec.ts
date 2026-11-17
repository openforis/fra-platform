import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryStatus } from 'meta/area/countryStatus'
import { CycleNames } from 'meta/assessment/cycle/names'

import { CountryApi } from 'test/e2e/api/country'
import { DescriptionsApi } from 'test/e2e/api/descriptions'
import { autSpecificForestCategories, autSpecificForestCategoriesPath } from 'test/e2e/data/sectionDescriptions'
import { expect, test } from 'test/e2e/fixtures/country'
import { DescriptionUtils } from 'test/e2e/utils/description'
import { DOMUtils } from 'test/e2e/utils/dom'

const commentsTitle = 'Comments'
const approvedText = `Approved comments ${Date.now()}`
const editedText = `Edited comments ${Date.now()}`

const countrySeed = {
  countryIso: autSpecificForestCategories.countryIso,
  cycleName: CycleNames._2025,
  status: CountryStatus.editing,
}

test.describe('Section descriptions: history last approved', () => {
  test.use({ countrySeed })

  test.afterAll(async ({ browser }) => {
    await DescriptionsApi.clear(browser, autSpecificForestCategories)
  })

  test('Admin sees the accepted description as last approved and the later edit as a change', async ({
    authenticatedPage,
    country,
  }) => {
    const page = authenticatedPage
    expect(country.props.status).toBe(CountryStatus.editing)

    // == (last approved) base change for value
    await DescriptionsApi.setValue(page, autSpecificForestCategories, { text: approvedText })
    await CountryApi.setStatus(page, countrySeed, CountryStatus.accepted)
    // == (editing) value to compare to
    await CountryApi.setStatus(page, countrySeed, CountryStatus.editing)
    await DescriptionsApi.setValue(page, autSpecificForestCategories, { text: editedText })

    await page.goto(autSpecificForestCategoriesPath)

    const historyLoaded = DOMUtils.waitForResponse(page, ApiEndPoint.CycleData.Descriptions.history(), 'GET')
    await page.locator('.btn-history-last-approved').click()
    await historyLoaded

    // the diff compares the last approved text with the current one
    const description = DescriptionUtils.getDescriptionEditor(page, commentsTitle)
    await expect(description).toHaveClass(/diff-text/)
    await expect(description.locator('.removed')).toHaveText(approvedText)
    await expect(description.locator('.added')).toHaveText(editedText)
  })
})
