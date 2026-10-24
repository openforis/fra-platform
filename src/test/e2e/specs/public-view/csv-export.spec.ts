import { expect, test } from '@playwright/test'

import { type CountryIso } from 'meta/area/countryIso'

import { SectionUtils } from 'test/e2e/utils/section'

const countryIso: CountryIso = 'X03'

const growingStockPath = SectionUtils.path({ countryIso, sectionName: 'growingStock' })

test.describe('Public view: CSV export', () => {
  test('a public (not logged in) user can export via a single table button and via "CSV All Tables"', async ({
    page,
  }) => {
    await page.goto(growingStockPath)

    // 'csv' download button
    const csvLink = page.locator('.btn-csv-download').first()
    await expect(csvLink).toBeVisible()
    await expect(csvLink).not.toHaveClass(/disabled/)

    const downloadPromise = page.waitForEvent('download')
    await csvLink.click()
    const download = await downloadPromise
    expect(download.suggestedFilename()).toMatch(/\.csv$/)

    // 'csv all tables' download button
    const allTablesButton = page.getByRole('button', { name: 'CSV All Tables' })
    await expect(allTablesButton).toBeVisible()

    const allDownloadsPromise = Promise.all([page.waitForEvent('download'), page.waitForEvent('download')])
    await allTablesButton.click()
    const allDownloads = await allDownloadsPromise
    allDownloads.forEach((d) => expect(d.suggestedFilename()).toMatch(/\.csv$/))

    await expect(page.locator('.toast.error')).toHaveCount(0)
  })
})
