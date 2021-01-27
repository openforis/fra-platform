// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as NumberUtils from '@common/bignumberUtils'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as FRA from '@common/assessment/fra'

import * as ForestOwnershipState from '@webapp/app/assessment/fra/sections/forestOwnership/forestOwnershipState'
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
