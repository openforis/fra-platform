import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleParams } from 'meta/api/request'
import { DescriptionCountryValues, SectionName } from 'meta/assessment'

type Props = CycleParams & { sectionName?: SectionName; name?: string }

type Returned = DescriptionCountryValues

export const getDescription = createAsyncThunk<Returned, Props>('data/descriptions/get', async (props: Props) => {
  const { data } = await axios.get<DescriptionCountryValues>(ApiEndPoint.CycleData.Descriptions.many(), {
    params: props,
  })

  return data
})
