import { Locator, Page } from '@playwright/test'
import { enTranslation } from 'i18n/resources/en'

import { DescriptionsApi } from 'test/e2e/api/descriptions'
import { Timeouts } from 'test/e2e/config/timeouts'
import {
  x12CarbonStockClassification,
  x12CarbonStockEstimation,
  x12CarbonStockPath,
} from 'test/e2e/data/sectionDescriptions'
import { expect, test } from 'test/e2e/fixtures/auth'
import { DescriptionUtils } from 'test/e2e/utils/description'
import { DOMUtils } from 'test/e2e/utils/dom'
import { LinkBuilder } from 'test/e2e/utils/links'
import { NavigationUtils } from 'test/e2e/utils/navigation'
import { TooltipUtils } from 'test/e2e/utils/tooltip'

const estimationTitle = enTranslation.description.estimationAndForecasting
const classificationTitle = enTranslation.description.nationalClassificationAndDefinitions

const randomString = Date.now().toString()

const pasteLinks = async (page: Page, title: string, html: string): Promise<void> => {
  await DescriptionUtils.save(page, async () => {
    await DescriptionUtils.getDescriptionToggleEditButton(page, title, 'Edit').click()
    await DescriptionUtils.pasteIntoEditorWysiwyg(page, DescriptionUtils.getDescriptionEditor(page, title), html)
    await DescriptionUtils.getDescriptionToggleEditButton(page, title, 'Done').click()
  })
}

const expectLinkErrors = async (page: Page, error: Locator, emptyLinkText: string): Promise<void> => {
  await expect(error).toBeVisible({ timeout: Timeouts.extraLong })
  await TooltipUtils.expectValidationTooltip(page, error, `Invalid link: "${emptyLinkText}" (Empty)`)
}

test.describe.serial('Section descriptions: text links - fix and remove', () => {
  const estimationInvalidLinks = LinkBuilder.buildInvalidLinksHtml(`estimation-${randomString}`)
  const estimationValidLink = LinkBuilder.buildValidLinkHtml(`estimation-${randomString}`)
  const classificationInvalidLinks = LinkBuilder.buildInvalidLinksHtml(`classification-${randomString}`)
  const classificationPlainText = `classification without links ${randomString}`

  test.afterAll(async ({ browser }) => {
    await DescriptionsApi.clear(browser, x12CarbonStockEstimation)
    await DescriptionsApi.clear(browser, x12CarbonStockClassification)
  })

  test('NC pastes invalid links in two descriptions and sees both flagged', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    const summaryLoaded = NavigationUtils.waitForValidationSummary(page)
    await page.goto(x12CarbonStockPath)
    await summaryLoaded
    await DOMUtils.ensureEditingUnlocked(page)
    await NavigationUtils.subSectionHasError(page, x12CarbonStockPath, false)

    await pasteLinks(page, estimationTitle, estimationInvalidLinks.html)
    await pasteLinks(page, classificationTitle, classificationInvalidLinks.html)

    const estimationError = DescriptionUtils.getDescriptionValidationError(page, estimationTitle)
    const classificationError = DescriptionUtils.getDescriptionValidationError(page, classificationTitle)
    await expectLinkErrors(page, estimationError, estimationInvalidLinks.emptyLinkText)
    await expectLinkErrors(page, classificationError, classificationInvalidLinks.emptyLinkText)
    await NavigationUtils.subSectionHasError(page, x12CarbonStockPath, true)
  })

  test('NC fixes the links in one description and sees the other one stay flagged', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    const summaryLoaded = NavigationUtils.waitForValidationSummary(page)
    await page.goto(x12CarbonStockPath)
    await summaryLoaded
    await DOMUtils.ensureEditingUnlocked(page)

    const estimationError = DescriptionUtils.getDescriptionValidationError(page, estimationTitle)
    const classificationError = DescriptionUtils.getDescriptionValidationError(page, classificationTitle)
    await expect(estimationError).toBeVisible()

    await pasteLinks(page, estimationTitle, estimationValidLink.html)
    await expect(estimationError).not.toBeVisible({ timeout: Timeouts.extraLong })

    // Only the edited description gets its links checked again, so the other one still has its error
    await expect(classificationError).toBeVisible()
    await NavigationUtils.subSectionHasError(page, x12CarbonStockPath, true)
  })

  test('NC reloads the page and sees only the other description still invalid', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    const storedValidations = DescriptionsApi.waitForValidations(page)
    await page.goto(x12CarbonStockPath)
    const descriptionValidations = (await storedValidations)[x12CarbonStockEstimation.sectionName]?.descriptions

    expect(descriptionValidations?.estimationAndForecasting?.valid).toBe(true)
    expect(descriptionValidations?.nationalClassificationAndDefinitions?.valid).toBe(false)
  })

  test('NC removes the links from the other description and sees the warning go away', async ({
    authenticatedPage,
  }) => {
    const page = authenticatedPage

    const summaryLoaded = NavigationUtils.waitForValidationSummary(page)
    await page.goto(x12CarbonStockPath)
    await summaryLoaded
    await DOMUtils.ensureEditingUnlocked(page)

    const classificationError = DescriptionUtils.getDescriptionValidationError(page, classificationTitle)
    await expect(classificationError).toBeVisible()

    await DescriptionUtils.save(page, async () => {
      await DescriptionUtils.getDescriptionToggleEditButton(page, classificationTitle, 'Edit').click()
      const classificationEditor = DescriptionUtils.getDescriptionEditor(page, classificationTitle)
      await DescriptionUtils.fillEditorWysiwyg(page, classificationEditor, [classificationPlainText])
      await DescriptionUtils.getDescriptionToggleEditButton(page, classificationTitle, 'Done').click()
    })
    await expect(classificationError).not.toBeVisible({ timeout: Timeouts.extraLong })
    await NavigationUtils.subSectionHasError(page, x12CarbonStockPath, false)
  })

  test('NC reloads the page and sees both descriptions valid', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    const storedValidations = DescriptionsApi.waitForValidations(page)
    const summaryLoaded = NavigationUtils.waitForValidationSummary(page)
    await page.goto(x12CarbonStockPath)
    const descriptionValidations = (await storedValidations)[x12CarbonStockEstimation.sectionName]?.descriptions
    await summaryLoaded

    expect(descriptionValidations?.estimationAndForecasting?.valid).toBe(true)
    expect(descriptionValidations?.nationalClassificationAndDefinitions?.valid).toBe(true)
    await expect(DescriptionUtils.getDescriptionEditor(page, classificationTitle)).toContainText(
      classificationPlainText
    )
    await NavigationUtils.subSectionHasError(page, x12CarbonStockPath, false)
  })
})
