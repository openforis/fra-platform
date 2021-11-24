import axios from 'axios'
import { batchActions } from '../../../../store'

import * as AppState from '../../../../store/app/state'
import { AutosaveActions } from '../../../../store/autosave'
import { updateTableData } from './update'

export const assessmentSectionDataGeneratingValuesUpdate = 'assessment/section/data/generatingValues/update'

export const generateTableData =
  (assessmentType: any, sectionName: any, tableName: any, method: any, fields: any, changeRates: any) =>
  async (dispatch: any, getState: any) => {
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
        AutosaveActions.autoSaveStart(),
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
