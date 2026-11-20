import { enTranslation } from 'i18n/resources/en'

import { DescriptionsApi } from 'test/e2e/api/descriptions'
import { Timeouts } from 'test/e2e/config/timeouts'
import {
  x06Disturbances,
  x06DisturbancesPath,
  x06ForestOwnership,
  x06ForestOwnershipPath,
} from 'test/e2e/data/sectionDescriptions'
import { expect, test } from 'test/e2e/fixtures/auth'
import { DataSourceUtils } from 'test/e2e/utils/dataSource'
import { DescriptionUtils } from 'test/e2e/utils/description'
import { DOMUtils } from 'test/e2e/utils/dom'
import { LinkBuilder } from 'test/e2e/utils/links'
import { LinksStatusUtils } from 'test/e2e/utils/linksStatus'

const commentsTitle = enTranslation.description.generalCommentsTitle
const dataSourcesTitle = enTranslation.description.dataSourcesPlus
const editLabel = enTranslation.description.edit
const doneLabel = enTranslation.description.done
const linksStatusPath = LinksStatusUtils.path(x06ForestOwnership.countryIso)

const randomString = Date.now().toString()

test.describe('Links status: locations - open in the report', () => {
  const commentsInvalidLinks = LinkBuilder.buildInvalidLinksHtml(`links-status-comments-${randomString}`)
  const commentsValidLink = LinkBuilder.buildValidLinkHtml(`links-status-comments-${randomString}`)
  const referenceInvalidLinks = LinkBuilder.buildInvalidLinksHtml(`links-status-reference-${randomString}`)
  const referenceValidLink = LinkBuilder.buildValidLinkHtml(`links-status-reference-${randomString}`)

  test.afterAll(async ({ browser }) => {
    await DescriptionsApi.clear(browser, x06ForestOwnership)
    await DescriptionsApi.clear(browser, x06Disturbances)
  })

  test('Admin opens a comments link from the links status and sees it focused in the comments', async ({
    authenticatedPage,
  }) => {
    const page = authenticatedPage

    await page.goto(x06ForestOwnershipPath)
    await DOMUtils.ensureEditingUnlocked(page)

    const commentsHtml = `${commentsInvalidLinks.html}<br>${commentsValidLink.html}`
    await DescriptionUtils.save(page, async () => {
      await DescriptionUtils.getDescriptionToggleEditButton(page, commentsTitle, editLabel).click()
      await DescriptionUtils.pasteIntoEditorWysiwyg(
        page,
        DescriptionUtils.getDescriptionEditor(page, commentsTitle),
        commentsHtml
      )
      await DescriptionUtils.getDescriptionToggleEditButton(page, commentsTitle, doneLabel).click()
    })
    await expect(DescriptionUtils.getDescriptionValidationError(page, commentsTitle)).toBeVisible({
      timeout: Timeouts.extraLong,
    })

    await page.goto(linksStatusPath)
    const sectionPage = await LinksStatusUtils.openLocation(page, commentsInvalidLinks.brokenLinkDisplayUrl)

    await expect
      .poll(() => DescriptionUtils.getFocusedLinks(sectionPage))
      .toEqual([commentsInvalidLinks.brokenLinkText])
    const focusedLink = sectionPage.getByRole('link', { name: commentsInvalidLinks.brokenLinkText, exact: true })
    await expect(focusedLink).toBeInViewport()
    // Pages open at the top, so if this one is scrolled down, the app scrolled to the link
    await expect.poll(() => sectionPage.locator('#main').evaluate((main) => main.scrollTop)).toBeGreaterThan(0)
  })

  test('Admin opens a data source reference link from the links status and sees it focused in the reference', async ({
    authenticatedPage,
  }) => {
    const page = authenticatedPage

    await page.goto(x06DisturbancesPath)
    await DOMUtils.ensureEditingUnlocked(page)

    await DescriptionUtils.getDescriptionToggleEditButton(page, dataSourcesTitle, editLabel).click()
    const referenceHtml = `${referenceInvalidLinks.html}<br>${referenceValidLink.html}`
    await DescriptionUtils.save(page, async () => {
      const referenceEditor = await DataSourceUtils.addRow(page)
      await DescriptionUtils.pasteIntoEditorWysiwygLinksOnly(page, referenceEditor, referenceHtml)
    })
    await expect
      .poll(() => DescriptionUtils.getHighlightedInvalidLinks(page), { timeout: Timeouts.extraLong })
      .toEqual([referenceInvalidLinks.emptyLinkText, referenceInvalidLinks.brokenLinkText])

    await page.goto(linksStatusPath)
    const sectionPage = await LinksStatusUtils.openLocation(page, referenceInvalidLinks.brokenLinkDisplayUrl)

    await expect
      .poll(() => DescriptionUtils.getFocusedLinks(sectionPage))
      .toEqual([referenceInvalidLinks.brokenLinkText])
    const focusedLink = sectionPage.getByRole('link', { name: referenceInvalidLinks.brokenLinkText, exact: true })
    await expect(focusedLink).toBeInViewport()
  })
})
