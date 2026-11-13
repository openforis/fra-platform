import { mergeTests } from '@playwright/test'
import { enTranslation } from 'i18n/resources/en'

import { ApiEndPoint } from 'meta/api/endpoint'
import { AssessmentNames } from 'meta/assessment/assessment'
import { CycleNames } from 'meta/assessment/cycle/names'
import { TableNames } from 'meta/assessment/table'
import { Routes } from 'meta/routes/routes'
import { Sockets } from 'meta/socket/sockets'
import { RoleName } from 'meta/user/role/name'

import { InviteApi } from 'test/e2e/api/invite'
import { Timeouts } from 'test/e2e/config/timeouts'
import { x12ForestAreaChange, x12ForestAreaChangePath } from 'test/e2e/data/sectionTables'
import { test as tableTest } from 'test/e2e/fixtures/table'
import { expect, test as userTest } from 'test/e2e/fixtures/user'
import { AuthUtils } from 'test/e2e/utils/Auth'
import { DOMUtils } from 'test/e2e/utils/dom'
import { SocketUtils } from 'test/e2e/utils/socket'
import { TableDomUtils } from 'test/e2e/utils/table'
import { UserUtils } from 'test/e2e/utils/User'

const test = mergeTests(tableTest, userTest)

const assessmentName = AssessmentNames.fra
const cycleName = CycleNames._2025
const { countryIso } = x12ForestAreaChange
const otherCountryIso = 'X13'
const otherCountryHomePath = Routes.CountryHome.generatePath({ assessmentName, countryIso: otherCountryIso, cycleName })
const loginPath = Routes.Login.generatePath({ assessmentName, cycleName })
const nodeUpdatesEvent = Sockets.getNodeValuesUpdateEvent({ assessmentName, countryIso, cycleName })
const tableValidationsUpdateEvent = Sockets.getTableValidationsUpdateEvent({ assessmentName, countryIso, cycleName })
const countryUpdateEvent = Sockets.getCountryUpdateEvent({ assessmentName, countryIso, cycleName })

const variableName = 'forest_expansion'
const colName = '2020-2025'
const value = '123'
const displayedValue = '123.00'
const otherValue = '456'
const otherDisplayedValue = '456.00'

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
    await expect.poll(() => ncPackets.eventNames).toContain(tableValidationsUpdateEvent)
    await expect.poll(() => ncPackets.eventNames).toContain(countryUpdateEvent)

    // The NC already has the update, so the others would have it by now if it were sent to them
    expect(otherCountryNcPackets.eventNames).not.toContain(nodeUpdatesEvent)
    expect(otherCountryNcPackets.eventNames).not.toContain(tableValidationsUpdateEvent)
    expect(otherCountryNcPackets.eventNames).not.toContain(countryUpdateEvent)
    expect(loggedOutPackets.eventNames).not.toContain(nodeUpdatesEvent)
    expect(loggedOutPackets.eventNames).not.toContain(tableValidationsUpdateEvent)
    expect(loggedOutPackets.eventNames).not.toContain(countryUpdateEvent)

    // ==== the editing client keeps its own edits
    await TableDomUtils.expectCellValue(page, variableName, colName, displayedValue)
  })

  test('Logged out user logs in as the NC and gets the next edit without reloading, then logs out and gets no more edits', async ({
    authenticatedPage: page,
    publicPage: loginPage,
    user: nc,
  }) => {
    const ncPackets = SocketUtils.recordPackets(nc.page)
    const loggedOutPackets = SocketUtils.recordPackets(loginPage)

    await page.goto(x12ForestAreaChangePath)
    await expect(TableDomUtils.tableContainer(page, TableNames.forestAreaChange)).toBeVisible({
      timeout: Timeouts.extraLong,
    })
    await DOMUtils.ensureEditingUnlocked(page)
    await nc.page.goto(x12ForestAreaChangePath)
    await expect(TableDomUtils.tableContainer(nc.page, TableNames.forestAreaChange)).toBeVisible({
      timeout: Timeouts.extraLong,
    })
    await SocketUtils.waitForConnect(ncPackets)
    await loginPage.goto(loginPath)
    await SocketUtils.waitForConnect(loggedOutPackets)

    await test.step('Logged out user logs in as the NC and gets the next edit without reloading', async () => {
      // A new recorder, so waitForConnect waits for the reconnect after the login
      const loggedInPackets = SocketUtils.recordPackets(loginPage)
      await loginPage.fill('input[name="email"]', nc.email)
      await AuthUtils.fillLoginForm(loginPage, nc.password)
      await SocketUtils.waitForConnect(loggedInPackets)

      const cellSaved = DOMUtils.waitForResponse(page, ApiEndPoint.CycleData.Table.nodes(), 'PATCH')
      await TableDomUtils.fillCell(page, variableName, colName, value)
      await cellSaved

      await expect.poll(() => loggedInPackets.eventNames).toContain(nodeUpdatesEvent)
    })

    await test.step('NC logs out and gets no more edits', async () => {
      const loggedOutAgainPackets = SocketUtils.recordPackets(loginPage)
      await loginPage.locator('.app-header__menu-item', { hasText: nc.fullName }).click()
      await loginPage.getByRole('button', { name: enTranslation.header.logout, exact: true }).click()
      await SocketUtils.waitForConnect(loggedOutAgainPackets)

      const cellSaved = DOMUtils.waitForResponse(page, ApiEndPoint.CycleData.Table.nodes(), 'PATCH')
      await TableDomUtils.fillCell(page, variableName, colName, otherValue)
      await cellSaved

      await TableDomUtils.expectCellValue(nc.page, variableName, colName, otherDisplayedValue)
      // The NC's other page already has the edit, so this page would have it by now if it were sent to it
      expect(loggedOutAgainPackets.eventNames).not.toContain(nodeUpdatesEvent)
    })
  })

  test('Logged out user registers from an invitation, accepts it and gets the next edit without reloading', async ({
    authenticatedPage: page,
    publicPage: invitedPage,
  }) => {
    const testUser = UserUtils.createTestUser(enTranslation.user.roles[RoleName.VIEWER])
    const invitationPath = await InviteApi.create(page, {
      assessmentName,
      countryIso,
      cycleName,
      role: RoleName.VIEWER,
      testUser,
    })
    const loggedOutPackets = SocketUtils.recordPackets(invitedPage)

    await page.goto(x12ForestAreaChangePath)
    await expect(TableDomUtils.tableContainer(page, TableNames.forestAreaChange)).toBeVisible({
      timeout: Timeouts.extraLong,
    })
    await DOMUtils.ensureEditingUnlocked(page)
    await invitedPage.goto(invitationPath)
    await SocketUtils.waitForConnect(loggedOutPackets)

    const registeredPackets = SocketUtils.recordPackets(invitedPage)
    await AuthUtils.fillRegisterForm(invitedPage, testUser.password)
    await SocketUtils.waitForConnect(registeredPackets)

    const acceptedPackets = SocketUtils.recordPackets(invitedPage)
    await invitedPage.getByRole('button', { name: enTranslation.login.acceptInvitation, exact: true }).click()
    await SocketUtils.waitForConnect(acceptedPackets)

    const cellSaved = DOMUtils.waitForResponse(page, ApiEndPoint.CycleData.Table.nodes(), 'PATCH')
    await TableDomUtils.fillCell(page, variableName, colName, value)
    await cellSaved

    await expect.poll(() => acceptedPackets.eventNames).toContain(nodeUpdatesEvent)
  })
})
