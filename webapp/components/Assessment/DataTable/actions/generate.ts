import axios from 'axios'
import { batchActions } from '@webapp/store'
import * as autosave from '@webapp/app/components/autosave/actions'

import { AppSelectors } from '@webapp/store/app/app.slice'
import { updateTableData } from './update'

export const assessmentSectionDataGeneratingValuesUpdate = 'assessment/section/data/generatingValues/update'

export const generateTableData =
  (assessmentType: any, sectionName: any, tableName: any, method: any, fields: any, changeRates: any) =>
  async (dispatch: any, getState: any) => {
    const countryIso = AppSelectors.selectCountryIso(getState())

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
