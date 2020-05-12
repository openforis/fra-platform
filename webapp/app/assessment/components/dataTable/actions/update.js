import * as R from 'ramda'
import * as FRAUtils from '@common/fraUtils'

import { batchActions } from '@webapp/main/reduxBatch'
import * as autosave from '@webapp/app/components/autosave/actions'

import * as AssessmentState from '@webapp/app/assessment/assessmentState'

export const assessmentSectionDataUpdate = 'assessment/section/data/update'

export const updateTableData = ({ assessmentType, sectionName, tableName, data, autoSaveStart, autoSaveComplete }) => (
  dispatch
) => {
  const actions = [
    {
      type: assessmentSectionDataUpdate,
      assessmentType,
      sectionName,
      tableName,
      data,
    },
  ]

  if (autoSaveStart) actions.push(autosave.start)
  if (autoSaveComplete) actions.push(autosave.complete)

  dispatch(batchActions(actions))
}

export const updateTableDataCell = ({ rowIdx, colIdx, value }) => R.assocPath([rowIdx, colIdx], value)

export const updateTableWithOdpCell = ({ datum }) => (data) => ({
  [AssessmentState.keysDataTableWithOdp.fra]: R.pipe(
    R.prop(AssessmentState.keysDataTableWithOdp.fra),
    FRAUtils.updateTableWithOdpDatum(datum)
  )(data),
  [AssessmentState.keysDataTableWithOdp.fraNoNDPs]: R.pipe(
    R.prop(AssessmentState.keysDataTableWithOdp.fraNoNDPs),
    FRAUtils.updateTableWithOdpDatum(datum)
  )(data),
})
