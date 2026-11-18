import { enTranslation } from 'i18n/resources/en'

import { AssessmentNames } from 'meta/assessment/assessment'
import { CycleNames } from 'meta/assessment/cycle/names'
import { DataSourceType } from 'meta/assessment/description/dataSourceType'
import { type DataSource } from 'meta/assessment/descriptionValue/dataSource'
import { Sockets } from 'meta/socket/sockets'
import { RoleName } from 'meta/user/role/name'
import { UUIDs } from 'meta/uuid/uuids'

import { DescriptionsApi } from 'test/e2e/api/descriptions'
import { Timeouts } from 'test/e2e/config/timeouts'
import { x12GrowingStockDataSources, x12GrowingStockPath } from 'test/e2e/data/sectionDescriptions'
import { expect, test } from 'test/e2e/fixtures/user'
import { DataSourceUtils } from 'test/e2e/utils/dataSource'
import { DescriptionUtils } from 'test/e2e/utils/description'
import { DOMUtils } from 'test/e2e/utils/dom'
import { SocketUtils } from 'test/e2e/utils/socket'

const assessmentName = AssessmentNames.fra
const cycleName = CycleNames._2025
const { countryIso } = x12GrowingStockDataSources
const descriptionUpdateEvent = Sockets.getDescriptionUpdateEvent({ assessmentName, countryIso, cycleName })
const reviewSummaryEvent = Sockets.getRequestReviewSummaryEvent({ assessmentName, countryIso, cycleName })

const dataSourcesTitle = enTranslation.description.dataSourcesPlus

const randomString = Date.now().toString()

const buildDataSource = (reference: string): DataSource => ({
  comments: '',
  reference,
  type: DataSourceType.nationalForestInventory,
  uuid: UUIDs.getUuid(),
  variables: [],
  year: ['2020'],
})

test.describe('Section descriptions: data sources - sync between clients', () => {
  const keptReference = `data source sync kept ${randomString}`
  const deletedReference = `data source sync deleted ${randomString}`

  test.use({ userSeed: { assessmentName, countryIso, cycleName, role: RoleName.NATIONAL_CORRESPONDENT } })

  test.afterAll(async ({ browser }) => {
    await DescriptionsApi.clear(browser, x12GrowingStockDataSources)
  })

  test('another client viewing the section sees a data source deleted, and the NC gets the delete', async ({
    authenticatedPage: page,
    otherAuthenticatedPage: otherPage,
    user: nc,
  }) => {
    const dataSources = [buildDataSource(keptReference), buildDataSource(deletedReference)]
    await DescriptionsApi.setValue(page, x12GrowingStockDataSources, { text: '', dataSources })
    const ncPackets = SocketUtils.recordPackets(nc.page)

    await page.goto(x12GrowingStockPath)
    await DOMUtils.ensureEditingUnlocked(page)
    await otherPage.goto(x12GrowingStockPath)
    await DOMUtils.ensureEditingUnlocked(otherPage)
    await expect(DataSourceUtils.getTable(otherPage)).toContainText(deletedReference)
    await nc.page.goto(x12GrowingStockPath)
    await SocketUtils.waitForConnect(ncPackets)

    await DescriptionUtils.getDescriptionToggleEditButton(page, dataSourcesTitle, 'Edit').click()
    await DataSourceUtils.deleteRow(page, deletedReference)

    await expect(DataSourceUtils.getTable(otherPage)).not.toContainText(deletedReference, { timeout: Timeouts.medium })
    await expect(DataSourceUtils.getTable(otherPage)).toContainText(keptReference)
    await expect.poll(() => ncPackets.eventNames).toContain(descriptionUpdateEvent)
    await expect.poll(() => ncPackets.eventNames).toContain(reviewSummaryEvent)

    // ==== the deleting client keeps its own edits
    await expect(DataSourceUtils.getTable(page)).not.toContainText(deletedReference)
    await expect(DataSourceUtils.getTable(page)).toContainText(keptReference)
  })
})
