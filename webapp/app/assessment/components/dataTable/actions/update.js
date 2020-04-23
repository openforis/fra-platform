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

export const updateTableDataCell = ({ assessmentType, sectionName, tableName, rowIdx, colIdx, value }) =>
  R.pipe(
    AssessmentState.getSectionData(assessmentType, sectionName, tableName),
    R.assocPath([rowIdx, colIdx], value),
    (data) => ({ data })
  )

export const updateTableWithOdpCell = (assessmentType, sectionName, tableName, datum) => (state) => {
  const fra = R.pipe(
    AssessmentState.getFra(assessmentType, sectionName, tableName),
    FRAUtils.updateTableWithOdpDatum(datum)
  )(state)
  const fraNoNdps = R.pipe(
    AssessmentState.getFraNoNDPs(assessmentType, sectionName, tableName),
    FRAUtils.updateTableWithOdpDatum(datum)
  )(state)

  const data = {
    [AssessmentState.keysDataTableWithOdp.fra]: fra,
    [AssessmentState.keysDataTableWithOdp.fraNoNDPs]: fraNoNdps,
  }
  return { data, datum }
}
