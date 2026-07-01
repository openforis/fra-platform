import { Locator, Page } from '@playwright/test'

const getNavigationSubSectionItem = (page: Page, path: string): Locator =>
  page.locator(`.nav-section__item[href="${path}"]`)

export const NavigationUtils = {
  getNavigationSubSectionItem,
}
