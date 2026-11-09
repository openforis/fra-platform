import { mergeTests } from '@playwright/test'

import { ApiEndPoint } from 'meta/api/endpoint'
import { AssessmentNames } from 'meta/assessment/assessment'
import { CycleNames } from 'meta/assessment/cycle/names'
import { TableNames } from 'meta/assessment/table'
import { Routes } from 'meta/routes/routes'
import { Sockets } from 'meta/socket/sockets'
import { RoleName } from 'meta/user/role/name'

import { Timeouts } from 'test/e2e/config/timeouts'
import { x12ForestAreaChange, x12ForestAreaChangePath } from 'test/e2e/data/sectionTables'
import { test as tableTest } from 'test/e2e/fixtures/table'
import { expect, test as userTest } from 'test/e2e/fixtures/user'
import { DOMUtils } from 'test/e2e/utils/dom'
import { SocketUtils } from 'test/e2e/utils/socket'
import { TableDomUtils } from 'test/e2e/utils/table'

const test = mergeTests(tableTest, userTest)

const assessmentName = AssessmentNames.fra
const cycleName = CycleNames._2025
const { countryIso } = x12ForestAreaChange
const otherCountryIso = 'X13'
const otherCountryHomePath = Routes.CountryHome.generatePath({ assessmentName, countryIso: otherCountryIso, cycleName })
const nodeUpdatesEvent = Sockets.getNodeValuesUpdateEvent({ assessmentName, countryIso, cycleName })

const variableName = 'forest_expansion'
const colName = '2020-2025'
const value = '123'
const displayedValue = '123.00'

test.describe('Section tables: sync between clients', () => {
  test.use({
    tableSeeds: [x12ForestAreaChange],
    userSeed: { assessmentName, countryIso, cycleName, role: RoleName.NATIONAL_CORRESPONDENT },
    otherUserSeed: { assessmentName, countryIso: otherCountryIso, cycleName, role: RoleName.NATIONAL_CORRESPONDENT },
  })

  test('Admin edits a cell and another admin and the NC see it, while an NC of another country and a logged out user get nothing', async ({
    authenticatedPage: page,
    otherAuthenticatedPage: otherPage,
    otherUser: otherCountryNc,
    publicPage: loggedOutPage,
    user: nc,
  }) => {
    const otherPackets = SocketUtils.recordPackets(otherPage)
    const ncPackets = SocketUtils.recordPackets(nc.page)
    const otherCountryNcPackets = SocketUtils.recordPackets(otherCountryNc.page)
    const loggedOutPackets = SocketUtils.recordPackets(loggedOutPage)

    await page.goto(x12ForestAreaChangePath)
    await expect(TableDomUtils.tableContainer(page, TableNames.forestAreaChange)).toBeVisible({
      timeout: Timeouts.extraLong,
    })
    await DOMUtils.ensureEditingUnlocked(page)
    await otherPage.goto(x12ForestAreaChangePath)
    await expect(TableDomUtils.tableContainer(otherPage, TableNames.forestAreaChange)).toBeVisible({
      timeout: Timeouts.extraLong,
    })
    await DOMUtils.ensureEditingUnlocked(otherPage)
    await SocketUtils.waitForConnect(otherPackets)
    await nc.page.goto(x12ForestAreaChangePath)
    await expect(TableDomUtils.tableContainer(nc.page, TableNames.forestAreaChange)).toBeVisible({
      timeout: Timeouts.extraLong,
    })
    await SocketUtils.waitForConnect(ncPackets)
    await otherCountryNc.page.goto(otherCountryHomePath)
    await SocketUtils.waitForConnect(otherCountryNcPackets)
    await loggedOutPage.goto(Routes.Root.path.absolute)
    await SocketUtils.waitForConnect(loggedOutPackets)

    const cellSaved = DOMUtils.waitForResponse(page, ApiEndPoint.CycleData.Table.nodes(), 'PATCH')
    await TableDomUtils.fillCell(page, variableName, colName, value)
    await cellSaved

    await TableDomUtils.expectCellValue(otherPage, variableName, colName, displayedValue)
    await TableDomUtils.expectCellValue(nc.page, variableName, colName, displayedValue)
    await expect.poll(() => ncPackets.eventNames).toContain(nodeUpdatesEvent)

    // The NC already has the update, so the others would have it by now if it were sent to them
    expect(otherCountryNcPackets.eventNames).not.toContain(nodeUpdatesEvent)
    expect(loggedOutPackets.eventNames).not.toContain(nodeUpdatesEvent)

    // ==== the editing client keeps its own edits
    await TableDomUtils.expectCellValue(page, variableName, colName, displayedValue)
  })
})
