import { createAction } from '@reduxjs/toolkit'

import { AssessmentName, TableSection } from 'meta/assessment'
import { CycleName } from 'meta/assessment/cycle'

export const setTableSections = createAction<{
  tableSections: Record<string, Array<TableSection>>
  assessmentName: AssessmentName
  cycleName: CycleName
}>('section/metadata/set')
