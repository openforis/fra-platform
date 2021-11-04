import * as R from 'ramda'
import * as NumberUtils from '@core/utils/numbers'
import { FRA } from '@core/assessment'

import * as ForestOwnershipState from '@webapp/sectionSpec/fra/forestOwnership/forestOwnershipState'
import * as AssessmentState from '@webapp/app/assessment/assessmentState'

export const { years } = ForestOwnershipState

const section = FRA.sections['4'].children.b

const _getTableDataCell = (colIdx: any, rowIdx: any) =>
  AssessmentState.getTableDataCell({
    assessmentType: FRA.type,
    sectionName: section.name,
    tableName: section.tables.holderOfManagementRights,
    colIdx,
    rowIdx,
  })

export const getTotalPublicOwnership = (colIdx: any) => ForestOwnershipState.getPublicOwnership(colIdx)

export const getOther = (colIdx: any) => (state: any) => {
  const totalPublicOwnership = getTotalPublicOwnership(colIdx)(state)
  return [0, 1, 2, 3].reduce((value, rowIdx) => {
    return NumberUtils.sub(value, R.pipe(_getTableDataCell(colIdx, rowIdx), R.defaultTo(0))(state))
  }, totalPublicOwnership)
}
