import * as R from 'ramda'

import * as NumberUtils from '@common/bignumberUtils'

import * as AssessmentState from '@webapp/app/assessment/assessmentState'
import * as ForestAreaChangeState from '@webapp/app/assessment/fra/sections/forestAreaChange/forestAreaChangeState'

const calculateMirrorValue = (colIdx, rowIdx, rowIdxMirror, fn, state) => (data) => {
  const value = data[rowIdx][colIdx]
  const netChange = ForestAreaChangeState.getExtentOfForestChange(colIdx)(state)

  let valueMirror = NumberUtils.toFixed(fn(value, netChange))
  valueMirror = valueMirror ? valueMirror.toString() : null

  return R.assocPath([rowIdxMirror, colIdx], valueMirror)(data)
}

export const updateForestAreaChangeCell = ({ assessmentType, sectionName, tableName, rowIdx, colIdx, value }) => (
  state
) =>
  R.pipe(
    AssessmentState.getSectionData(assessmentType, sectionName, tableName),
    R.assocPath([rowIdx, colIdx], value),
    // update Deforestation
    R.when(R.always(rowIdx === 0), calculateMirrorValue(colIdx, rowIdx, 3, NumberUtils.sub, state)),
    // update Forest expansion
    R.when(R.always(rowIdx === 3), calculateMirrorValue(colIdx, rowIdx, 0, NumberUtils.add, state)),
    (data) => ({ data })
  )(state)
