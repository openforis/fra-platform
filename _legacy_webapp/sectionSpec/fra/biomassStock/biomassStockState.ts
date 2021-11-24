import { FRA } from '@core/assessment'

import * as AssessmentState from '../../../app/assessment/assessmentState'

const section = FRA.sections['2'].children.c

// ==== By Year getters

const _getValueByYear = (year: any, rowIdx: any) =>
  AssessmentState.getTableDataCellByFRAYear({
    assessmentType: FRA.type,
    sectionName: section.name,
    tableName: section.tables.biomassStock,
    year,
    rowIdx,
  })

export const getAboveGroundBiomassByYear = (year: any) => _getValueByYear(year, 0)
