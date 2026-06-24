import { expect, test } from '../fixtures/auth'
import { DOMUtils } from '../utils/dom'

const rootLinkLabel = 'E2E test link'
const rootLinkLabelEdited = 'E2E test link edited'
const folderName = 'E2E test folder'
const nestedLinkLabel = 'E2E nested link'

test.describe.serial('Repository: ', () => {
  test('admin creates a link item', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    await page.goto('/assessments/fra/2025/X01/home/repository')
    await DOMUtils.unlockEditing(page)

    await page.getByRole('button', { name: 'Add file' }).last().click()
    await page.fill('input[name="repositoryItem.props.translation.en"]', rootLinkLabel)
    await page.fill('input[name="repositoryItem.link"]', 'https://example.com')
    await page.getByRole('button', { name: 'Save' }).click()

    await expect(page.locator('.repository-list-item__name', { hasText: rootLinkLabel })).toBeVisible()
  })

  test('admin edits the link item', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    await page.goto('/assessments/fra/2025/X01/home/repository')
    await DOMUtils.unlockEditing(page)

    await page.locator('.repository-list-item', { hasText: rootLinkLabel }).locator('button').click()
    await page.fill('input[name="repositoryItem.props.translation.en"]', rootLinkLabelEdited)
    await page.getByRole('button', { name: 'Save' }).click()

    await expect(page.locator('.repository-list-item__name', { hasText: rootLinkLabelEdited })).toBeVisible()
  })

  test('admin creates a folder', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    await page.goto('/assessments/fra/2025/X01/home/repository')
    await DOMUtils.unlockEditing(page)

    await page.getByRole('button', { name: 'Add folder' }).last().click()
    await page.fill('input[name="repositoryItem.folderName"]', folderName)
    await page.getByRole('button', { name: 'Save' }).click()

    await expect(page.locator('.repository-folder button', { hasText: folderName })).toBeVisible()
  })

  test('admin creates a link inside the folder', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    await page.goto('/assessments/fra/2025/X01/home/repository')
    await DOMUtils.unlockEditing(page)

    await page.locator('.repository-folder button', { hasText: folderName }).click()
    await page.getByRole('button', { name: 'Add file' }).last().click()
    await page.fill('input[name="repositoryItem.props.translation.en"]', nestedLinkLabel)
    await page.fill('input[name="repositoryItem.link"]', 'https://example.com/nested')
    await page.getByRole('button', { name: 'Save' }).click()

    await expect(page.locator('.repository-list-item__name', { hasText: nestedLinkLabel })).toBeVisible()
  })

  test('admin deletes the nested link', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    await page.goto('/assessments/fra/2025/X01/home/repository')
    await DOMUtils.unlockEditing(page)

    await page.locator('.repository-folder button', { hasText: folderName }).click()
    await page.locator('.repository-list-item', { hasText: nestedLinkLabel }).locator('button').click()
    page.once('dialog', (dialog) => dialog.accept())
    await page.getByRole('button', { name: 'Delete' }).click()

    await expect(page.locator('.repository-list-item__name', { hasText: nestedLinkLabel })).toHaveCount(0)
  })

  test('admin deletes the folder', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    await page.goto('/assessments/fra/2025/X01/home/repository')
    await DOMUtils.unlockEditing(page)

    await page.locator('.repository-list-item--folder', { hasText: folderName }).locator('button').last().click()
    page.once('dialog', (dialog) => dialog.accept())
    await page.getByRole('button', { name: 'Delete' }).click()

    await expect(page.locator('.repository-folder', { hasText: folderName })).toHaveCount(0)
  })

  test('admin deletes the root link', async ({ authenticatedPage }) => {
    const page = authenticatedPage

    await page.goto('/assessments/fra/2025/X01/home/repository')
    await DOMUtils.unlockEditing(page)

    await page.locator('.repository-list-item', { hasText: rootLinkLabelEdited }).locator('button').click()
    page.once('dialog', (dialog) => dialog.accept())
    await page.getByRole('button', { name: 'Delete' }).click()

    await expect(page.locator('.repository-list-item__name', { hasText: rootLinkLabelEdited })).toHaveCount(0)
  })
})
