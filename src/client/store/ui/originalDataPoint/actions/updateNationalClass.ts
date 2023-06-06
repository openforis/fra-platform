import { createAsyncThunk } from '@reduxjs/toolkit'

import { ODPNationalClass, ODPs, OriginalDataPoint } from 'meta/assessment'

import { Sanitizer } from 'client/utils/sanitizer'

import { updateOriginalDataPoint } from './updateOriginalDataPoint'

export const updateNationalClass = createAsyncThunk<
  void,
  {
    odp: OriginalDataPoint
    index: number
    field: keyof ODPNationalClass
    prevValue: string
    value: string
    assessmentName: string
    cycleName: string
  }
>(
  'originalDataPoint/updateNationalClass',
  async ({ odp, index, field, value, prevValue, assessmentName, cycleName }, { dispatch }) => {
    const updatedOdp = ODPs.updateNationalClass({
      odp,
      index,
      field,
      value: Sanitizer.acceptNextDecimal(value, prevValue),
    })
    dispatch(
      updateOriginalDataPoint({
        countryIso: updatedOdp.countryIso,
        assessmentName,
        cycleName,
        originalDataPoint: updatedOdp,
      })
    )
  }
)
