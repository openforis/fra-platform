import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CycleParams } from 'meta/api/request'
import { DescriptionCountryValues } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'

type Props = CycleParams & { sectionName?: SectionName; name?: string }

type Returned = DescriptionCountryValues

export const getDescriptionsHistory = createAsyncThunk<Returned, Props>(
  'data/history/descriptions/get',
  async (params) => {
    const config = { params }
    const { data } = await axios.get<DescriptionCountryValues>(ApiEndPoint.CycleData.Descriptions.history(), config)
    return data
  }
)
