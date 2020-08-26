import * as FRA from '@common/assessment/fra'

import * as AssessmentState from '@webapp/app/assessment/assessmentState'

const section = FRA.sections['3'].children.b

// ==== By Year getters

const _getValueByYear = (year, rowIdx) =>
  AssessmentState.getTableDataCellByFRAYear({
    assessmentType: FRA.type,
    sectionName: section.name,
    tableName: section.tables.forestAreaWithinProtectedAreas,
    year,
    rowIdx,
  })

export const getForestAreaWithinProtectedAreasByYear = (year) => _getValueByYear(year, 0)

export const getForestAreaLongTermForestManagementPlanByYear = (year) => _getValueByYear(year, 1)
