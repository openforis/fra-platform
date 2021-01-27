// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'

// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as NumberUtils from '@common/bignumberUtils'

import * as ForestAreaChangeState from '@webapp/app/assessment/fra/sections/forestAreaChange/forestAreaChangeState'

const calculateMirrorValue = (colIdx: any, rowIdx: any, rowIdxMirror: any, fn: any, state: any) => (data: any) => {
  const value = data[rowIdx][colIdx]
  const netChange = ForestAreaChangeState.getExtentOfForestChange(colIdx)(state)

  let valueMirror = NumberUtils.toFixed(fn(value, netChange))
  valueMirror = valueMirror ? valueMirror.toString() : null

  return R.assocPath([rowIdxMirror, colIdx], valueMirror)(data)
}

export const updateForestAreaChangeCell = ({ state, rowIdx, colIdx, value }: any) =>
  R.pipe(
    R.assocPath([rowIdx, colIdx], value),
    // update Deforestation
    R.when(R.always(rowIdx === 0), calculateMirrorValue(colIdx, rowIdx, 3, NumberUtils.sub, state)),
    // update Forest expansion
    R.when(R.always(rowIdx === 3), calculateMirrorValue(colIdx, rowIdx, 0, NumberUtils.add, state))
  )
