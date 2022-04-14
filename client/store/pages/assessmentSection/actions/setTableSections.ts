import { TableSection } from '@meta/assessment'
import { createAction } from '@reduxjs/toolkit'

export const setTableSections = createAction<{ sectionName: string; tableSections: Array<TableSection> }>(
  'section/metadata/set'
)
