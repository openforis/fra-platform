import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleDataParams } from 'meta/api/request/cycleData/cycleData'
import { RecordNDPValidations } from 'meta/assessment/validation/nationalDataPoint'

import { setNationalDataPointValidations } from 'client/store/data/validations/nationalDataPoints/actions/setNationalDataPointValidations'
import { updateValidationSummary } from 'client/store/data/validations/summary/actions/updateValidationSummary'
import { ThunkApiConfig } from 'client/store/types'

type Props = CycleDataParams

export const getNationalDataPointValidations = createAsyncThunk<void, Props, ThunkApiConfig>(
  'validations/nationalDataPoints/get',
  async (props, { dispatch }) => {
    const { assessmentName, countryIso, cycleName, sectionName } = props
    const params = { assessmentName, countryIso, cycleName, sectionName }

    const { data } = await axios.get<RecordNDPValidations>(ApiEndPoint.CycleData.Validations.nationalDataPoints(), {
      params,
    })

    dispatch(setNationalDataPointValidations({ assessmentName, countryIso, cycleName, validations: data }))
    dispatch(updateValidationSummary({ assessmentName, countryIso, cycleName, updateNationalDataPoints: true }))
  }
)
