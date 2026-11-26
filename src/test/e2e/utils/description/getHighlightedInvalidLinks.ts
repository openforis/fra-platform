import { Page } from '@playwright/test'

import { HighlightName } from 'client/components/EditorWYSIWYG/highlights/highlightName'

import { getHighlightedLinks } from './_getHighlightedLinks'

export const getHighlightedInvalidLinks = (page: Page): Promise<Array<string>> =>
  getHighlightedLinks(page, HighlightName.invalidLink)
