import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryParams } from 'meta/api/request/country'
import { RecordNDPValidations } from 'meta/assessment/validation/nationalDataPoint'

import { setNationalDataPointValidations } from 'client/store/data/tableData/validations/actions/setNationalDataPointValidations'

type Props = CountryParams

export const getNationalDataPointValidations = createAsyncThunk<void, Props>(
  'validations/nationalDataPoints/get',
  async (props, { dispatch }) => {
    const { assessmentName, countryIso, cycleName } = props
    const params = { assessmentName, countryIso, cycleName }

    const { data } = await axios.get<RecordNDPValidations>(ApiEndPoint.CycleData.Validations.nationalDataPoints(), {
      params,
    })

    dispatch(setNationalDataPointValidations({ assessmentName, countryIso, cycleName, validations: data }))
  }
)
