import { Page } from '@playwright/test'

import { NdpPathProps, SectionUtils } from 'test/e2e/utils/section'

export const clickNdpLink = async (page: Page, props: NdpPathProps): Promise<void> => {
  const path = SectionUtils.ndpPath(props)

  await page.locator('.table-grid__odp-link', { hasText: String(props.year) }).click()
  await page.waitForURL(path)
  await page.locator('.odp__tab-controller .odp__tab-item.active').waitFor()
}
