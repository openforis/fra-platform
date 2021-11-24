import * as R from 'ramda'

import { Numbers } from '@core/utils/numbers'
import * as ForestAreaChangeState from '../../../sectionSpec/fra/forestAreaChange/forestAreaChangeState'

const calculateMirrorValue = (colIdx: any, rowIdx: any, rowIdxMirror: any, fn: any, state: any) => (data: any) => {
  const value = data[rowIdx][colIdx]
  const netChange = ForestAreaChangeState.getExtentOfForestChange(colIdx)(state)

  let valueMirror = Numbers.toFixed(fn(value, netChange))
  valueMirror = valueMirror ? valueMirror.toString() : null

  return R.assocPath([rowIdxMirror, colIdx], valueMirror)(data)
}

export const updateForestAreaChangeCell = ({ state, rowIdx, colIdx, value }: any) =>
  R.pipe(
    R.assocPath([rowIdx, colIdx], value),
    // update Deforestation
    R.when(R.always(rowIdx === 0), calculateMirrorValue(colIdx, rowIdx, 3, Numbers.sub, state)),
    // update Forest expansion
    R.when(R.always(rowIdx === 3), calculateMirrorValue(colIdx, rowIdx, 0, Numbers.add, state))
  )
