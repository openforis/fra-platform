import { Page } from '@playwright/test'

import { HighlightName } from 'client/components/EditorWYSIWYG/highlights/highlightName'

export const getHighlightedLinks = (page: Page, highlightName: HighlightName): Promise<Array<string>> =>
  page.evaluate((name) => {
    const ranges = Array.from(CSS.highlights.get(name) ?? [])
    return ranges.map<string>((range) => range.toString())
  }, highlightName)
