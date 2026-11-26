import { Locator, Page } from '@playwright/test'

import { DescriptionsApi } from 'test/e2e/api/descriptions'
import { Timeouts } from 'test/e2e/config/timeouts'
import { x13SpecificForestCategories, x13SpecificForestCategoriesPath } from 'test/e2e/data/sectionDescriptions'
import { expect, test } from 'test/e2e/fixtures/auth'
import { DataSourceUtils } from 'test/e2e/utils/dataSource'
import { DescriptionUtils } from 'test/e2e/utils/description'
import { DOMUtils } from 'test/e2e/utils/dom'
import { LinkBuilder } from 'test/e2e/utils/links'
import { NavigationUtils } from 'test/e2e/utils/navigation'

const dataSourcesTitle = 'Data sources + type of data source eg NFI, etc'

const randomString = Date.now().toString()

const dataSourcesToggleEditButton = (page: Page, name: 'Done' | 'Edit'): Locator =>
  DescriptionUtils.getDescriptionToggleEditButton(page, dataSourcesTitle, name)

test.describe('Section descriptions: data sources - success', () => {
  const validReference = LinkBuilder.buildValidLinkHtml(`data-source-${randomString}`)
  const updatedReference = LinkBuilder.buildValidLinkHtml(`data-source-updated-${randomString}`)

  test.afterAll(async ({ browser }) => {
    await DescriptionsApi.clear(browser, x13SpecificForestCategories)
  })

  test('NC creates, edits and removes a data source with a valid reference', async ({ authenticatedPage }) => {
    // Each step opens its own page, like each test did, so its waits only see its own requests
    const context = authenticatedPage.context()

    await test.step('NC sees no existing data source with the fixture reference', async () => {
      const page = await context.newPage()

      await page.goto(x13SpecificForestCategoriesPath)

      await expect(page.getByText(dataSourcesTitle)).toBeVisible()
      await DOMUtils.elementNotExists(DataSourceUtils.getTable(page).filter({ hasText: validReference.text }))

      await page.close()
    })

    await test.step('NC creates a new data source with a valid reference', async () => {
      const page = await context.newPage()

      await page.goto(x13SpecificForestCategoriesPath)
      await DOMUtils.ensureEditingUnlocked(page)

      await DescriptionUtils.save(page, async () => {
        await dataSourcesToggleEditButton(page, 'Edit').click()
        const referenceEditor = await DataSourceUtils.addRow(page)
        await DescriptionUtils.pasteIntoEditorWysiwygLinksOnly(page, referenceEditor, validReference.html)
        await dataSourcesToggleEditButton(page, 'Done').click()
      })

      await expect(DataSourceUtils.getReferenceValidationError(page, validReference.text)).not.toBeVisible()

      // Only the reference is filled in, so the empty type, variables and year still cause an error
      await NavigationUtils.subSectionHasError(page, x13SpecificForestCategoriesPath, true)

      await page.close()
    })

    await test.step('NC edits the data source reference', async () => {
      const page = await context.newPage()

      await page.goto(x13SpecificForestCategoriesPath)
      await DOMUtils.ensureEditingUnlocked(page)

      await DescriptionUtils.save(page, async () => {
        await dataSourcesToggleEditButton(page, 'Edit').click()
        const referenceEditor = DataSourceUtils.getReferenceEditor(page, validReference.text)
        await DescriptionUtils.pasteIntoEditorWysiwygLinksOnly(page, referenceEditor, updatedReference.html)
        await dataSourcesToggleEditButton(page, 'Done').click()
      })

      const table = DataSourceUtils.getTable(page)
      await expect(table).toContainText(updatedReference.text, { timeout: Timeouts.medium })
      await expect(table).not.toContainText(validReference.text, { timeout: Timeouts.medium })

      await page.close()
    })

    await test.step('NC removes the data source', async () => {
      const page = await context.newPage()

      await page.goto(x13SpecificForestCategoriesPath)
      await DOMUtils.ensureEditingUnlocked(page)
      await NavigationUtils.subSectionHasError(page, x13SpecificForestCategoriesPath, true)

      await dataSourcesToggleEditButton(page, 'Edit').click()
      await DataSourceUtils.deleteRow(page, updatedReference.text)

      await expect(DataSourceUtils.getTable(page)).not.toContainText(updatedReference.text, {
        timeout: Timeouts.medium,
      })
      await NavigationUtils.subSectionHasError(page, x13SpecificForestCategoriesPath, false)

      await page.close()
    })
  })
})
