import axios, { AxiosResponse } from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { ODP } from '@core/odp'
import { ApiEndPoint } from '@common/api/endpoint'

import { OriginalDataPointActions } from '@webapp/store/page/originalDataPoint'
import { applicationError } from '@webapp/components/error/actions'

export const copyPreviousNationalClasses = createAsyncThunk<void, { id: string }>(
  'originalDataPoint/copyPreviousNationalClasses',
  async ({ id }, { dispatch, getState }) => {
    const {
      data: { odp: prevOdp },
    } = await axios.get<undefined, AxiosResponse<{ odp: ODP }>>(ApiEndPoint.OriginalDataPoint.previous(id))

    const { odp } = getState().page.originalDataPoint

    if (odp.nationalClasses) {
      dispatch(
        OriginalDataPointActions.updateODP({
          odp: {
            ...odp,
            nationalClasses: prevOdp.nationalClasses,
          },
        })
      )
    } else {
      dispatch(applicationError({ key: 'error.ndp.previousNdpNotFound', values: { year: odp.year } }))
    }
  }
)
