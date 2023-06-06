import { createAction } from '@reduxjs/toolkit'

import { AssessmentName, CycleName, TableSection } from 'meta/assessment'

export const setTableSections = createAction<{
  tableSections: Record<string, Array<TableSection>>
  assessmentName: AssessmentName
  cycleName: CycleName
}>('section/metadata/set')
