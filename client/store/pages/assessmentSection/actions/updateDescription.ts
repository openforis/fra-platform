import { ApiEndPoint } from '@common/api/endpoint'
import { Functions } from '@core/utils'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { CountryIso } from '@meta/area'

const patchDescription = Functions.debounce(
  async (props: {
    countryIso: CountryIso
    assessmentName: string
    cycleName: string
    sectionName: string
    name: string
    content: string
  }) => {
    const { content, ...params } = props

    try {
      await axios.put(ApiEndPoint.Assessment.Data.descriptions(), { content }, { params })
    } catch (e) {
      // placeholder to avoid app crash
    }
  },
  250
)

export const updateDescription = createAsyncThunk<
  void,
  {
    countryIso: CountryIso
    assessmentName: string
    cycleName: string
    sectionName: string
    name: string
    content: string
  }
>('section/description/update', (params) => {
  patchDescription(params)
})
