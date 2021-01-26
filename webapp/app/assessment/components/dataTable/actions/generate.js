import axios from 'axios'
import { batchActions } from '@webapp/main/reduxBatch'
import * as autosave from '@webapp/app/components/autosave/actions'

import * as AppState from '@webapp/store/app/state'
import { updateTableData } from './update'

export const assessmentSectionDataGeneratingValuesUpdate = 'assessment/section/data/generatingValues/update'

export const generateTableData = (assessmentType, sectionName, tableName, method, fields, changeRates) => async (
  dispatch,
  getState
) => {
  const countryIso = AppState.getCountryIso(getState())

  dispatch(
    batchActions([
      {
        type: assessmentSectionDataGeneratingValuesUpdate,
        assessmentType,
        sectionName,
        tableName,
        generating: true,
      },
      autosave.start,
    ])
  )

  const { data } = await axios.post(`/api/nde/${sectionName}/generateFraValues/${countryIso}`, {
    method,
    fields,
    changeRates,
  })

  dispatch(
    batchActions([
      updateTableData({ assessmentType, sectionName, tableName, data, autoSaveComplete: true }),
      {
        type: assessmentSectionDataGeneratingValuesUpdate,
        assessmentType,
        sectionName,
        tableName,
        generating: false,
      },
    ])
  )
}
