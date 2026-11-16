import { Page } from '@playwright/test'

import { HighlightName } from 'client/components/EditorWYSIWYG/highlights/highlightName'

export const getHighlightedInvalidLinks = (page: Page): Promise<Array<string>> =>
  page.evaluate((highlightName) => {
    const ranges = Array.from(CSS.highlights.get(highlightName) ?? [])
    return ranges.map<string>((range) => range.toString())
  }, HighlightName.invalidLink)
