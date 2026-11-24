import { type APIResponse, type Page } from '@playwright/test'

import { ApiEndPoint } from 'meta/api/endpoint'
import { type CountryIso } from 'meta/area/countryIso'
import { AssessmentNames } from 'meta/assessment/assessment'
import { CycleNames } from 'meta/assessment/cycle/names'
import { TableNames } from 'meta/assessment/table'
import { type RecordAssessmentData } from 'meta/data/recordData'
import { RecordAssessmentDatas } from 'meta/data/recordDatas'
import { RoleName } from 'meta/user/role/name'
import { Objects } from 'utils/objects'

import { expect, test } from 'test/e2e/fixtures/user'

const assessmentName = AssessmentNames.fra
// Everyone can view a published cycle, and latest isn't published
const cycleName = CycleNames.latest
// The fixtures have 1a data in latest for X01 only
const countryIso: CountryIso = 'X01'
// X04 has no country in latest, so only an admin can view it there
const otherCountryIso: CountryIso = 'X04'
const tableName = TableNames.extentOfForest

const _getTableData = async (page: Page, countryISOs: Array<CountryIso>): Promise<APIResponse> => {
  const params = new URLSearchParams({ assessmentName, cycleName })
  params.append('tableNames[]', tableName)
  countryISOs.forEach((iso) => params.append('countryISOs[]', iso))

  return page.request.get(`${ApiEndPoint.CycleData.Table.tableData()}?${params.toString()}`)
}

test.describe('Section tables: table data - permissions', () => {
  test.use({ userSeed: { assessmentName, countryIso, cycleName, role: RoleName.NATIONAL_CORRESPONDENT } })

  test('NC gets the table data of their country and is rejected when another country is added', async ({
    userPage,
  }) => {
    const page = userPage

    // Passes on the NC role, or on X01 being published while introduction.latest.spec.ts runs
    const ownCountryResponse = await _getTableData(page, [countryIso])
    expect(ownCountryResponse.ok(), await ownCountryResponse.text()).toBeTruthy()
    const data: RecordAssessmentData = await ownCountryResponse.json()
    const tableData = RecordAssessmentDatas.getTableData({ assessmentName, countryIso, cycleName, data, tableName })
    expect(Objects.isEmpty(tableData)).toBeFalsy()

    const bothCountriesResponse = await _getTableData(page, [countryIso, otherCountryIso])
    expect(bothCountriesResponse.ok()).toBeFalsy()
    const { error }: { error: string } = await bothCountriesResponse.json()
    expect(error).toBe('userNotAuthorized')
  })
})
