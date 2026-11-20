import { mergeTests } from '@playwright/test'

import { AssessmentNames } from 'meta/assessment/assessment'
import { CycleNames } from 'meta/assessment/cycle/names'
import { SectionNames } from 'meta/assessment/section'
import { Sockets } from 'meta/socket/sockets'
import { RoleName } from 'meta/user/role/name'

import { Timeouts } from 'test/e2e/config/timeouts'
import { NdpData } from 'test/e2e/data/ndp'
import { test as ndpTest } from 'test/e2e/fixtures/ndp'
import { expect, test as userTest } from 'test/e2e/fixtures/user'
import { DOMUtils } from 'test/e2e/utils/dom'
import { NDPDomUtils } from 'test/e2e/utils/ndpDom'
import { SectionUtils } from 'test/e2e/utils/section'
import { SocketUtils } from 'test/e2e/utils/socket'

const test = mergeTests(ndpTest, userTest)

const assessmentName = AssessmentNames.fra
const cycleName = CycleNames._2025
const countryIso = 'X02'
const year = 2003
const ndpPath = SectionUtils.ndpPath({ countryIso, sectionName: SectionNames.extentOfForest, year })
const ndp1bPath = SectionUtils.ndpPath({ countryIso, sectionName: SectionNames.forestCharacteristics, year })
const extentOfForestPath = SectionUtils.path({ countryIso, sectionName: SectionNames.extentOfForest })
const forestCharacteristicsPath = SectionUtils.path({ countryIso, sectionName: SectionNames.forestCharacteristics })

const renamedClass = 'Forest land'
const dataSourcesText = 'Synced data source reference'
const commentsText = 'Synced comment'

const nodeUpdatesEvent = Sockets.getNodeValuesUpdateEvent({ assessmentName, countryIso, cycleName })
const ndpValidationsUpdateEvent = Sockets.getNationalDataPointValidationsUpdateEvent({
  assessmentName,
  countryIso,
  cycleName,
})
const ndpValidationDeleteEvent = Sockets.getNationalDataPointValidationDeleteEvent({
  assessmentName,
  countryIso,
  cycleName,
})
const odpDeleteEvent = Sockets.getODPDeleteEvent({ assessmentName, countryIso, cycleName })
const reviewSummaryEvent = Sockets.getRequestReviewSummaryEvent({ assessmentName, countryIso, cycleName })

test.describe('National data point: sync between clients', () => {
  test.use({
    ndpSeeds: [[{ countryIso, nationalClasses: NdpData.getDefaultClasses(), year }], { scope: 'test' }],
    userSeed: { assessmentName, countryIso, cycleName, role: RoleName.NATIONAL_CORRESPONDENT },
  })

  test('another client viewing the NDP sees its edits, and the NC gets them', async ({
    authenticatedPage: page,
    ndp,
    otherAuthenticatedPage: otherPage,
    user: nc,
  }) => {
    expect(ndp.id).toBeTruthy()
    const ndpUpdateEvent = Sockets.getNationalDataPointUpdateEvent({ uuid: ndp.uuid })
    const ncPackets = SocketUtils.recordPackets(nc.page)

    await page.goto(ndpPath)
    await DOMUtils.ensureEditingUnlocked(page)
    await otherPage.goto(ndpPath)
    await DOMUtils.ensureEditingUnlocked(otherPage)
    await nc.page.goto(ndpPath)
    await SocketUtils.waitForConnect(ncPackets)

    // ==== national classes
    await NDPDomUtils.editNationalClassification(page, renamedClass)
    await expect(NDPDomUtils.getNationalClassNameInputs(otherPage).first()).toHaveValue(renamedClass, {
      timeout: Timeouts.medium,
    })

    // ==== original data
    await NDPDomUtils.fillNationalClassArea(page, renamedClass, '1234')
    await expect(NDPDomUtils.getNationalClassAreaCell(otherPage, renamedClass).locator('input')).toHaveValue(/1.?234/, {
      timeout: Timeouts.medium,
    })

    // ==== data sources
    await NDPDomUtils.fillDataSourcesV1Reference(page, `<p>${dataSourcesText}</p>`)
    await expect(otherPage.locator('.editor-wysiwyg-links').first()).toContainText(dataSourcesText, {
      timeout: Timeouts.medium,
    })

    // ==== comments
    await NDPDomUtils.fillComments(page, `<p>${commentsText}</p>`)
    await expect(otherPage.locator('.data-grid.odp__section.description')).toContainText(commentsText, {
      timeout: Timeouts.medium,
    })

    await expect.poll(() => ncPackets.eventNames).toContain(ndpUpdateEvent)
    await expect.poll(() => ncPackets.eventNames).toContain(ndpValidationsUpdateEvent)
    await expect.poll(() => ncPackets.eventNames).toContain(nodeUpdatesEvent)

    // ==== the editing client keeps its own edits
    await expect(NDPDomUtils.getNationalClassNameInputs(page).first()).toHaveValue(renamedClass)
    await expect(page.locator('.data-grid.odp__section.description')).toContainText(commentsText)
  })

  test('another client viewing the NDP is sent back to its section when the NDP is deleted, and the NC gets the delete', async ({
    authenticatedPage: page,
    ndp,
    otherAuthenticatedPage: otherPage,
    user: nc,
  }) => {
    expect(ndp.id).toBeTruthy()
    const ndpDeleteEvent = Sockets.getNationalDataPointDeleteEvent({ uuid: ndp.uuid })
    const ncPackets = SocketUtils.recordPackets(nc.page)

    await page.goto(ndpPath)
    await DOMUtils.ensureEditingUnlocked(page)
    // The other client is on the 1b tab, so it goes back to 1b
    await otherPage.goto(ndp1bPath)
    await DOMUtils.ensureEditingUnlocked(otherPage)
    await nc.page.goto(ndpPath)
    await SocketUtils.waitForConnect(ncPackets)

    await expect(NDPDomUtils.getNationalClassNameInputs(page).first()).toHaveValue('Forest')
    await expect(NDPDomUtils.getNationalClassNameInputs(otherPage).first()).toHaveValue('Forest')

    await NDPDomUtils.deleteNationalDataPoint(page)

    await expect(otherPage).toHaveURL(new RegExp(`${forestCharacteristicsPath}$`), { timeout: Timeouts.medium })
    await expect(otherPage.locator('.toast.error')).toContainText(`The national data point ${year} has been deleted`)

    await expect.poll(() => ncPackets.eventNames).toContain(ndpDeleteEvent)
    await expect.poll(() => ncPackets.eventNames).toContain(odpDeleteEvent)
    await expect.poll(() => ncPackets.eventNames).toContain(reviewSummaryEvent)
    await expect.poll(() => ncPackets.eventNames).toContain(ndpValidationDeleteEvent)

    // ==== the server skips the deleting client, so it gets no notice
    await expect(page).toHaveURL(new RegExp(`${extentOfForestPath}$`))
    await expect(page.locator('.toast.error')).toHaveCount(0)
  })
})
