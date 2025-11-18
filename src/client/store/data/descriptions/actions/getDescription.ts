import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryParams } from 'meta/api/request/country'
import { DescriptionCountryValues } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'

type Props = CountryParams & { sectionName?: SectionName; name?: string }

type Returned = DescriptionCountryValues

export const getDescription = createAsyncThunk<Returned, Props>('data/descriptions/get', async (props: Props) => {
  const { data } = await axios.get<DescriptionCountryValues>(ApiEndPoint.CycleData.Descriptions.many(), {
    params: props,
  })

  return data
})
