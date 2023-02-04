import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiEndPoint } from '@meta/api/endpoint'
import { CycleParams } from '@meta/api/request'
import { ODPNationalClass, ODPs, OriginalDataPoint } from '@meta/assessment'

import { RootState } from '@client/store'

import { updateOriginalDataPoint } from './updateOriginalDataPoint'

export const copyPreviousNationalClasses = createAsyncThunk<
  void,
  CycleParams & { originalDataPoint: OriginalDataPoint }
>(
  'originalDataPoint/copy/previousNationalClasses',
  async ({ countryIso, assessmentName, cycleName, originalDataPoint }, { dispatch, getState }) => {
    const state = getState()
    const { reservedYears } = (state as RootState).pages.originalDataPoint
    const { year } = originalDataPoint

    const previousODPYear = ODPs.getPreviousODPYear(year, reservedYears)

    const { data } = await axios.get(ApiEndPoint.CycleData.OriginalDataPoint.one(), {
      params: {
        countryIso,
        assessmentName,
        cycleName,
        year: previousODPYear,
      },
    })

    const updatedOriginalDataPoint = {
      ...originalDataPoint,
      nationalClasses: data.nationalClasses.map(({ area: _, ...nationalClass }: ODPNationalClass) => ({
        ...nationalClass,
      })),
    }

    dispatch(
      updateOriginalDataPoint({
        countryIso,
        assessmentName,
        cycleName,
        originalDataPoint: ODPs.addNationalClassPlaceHolder(updatedOriginalDataPoint),
      })
    )
  }
)
