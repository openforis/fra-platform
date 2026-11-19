import { Locator, Page, Response } from '@playwright/test'
import { enTranslation } from 'i18n/resources/en'

import { ApiEndPoint } from 'meta/api/endpoint'

import { DescriptionsApi } from 'test/e2e/api/descriptions'
import { x12HolderOfManagementRights, x12HolderOfManagementRightsPath } from 'test/e2e/data/sectionDescriptions'
import { expect, test } from 'test/e2e/fixtures/auth'
import { DescriptionUtils } from 'test/e2e/utils/description'
import { DOMUtils } from 'test/e2e/utils/dom'
import { LinkBuilder } from 'test/e2e/utils/links'

const commentsTitle = enTranslation.description.generalCommentsTitle
const editLabel = enTranslation.description.edit
const doneLabel = enTranslation.description.done
const randomString = Date.now().toString()
const newUrl = 'https://example.org'

const commentsEditor = (page: Page): Locator => DescriptionUtils.getDescriptionEditor(page, commentsTitle)
const commentsToggleEditButton = (page: Page, label: string): Locator =>
  DescriptionUtils.getDescriptionToggleEditButton(page, commentsTitle, label)

const waitForSavedUrl = (page: Page, url: string): Promise<Response> =>
  page.waitForResponse((response) => {
    const request = response.request()
    const descriptionSaved =
      response.url().includes(ApiEndPoint.CycleData.Descriptions.many()) && request.method() === 'PUT'
    const savedUrl = request.postData()?.includes(url) === true

    return descriptionSaved && savedUrl
  })

const expectOneLink = async (page: Page, url: string): Promise<void> => {
  const links = commentsEditor(page).locator('a')
  await expect(links).toHaveCount(1)
  await expect(links).toHaveAttribute('href', url)
}

test.describe('Section descriptions: text links - edit link', () => {
  const link = LinkBuilder.buildValidLinkHtml(`edit-link-${randomString}`)
  // The & makes the editor rewrite its content when the link form takes the focus, which is what used to add a second link
  const html = `Forests &amp; land ${link.html}`

  test.afterAll(async ({ browser }) => {
    await DescriptionsApi.clear(browser, x12HolderOfManagementRights)
  })

  test('NC changes the URL of a link and sees one link with the new URL, also after reloading the page', async ({
    authenticatedPage,
  }) => {
    const page = authenticatedPage

    await page.goto(x12HolderOfManagementRightsPath)
    await DOMUtils.ensureEditingUnlocked(page)

    await DescriptionUtils.save(page, async () => {
      await commentsToggleEditButton(page, editLabel).click()
      await DescriptionUtils.pasteIntoEditorWysiwyg(page, commentsEditor(page), html)
      await commentsToggleEditButton(page, doneLabel).click()
    })

    await commentsToggleEditButton(page, editLabel).click()
    await commentsEditor(page).locator('a', { hasText: link.text }).click()
    await page.locator('.jodit-popup .jodit-toolbar-button_link button').click()
    await page.locator('.jodit-popup input[data-ref="url_input"]').fill(newUrl)

    // Opening the link form saves the text too, so wait for the save that has the new URL
    const urlSaved = waitForSavedUrl(page, newUrl)
    await page.locator('.jodit-popup button[data-ref="insert"]').click()
    await commentsEditor(page).blur()
    await commentsToggleEditButton(page, doneLabel).click()
    await urlSaved

    await expectOneLink(page, newUrl)
    await page.reload()
    await expectOneLink(page, newUrl)
  })
})
