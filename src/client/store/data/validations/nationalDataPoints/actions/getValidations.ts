import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleDataParams } from 'meta/api/request/cycleData/cycleData'
import { RecordNDPValidations } from 'meta/assessment/validation/nationalDataPoint'

import { setValidations } from 'client/store/data/validations/nationalDataPoints/actions/setValidations'
import { ThunkApiConfig } from 'client/store/types'

type Props = CycleDataParams

export const getValidations = createAsyncThunk<void, Props, ThunkApiConfig>(
  'validations/nationalDataPoints/get',
  async (props, { dispatch }) => {
    const { assessmentName, countryIso, cycleName, sectionName } = props
    const params = { assessmentName, countryIso, cycleName, sectionName }

    const { data } = await axios.get<RecordNDPValidations>(ApiEndPoint.CycleData.Validations.nationalDataPoints(), {
      params,
    })

    dispatch(setValidations({ assessmentName, countryIso, cycleName, validations: data }))
  }
)
