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

const subSectionHasError = async (page: Page, path: string, hasError: boolean): Promise<void> => {
  await _expectErrorIndicator(getNavigationSubSectionItem(page, path), hasError)
}

// Check for the error on the subsection and on the top level section header
const expectNavigationError = async (page: Page, props: ExpectNavigationErrorProps): Promise<void> => {
  const { hasError, sectionHeader, sectionItemPath } = props

  await subSectionHasError(page, sectionItemPath, hasError)

  const header = page.locator('.nav-section__header', { hasText: sectionHeader })
  await header.click()
  await _expectErrorIndicator(header, hasError)
}

export const NavigationUtils = {
  expectNavigationError,
  getNavigationSubSectionItem,
  subSectionHasError,
}
