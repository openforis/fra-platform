import { expect, Locator, Page } from '@playwright/test'

const getNavigationSubSectionItem = (page: Page, path: string): Locator =>
  page.locator(`.nav-section__item[href="${path}"]`)

const _expectErrorIndicator = async (locator: Locator, visible: boolean): Promise<void> => {
  const indicator = locator.locator('.validation-error-indicator')
  if (visible) {
    await expect(indicator).toBeVisible({ timeout: 20000 })
  } else {
    await expect(indicator).toHaveCount(0, { timeout: 20000 })
  }
}

type ExpectNavigationErrorProps = {
  hasError: boolean
  sectionHeader: string
  sectionItemPath: string
}

const expectNavigationError = async (page: Page, props: ExpectNavigationErrorProps): Promise<void> => {
  const { hasError, sectionHeader, sectionItemPath } = props
  const subSectionItem = getNavigationSubSectionItem(page, sectionItemPath)
  const header = page.locator('.nav-section__header', { hasText: sectionHeader })

  await _expectErrorIndicator(subSectionItem, hasError)
  await header.click()
  await _expectErrorIndicator(header, hasError)
}

export const NavigationUtils = {
  expectNavigationError,
  getNavigationSubSectionItem,
}
