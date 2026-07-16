import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleDataParams } from 'meta/api/request/cycleData/cycleData'
import { RecordNDPValidations } from 'meta/assessment/validation/nationalDataPoint'

import { setNationalDataPointValidations } from 'client/store/data/validations/actions/setNationalDataPointValidations'

type Props = CycleDataParams

export const getNationalDataPointValidations = createAsyncThunk<void, Props>(
  'validations/nationalDataPoints/get',
  async (props, { dispatch }) => {
    const { assessmentName, countryIso, cycleName, sectionName } = props
    const params = { assessmentName, countryIso, cycleName, sectionName }

    const { data } = await axios.get<RecordNDPValidations>(ApiEndPoint.CycleData.Validations.nationalDataPoints(), {
      params,
    })

    dispatch(setNationalDataPointValidations({ assessmentName, countryIso, cycleName, validations: data }))
  }
)
