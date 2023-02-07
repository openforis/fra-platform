import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from '@meta/api/endpoint'
import { CycleDataParams } from '@meta/api/request'
import { CommentableDescriptionValue } from '@meta/assessment'

export const copyPreviousDatasources = createAsyncThunk<
  Record<string, string> & { value: CommentableDescriptionValue },
  CycleDataParams & { sectionName: string; previousSectionName: string }
>(
  'section/copy/description/datasources',
  async ({ countryIso, assessmentName, cycleName, previousSectionName, sectionName }) => {
    if (!previousSectionName) return undefined

    const name = 'dataSources'
    const {
      data: { value },
    } = await axios.get(ApiEndPoint.CycleData.descriptions(), {
      params: { countryIso, assessmentName, cycleName, sectionName: previousSectionName, name },
    })

    return {
      value,
      name,
      sectionName,
    }
  }
)
