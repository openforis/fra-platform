import { expect, Page } from '@playwright/test'

const getCycleSwitcherItems = async (page: Page): Promise<Array<string>> => {
  await page.locator('.cycle-switcher .app-header__menu-item').click()
  const items = page.locator('.cycle-switcher .popover-control__item')
  await expect(items.first()).toBeVisible()
  return items.allInnerTexts()
}

export const HeaderUtils = {
  getCycleSwitcherItems,
}
