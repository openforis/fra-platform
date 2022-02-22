import { ODPNationalClass, ODPs } from '@core/odp'
import { acceptNextDecimal } from '@client/utils/numberInput'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { OriginalDataPoint } from '@meta/assessment'
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
      value: acceptNextDecimal(value, prevValue),
    })
    dispatch(
      updateOriginalDataPoint({
        assessmentName,
        cycleName,
        odpId: String(updatedOdp.id),
        originalDataPoint: updatedOdp,
      })
    )
  }
)
