import { createAction } from '@reduxjs/toolkit'

import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { TableSection } from 'meta/assessment/tableSection'

export const setTableSections = createAction<{
  tableSections: Record<string, Array<TableSection>>
  assessmentName: AssessmentName
  cycleName: CycleName
}>('section/metadata/set')
