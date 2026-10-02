import { mergeTests } from '@playwright/test'

import { CycleNames } from 'meta/assessment/cycle/names'
import { TableNames } from 'meta/assessment/table'

import {
  x01ContactPersonsLatest,
  x01ContactPersonsLatestPath,
  x01PrintTablesLatestPath,
} from 'test/e2e/data/sectionTables'
import { test as countryTest } from 'test/e2e/fixtures/country'
import { expect, test as tableTest } from 'test/e2e/fixtures/table'
import { DOMUtils } from 'test/e2e/utils/dom'
import { TableDomUtils } from 'test/e2e/utils/table'

const test = mergeTests(tableTest, countryTest)

// The latest cycle also has the "This report was updated in" table, shown only to users that aren't logged in
const reportLastUpdate = 'reportLastUpdate'
// The expected year row and its column share this name, and so does the publication year column
const expectedYear = 'expectedYearForNextCountryReportUpdate'
const nextYear = String(new Date().getFullYear() + 1)

test.describe('Section tables: introduction latest - admin', () => {
  test.use({ tableSeeds: [x01ContactPersonsLatest] })

  test('Admin edits the expected year and sees no publication year', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    await page.goto(x01ContactPersonsLatestPath)
    await DOMUtils.ensureEditingUnlocked(page)

    const cellSaved = DOMUtils.waitForResponse(page, '/api/cycle-data/table/nodes', 'PATCH')
    await TableDomUtils.fillCell(page, expectedYear, expectedYear, nextYear)
    await cellSaved

    await page.reload()
    await TableDomUtils.expectCellValue(page, expectedYear, expectedYear, nextYear)
    await expect(TableDomUtils.tableContainer(page, reportLastUpdate)).toHaveCount(0)
  })
})

test.describe('Section tables: introduction latest - logged out', () => {
  test.use({ countrySeed: { countryIso: 'X01', cycleName: CycleNames.latest } })

  test('Logged out user sees the publication year and no expected year', async ({ publicPage, publishedCountry }) => {
    const page = publicPage
    const publicationYear = String(new Date(publishedCountry.lastInPublished).getFullYear())

    await page.goto(x01ContactPersonsLatestPath)

    const table = TableDomUtils.tableContainer(page, reportLastUpdate)
    await expect(table).toBeVisible({ timeout: 10000 })
    await TableDomUtils.expectCellValue(page, reportLastUpdate, expectedYear, publicationYear)
    // The year is calculated, so there's nothing to type into
    await expect(table.locator('input')).toHaveCount(0)
    await expect(TableDomUtils.tableContainer(page, TableNames.contactPersons)).toHaveCount(0)
  })
})

test.describe('Section tables: introduction latest - print view', () => {
  // The expected year has a value, so the table isn't left out of the print view for being empty
  test.use({
    tableSeeds: [
      { ...x01ContactPersonsLatest, values: [{ colName: expectedYear, value: nextYear, variableName: expectedYear }] },
    ],
  })

  test('Print view shows no expected year', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    await page.goto(x01PrintTablesLatestPath)
    // Table 1a comes after the introduction, so once it's there the introduction has been rendered
    await expect(TableDomUtils.tableContainer(page, TableNames.extentOfForest)).toBeVisible({ timeout: 20000 })

    await expect(TableDomUtils.tableContainer(page, TableNames.contactPersons)).toHaveCount(0)
  })
})
