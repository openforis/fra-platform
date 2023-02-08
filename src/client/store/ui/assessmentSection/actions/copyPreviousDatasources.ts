import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from '@meta/api/endpoint'
import { CycleDataParams } from '@meta/api/request'

import { updateDescription } from '@client/store/ui/assessmentSection/actions/updateDescription'

export const copyPreviousDatasources = createAsyncThunk<
  void,
  CycleDataParams & { sectionName: string; previousSectionName: string }
>(
  'section/copy/description/dataSources',
  async ({ countryIso, assessmentName, cycleName, previousSectionName, sectionName }, { dispatch }) => {
    if (!previousSectionName) return

    const name = 'dataSources'
    const {
      data: { value },
    } = await axios.get(ApiEndPoint.CycleData.descriptions(), {
      params: { countryIso, assessmentName, cycleName, sectionName: previousSectionName, name },
    })

    dispatch(
      updateDescription({
        value,
        name,
        sectionName,
        assessmentName,
        cycleName,
        countryIso,
      })
    )
  }
)
