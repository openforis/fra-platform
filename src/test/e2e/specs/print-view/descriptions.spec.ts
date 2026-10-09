import { enTranslation } from 'i18n/resources/en'

import { DescriptionsApi } from 'test/e2e/api/descriptions'
import {
  x13HolderOfManagementRights,
  x13HolderOfManagementRightsComments,
  x13HolderOfManagementRightsPath,
  x13PrintPath,
} from 'test/e2e/data/sectionDescriptions'
import { expect, test } from 'test/e2e/fixtures/auth'
import { DataSourceUtils } from 'test/e2e/utils/dataSource'
import { DescriptionUtils } from 'test/e2e/utils/description'
import { DOMUtils } from 'test/e2e/utils/dom'
import { LinkBuilder } from 'test/e2e/utils/links'
import { NavigationUtils } from 'test/e2e/utils/navigation'

const commentsTitle = enTranslation.description.generalCommentsTitle
const dataSourcesTitle = enTranslation.description.dataSourcesPlus

const randomString = Date.now().toString()

const cellTimeout = 10_000
const linksTimeout = 20_000
const printTimeout = 20_000

test.describe.serial('Print view: descriptions - no validation UI', () => {
  const commentsInvalidLinks = LinkBuilder.buildInvalidLinksHtml(`print-comments-${randomString}`)
  const reference = LinkBuilder.buildValidLinkHtml(`print-data-source-${randomString}`)

  test.afterAll(async ({ browser }) => {
    await DescriptionsApi.clear(browser, x13HolderOfManagementRights)
    await DescriptionsApi.clear(browser, x13HolderOfManagementRightsComments)
  })

  test('NC adds invalid links to the comments and an incomplete data source and sees both errors', async ({
    authenticatedPage,
  }) => {
    const page = authenticatedPage

    const summaryLoaded = NavigationUtils.waitForValidationSummary(page)
    await page.goto(x13HolderOfManagementRightsPath)
    await summaryLoaded
    await DOMUtils.ensureEditingUnlocked(page)
    await NavigationUtils.subSectionHasError(page, x13HolderOfManagementRightsPath, false)

    await DescriptionUtils.save(page, async () => {
      await DescriptionUtils.getDescriptionToggleEditButton(page, commentsTitle, 'Edit').click()
      const commentsEditor = DescriptionUtils.getDescriptionEditor(page, commentsTitle)
      await DescriptionUtils.pasteIntoEditorWysiwyg(page, commentsEditor, commentsInvalidLinks.html)
      await DescriptionUtils.getDescriptionToggleEditButton(page, commentsTitle, 'Done').click()
    })

    await DescriptionUtils.getDescriptionToggleEditButton(page, dataSourcesTitle, 'Edit').click()
    await DescriptionUtils.save(page, async () => {
      const referenceEditor = await DataSourceUtils.addRow(page)
      await DescriptionUtils.pasteIntoEditorWysiwygLinksOnly(page, referenceEditor, reference.html)
    })

    const commentsError = DescriptionUtils.getDescriptionValidationError(page, commentsTitle)
    await expect(commentsError).toBeVisible({ timeout: linksTimeout })
    const typeCell = await DataSourceUtils.getTypeCell(page, reference.text)
    await expect(typeCell).toHaveClass(/validation-error/, { timeout: cellTimeout })
    await NavigationUtils.subSectionHasError(page, x13HolderOfManagementRightsPath, true)
  })

  test('NC opens the full report print view and sees the descriptions without their errors', async ({
    authenticatedPage,
  }) => {
    const page = authenticatedPage

    await page.goto(x13PrintPath)
    await expect(page.locator('.print__container')).toBeVisible({ timeout: printTimeout })

    // The report shows every section, so the checks stay inside the one that has the errors
    const section = page.locator(`.section__${x13HolderOfManagementRights.sectionName}`)
    await expect(section).toContainText(commentsInvalidLinks.emptyLinkText, { timeout: printTimeout })
    await expect(section).toContainText(reference.text)
    await expect(section.locator('.validation-error')).toHaveCount(0)
  })
})
