import { Locator, Page } from '@playwright/test'

import { AssessmentNames } from 'meta/assessment/assessment'
import { CycleNames } from 'meta/assessment/cycle/names'
import { Sockets } from 'meta/socket/sockets'
import { RoleName } from 'meta/user/role/name'

import { DescriptionsApi } from 'test/e2e/api/descriptions'
import { Timeouts } from 'test/e2e/config/timeouts'
import { x12GrowingStock, x12GrowingStockPath } from 'test/e2e/data/sectionDescriptions'
import { expect, test } from 'test/e2e/fixtures/user'
import { DescriptionUtils } from 'test/e2e/utils/description'
import { DOMUtils } from 'test/e2e/utils/dom'
import { SocketUtils } from 'test/e2e/utils/socket'

const assessmentName = AssessmentNames.fra
const cycleName = CycleNames._2025
const { countryIso } = x12GrowingStock
const descriptionUpdateEvent = Sockets.getDescriptionUpdateEvent({ assessmentName, countryIso, cycleName })

const commentsTitle = 'Comments'
const randomString = Date.now().toString()

const commentsEditor = (page: Page): Locator => DescriptionUtils.getDescriptionEditor(page, commentsTitle)
const commentsToggleEditButton = (page: Page, name: 'Done' | 'Edit'): Locator =>
  DescriptionUtils.getDescriptionToggleEditButton(page, commentsTitle, name)

test.describe('Section descriptions: comments - sync between clients', () => {
  test.use({ userSeed: { assessmentName, countryIso, cycleName, role: RoleName.NATIONAL_CORRESPONDENT } })

  test.afterAll(async ({ browser }) => {
    await DescriptionsApi.clear(browser, x12GrowingStock)
  })

  test('another client viewing the section sees the comments edits, and the NC gets them', async ({
    authenticatedPage: page,
    otherAuthenticatedPage: otherPage,
    user: nc,
  }) => {
    const ncPackets = SocketUtils.recordPackets(nc.page)

    await page.goto(x12GrowingStockPath)
    await DOMUtils.ensureEditingUnlocked(page)
    await otherPage.goto(x12GrowingStockPath)
    await DOMUtils.ensureEditingUnlocked(otherPage)
    await nc.page.goto(x12GrowingStockPath)
    await SocketUtils.waitForConnect(ncPackets)

    await DescriptionUtils.save(page, async () => {
      await commentsToggleEditButton(page, 'Edit').click()
      await DescriptionUtils.fillEditorWysiwyg(page, commentsEditor(page), [randomString])
      await commentsToggleEditButton(page, 'Done').click()
    })

    await expect(commentsEditor(otherPage)).toContainText(randomString, { timeout: Timeouts.medium })
    await expect.poll(() => ncPackets.eventNames).toContain(descriptionUpdateEvent)

    // ==== the editing client keeps its own edits
    await expect(commentsEditor(page)).toContainText(randomString)
  })
})
