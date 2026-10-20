import { expect, test } from 'test/e2e/fixtures/auth'
import { DOMUtils } from 'test/e2e/utils/dom'

const rootLinkLabel = 'E2E test link'
const rootLinkLabelEdited = 'E2E test link edited'
const folderName = 'E2E test folder'
const nestedLinkLabel = 'E2E nested link'

test.describe('Repository: ', () => {
  test('Admin creates, edits and deletes a link, a folder and a link inside the folder and sees each change', async ({
    authenticatedPage,
  }) => {
    const context = authenticatedPage.context()

    await test.step('admin creates a link item', async () => {
      const page = await context.newPage()

      await page.goto('/assessments/fra/2025/X01/home/repository')
      await DOMUtils.ensureEditingUnlocked(page)

      await page.getByRole('button', { name: 'Add file' }).last().click()
      await page.fill('input[name="repositoryItem.props.translation.en"]', rootLinkLabel)
      await page.fill('input[name="repositoryItem.link"]', 'https://example.com')
      await page.getByRole('button', { name: 'Save' }).click()

      await expect(page.locator('.repository-list-item__name', { hasText: rootLinkLabel })).toBeVisible()

      await page.close()
    })

    await test.step('admin edits the link item', async () => {
      const page = await context.newPage()

      await page.goto('/assessments/fra/2025/X01/home/repository')
      await DOMUtils.ensureEditingUnlocked(page)

      await page.locator('.repository-list-item', { hasText: rootLinkLabel }).locator('button').click()
      await page.fill('input[name="repositoryItem.props.translation.en"]', rootLinkLabelEdited)
      await page.getByRole('button', { name: 'Save' }).click()

      await expect(page.locator('.repository-list-item__name', { hasText: rootLinkLabelEdited })).toBeVisible()

      await page.close()
    })

    await test.step('admin creates a folder', async () => {
      const page = await context.newPage()

      await page.goto('/assessments/fra/2025/X01/home/repository')
      await DOMUtils.ensureEditingUnlocked(page)

      await page.getByRole('button', { name: 'Add folder' }).last().click()
      await page.fill('input[name="repositoryItem.folderName"]', folderName)
      await page.getByRole('button', { name: 'Save' }).click()

      await expect(page.locator('.repository-folder button', { hasText: folderName })).toBeVisible()

      await page.close()
    })

    await test.step('admin creates a link inside the folder', async () => {
      const page = await context.newPage()

      await page.goto('/assessments/fra/2025/X01/home/repository')
      await DOMUtils.ensureEditingUnlocked(page)

      await page.locator('.repository-folder button', { hasText: folderName }).click()
      await page.getByRole('button', { name: 'Add file' }).last().click()
      await page.fill('input[name="repositoryItem.props.translation.en"]', nestedLinkLabel)
      await page.fill('input[name="repositoryItem.link"]', 'https://example.com/nested')
      await page.getByRole('button', { name: 'Save' }).click()

      await expect(page.locator('.repository-list-item__name', { hasText: nestedLinkLabel })).toBeVisible()

      await page.close()
    })

    await test.step('admin deletes the nested link', async () => {
      const page = await context.newPage()

      await page.goto('/assessments/fra/2025/X01/home/repository')
      await DOMUtils.ensureEditingUnlocked(page)

      await page.locator('.repository-folder button', { hasText: folderName }).click()
      await page.locator('.repository-list-item', { hasText: nestedLinkLabel }).locator('button').click()
      page.once('dialog', (dialog) => dialog.accept())
      await page.getByRole('button', { name: 'Delete' }).click()

      await expect(page.locator('.repository-list-item__name', { hasText: nestedLinkLabel })).toHaveCount(0)

      await page.close()
    })

    await test.step('admin deletes the folder', async () => {
      const page = await context.newPage()

      await page.goto('/assessments/fra/2025/X01/home/repository')
      await DOMUtils.ensureEditingUnlocked(page)

      await page.locator('.repository-list-item--folder', { hasText: folderName }).locator('button').last().click()
      page.once('dialog', (dialog) => dialog.accept())
      await page.getByRole('button', { name: 'Delete' }).click()

      await expect(page.locator('.repository-folder', { hasText: folderName })).toHaveCount(0)

      await page.close()
    })

    await test.step('admin deletes the root link', async () => {
      const page = await context.newPage()

      await page.goto('/assessments/fra/2025/X01/home/repository')
      await DOMUtils.ensureEditingUnlocked(page)

      await page.locator('.repository-list-item', { hasText: rootLinkLabelEdited }).locator('button').click()
      page.once('dialog', (dialog) => dialog.accept())
      await page.getByRole('button', { name: 'Delete' }).click()

      await expect(page.locator('.repository-list-item__name', { hasText: rootLinkLabelEdited })).toHaveCount(0)

      await page.close()
    })
  })
})
