// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as FRA from '@common/assessment/fra'

import * as AssessmentState from '@webapp/app/assessment/assessmentState'

const section = FRA.sections['3'].children.b

// ==== By Year getters

const _getValueByYear = (year: any, rowIdx: any) =>
  AssessmentState.getTableDataCellByFRAYear({
    assessmentType: FRA.type,
    sectionName: section.name,
    tableName: section.tables.forestAreaWithinProtectedAreas,
    year,
    rowIdx,
  })

export const getForestAreaWithinProtectedAreasByYear = (year: any) => _getValueByYear(year, 0)

export const getForestAreaLongTermForestManagementPlanByYear = (year: any) => _getValueByYear(year, 1)
