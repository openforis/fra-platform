import { Page } from '@playwright/test'
import { enTranslation } from 'i18n/resources/en'

export const openLocation = async (page: Page, link: string): Promise<Page> => {
  const linkCell = page.locator('.data-cell', {
    has: page.locator('.link-cell').getByRole('link', { name: link, exact: true }),
  })
  const locationsCell = linkCell.locator('xpath=following-sibling::*[2]')
  await locationsCell.getByRole('button', { name: enTranslation.common.show, exact: true }).click()

  const locationOpened = page.context().waitForEvent('page')
  await locationsCell.locator('.locations a').click()

  const locationPage = await locationOpened
  await locationPage.waitForLoadState()
  return locationPage
}
