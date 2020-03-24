import * as NumberUtils from '@common/bignumberUtils'
import * as FRA from '@common/assessment/fra'

import * as ForestOwnershipState from '@webapp/app/assessment/fra/sections/forestOwnership/forestOwnershipState'
import * as AssessmentState from '@webapp/app/assessment/assessmentState'

export const { years } = ForestOwnershipState

const section = FRA.sections['4'].children.b

const _getTableDataCell = (colIdx, rowIdx) =>
  AssessmentState.getTableDataCell({
    assessmentType: FRA.type,
    sectionName: section.name,
    tableName: section.tables.holderOfManagementRights,
    colIdx,
    rowIdx,
  })

export const getTotalPublicOwnership = colIdx => ForestOwnershipState.getPublicOwnership(colIdx)

export const getOther = colIdx => state => {
  const totalPublicOwnership = getTotalPublicOwnership(colIdx)(state)
  return [0, 1, 2, 3].reduce((value, rowIdx) => {
    return NumberUtils.sub(value, _getTableDataCell(colIdx, rowIdx)(state))
  }, totalPublicOwnership)
}
