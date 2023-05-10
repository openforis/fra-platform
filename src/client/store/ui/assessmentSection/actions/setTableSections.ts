import { createAction } from '@reduxjs/toolkit'

import { TableSection } from '@meta/assessment'

export const setTableSections = createAction<{
  assessmentName: string
  cycleName: string
  tableSections: Record<string, Array<TableSection>>
}>('section/metadata/set')
