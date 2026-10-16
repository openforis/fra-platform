import { mergeTests } from '@playwright/test'

import { ApiEndPoint } from 'meta/api/endpoint'
import { AssessmentNames } from 'meta/assessment/assessment'
import { CycleNames } from 'meta/assessment/cycle/names'
import { TableNames } from 'meta/assessment/table'
import { RoleName } from 'meta/user/role/name'

import { Timeouts } from 'test/e2e/config/timeouts'
import { x02ContactPersons, x02ContactPersonsPath } from 'test/e2e/data/sectionTables'
import { expect, test as tableTest } from 'test/e2e/fixtures/table'
import { test as userTest } from 'test/e2e/fixtures/user'
import { DOMUtils } from 'test/e2e/utils/dom'
import { TableDomUtils } from 'test/e2e/utils/table'

const test = mergeTests(tableTest, userTest)

const expectedYear = 'expectedYearForNextCountryReportUpdate'
const nextYear = String(new Date().getFullYear() + 1)

const nationalCorrespondent = {
  assessmentName: AssessmentNames.fra,
  cycleName: CycleNames._2025,
  role: RoleName.NATIONAL_CORRESPONDENT,
}

test.describe('Section tables: introduction 2025 - admin', () => {
  test.use({ tableSeeds: [x02ContactPersons] })

  test('Admin edits the expected year for the next update', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    await page.goto(x02ContactPersonsPath)
    await DOMUtils.ensureEditingUnlocked(page)

    const cellSaved = DOMUtils.waitForResponse(page, ApiEndPoint.CycleData.Table.nodes(), 'PATCH')
    await TableDomUtils.fillCell(page, expectedYear, expectedYear, nextYear)
    await cellSaved

    await page.reload()
    await TableDomUtils.expectCellValue(page, expectedYear, expectedYear, nextYear)
  })
})

test.describe('Section tables: introduction 2025 - national correspondent', () => {
  test.use({ userSeed: { ...nationalCorrespondent, countryIso: 'X02' } })

  test('NC of the country can edit the expected year', async ({ userPage }) => {
    const page = userPage

    await page.goto(x02ContactPersonsPath)
    await DOMUtils.ensureEditingUnlocked(page)

    await TableDomUtils.expectCellEditable(page, expectedYear, expectedYear)
  })
})

test.describe('Section tables: introduction 2025 - user of another country', () => {
  test.use({ userSeed: { ...nationalCorrespondent, countryIso: 'X03' } })

  test("NC of another country doesn't see the expected year", async ({ userPage }) => {
    const page = userPage

    // The tables only show up once their metadata is loaded
    const tablesLoaded = DOMUtils.waitForResponse(page, ApiEndPoint.MetaData.sectionsMetadata(), 'GET')
    await page.goto(x02ContactPersonsPath)
    await tablesLoaded

    await expect(page.locator('.section__contactPersons')).toBeVisible({ timeout: Timeouts.medium })
    await expect(TableDomUtils.tableContainer(page, TableNames.contactPersons)).toHaveCount(0)
  })
})

test.describe('Section tables: introduction 2025 - logged out', () => {
  test("Logged out user doesn't see the expected year", async ({ publicPage }) => {
    const page = publicPage

    // The tables only show up once their metadata is loaded
    const tablesLoaded = DOMUtils.waitForResponse(page, ApiEndPoint.MetaData.sectionsMetadata(), 'GET')
    await page.goto(x02ContactPersonsPath)
    await tablesLoaded

    await expect(page.locator('.section__contactPersons')).toBeVisible({ timeout: Timeouts.medium })
    await expect(TableDomUtils.tableContainer(page, TableNames.contactPersons)).toHaveCount(0)
  })
})
