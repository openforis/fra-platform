import { Locator, Page } from '@playwright/test'

import { tableContainer } from './tableContainer'

// The review button is in the first actions cell after the row's header cell
export const getRowReviewButton = (page: Page, tableName: string, variableName: string): Locator =>
  tableContainer(page, tableName)
    .locator(`[id$="variableName_${variableName}"] ~ .data-cell.actions`)
    .first()
    .locator('button.review-indicator')
