import { Page } from '@playwright/test'
import { enTranslation } from 'i18n/resources/en'

import { type DataSource, DataSourceNotApplicable } from 'meta/assessment/descriptionValue/dataSource'
import { UUIDs } from 'meta/uuid/uuids'

import { DescriptionsApi } from 'test/e2e/api/descriptions'
import { Timeouts } from 'test/e2e/config/timeouts'
import { x13AreaAffectedByFire, x13AreaAffectedByFirePath, x13PrintPath } from 'test/e2e/data/sectionDescriptions'
import { expect, test } from 'test/e2e/fixtures/auth'
import { DataSourceUtils } from 'test/e2e/utils/dataSource'
import { LinkBuilder } from 'test/e2e/utils/links'

const notApplicableLabel = enTranslation.dataSource.notApplicable

const randomString = Date.now().toString()

const expectNotApplicable = async (page: Page, reference: string, visible: boolean): Promise<void> => {
  const typeCell = await DataSourceUtils.getTypeCell(page, reference)
  const yearCell = await DataSourceUtils.getYearCell(page, reference)
  if (visible) {
    await expect(typeCell).toContainText(notApplicableLabel)
    await expect(yearCell).toContainText(notApplicableLabel)
    return
  }
  await expect(typeCell).not.toContainText(notApplicableLabel)
  await expect(yearCell).not.toContainText(notApplicableLabel)
}

test.describe('Section descriptions: data sources - not applicable', () => {
  const reference = LinkBuilder.buildValidLinkHtml(`data-source-not-applicable-${randomString}`)

  test.afterAll(async ({ browser }) => {
    await DescriptionsApi.clear(browser, x13AreaAffectedByFire)
  })

  test('NC sees not applicable type and year, public user and print view see them empty', async ({
    authenticatedPage,
    publicPage,
  }) => {
    const context = authenticatedPage.context()

    await test.step('NC sees not applicable in the type and year', async () => {
      const page = await context.newPage()

      const dataSource: DataSource = {
        comments: '',
        reference: reference.html,
        type: DataSourceNotApplicable,
        uuid: UUIDs.getUuid(),
        variables: ['total_land_area_affected_by_fire'],
        year: [DataSourceNotApplicable],
      }
      await DescriptionsApi.setValue(page, x13AreaAffectedByFire, { text: '', dataSources: [dataSource] })

      await page.goto(x13AreaAffectedByFirePath)
      await expectNotApplicable(page, reference.text, true)

      await page.close()
    })

    await test.step('Public user sees the type and year empty', async () => {
      await publicPage.goto(x13AreaAffectedByFirePath)
      await expectNotApplicable(publicPage, reference.text, false)
    })

    await test.step('NC opens the print view and sees the type and year empty', async () => {
      const page = await context.newPage()

      await page.goto(x13PrintPath)
      await expect(page.locator('.print__container')).toBeVisible({ timeout: Timeouts.extraLong })
      await expectNotApplicable(page, reference.text, false)

      await page.close()
    })
  })
})
