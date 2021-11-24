import * as R from 'ramda'
import FRAUtils from '@common/fraUtils'

import { batchActions } from '../../../../store'

import * as AssessmentState from '../../../../app/assessment/assessmentState'
import { AutosaveActions } from '../../../../store/autosave'

export const assessmentSectionDataUpdate = 'assessment/section/data/update'

export const updateTableData =
  ({ assessmentType, sectionName, tableName, data, autoSaveStart, autoSaveComplete }: any) =>
  (dispatch: any) => {
    const actions = [
      {
        type: assessmentSectionDataUpdate,
        assessmentType,
        sectionName,
        tableName,
        data,
      },
    ]

    if (autoSaveStart) dispatch(AutosaveActions.autoSaveStart())
    if (autoSaveComplete) dispatch(AutosaveActions.autoSaveComplete)

    dispatch(batchActions(actions))
  }

export const updateTableDataCell = ({ rowIdx, colIdx, value }: any) => R.assocPath([rowIdx, colIdx], value)

export const updateTableWithOdpCell =
  ({ datum }: any) =>
  (data: any) => ({
    [AssessmentState.keysDataTableWithOdp.fra]: R.pipe(
      R.prop(AssessmentState.keysDataTableWithOdp.fra),
      FRAUtils.updateTableWithOdpDatum(datum)
    )(data),

    [AssessmentState.keysDataTableWithOdp.fraNoNDPs]: R.pipe(
      R.prop(AssessmentState.keysDataTableWithOdp.fraNoNDPs),
      FRAUtils.updateTableWithOdpDatum(datum)
    )(data),
  })
