import { Page } from '@playwright/test'

import { HighlightName } from 'client/components/EditorWYSIWYG/highlights/highlightName'

import { getHighlightedLinks } from './_getHighlightedLinks'

export const getFocusedLinks = (page: Page): Promise<Array<string>> =>
  getHighlightedLinks(page, HighlightName.focusedLink)
