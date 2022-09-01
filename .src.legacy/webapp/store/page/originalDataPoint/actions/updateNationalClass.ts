import { ODP, ODPNationalClass, ODPs } from '@core/odp'
import { acceptNextDecimal } from '@webapp/utils/numberInput'
import { OriginalDataPointActions } from '@webapp/store/page/originalDataPoint'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const updateNationalClass = createAsyncThunk<
  void,
  { odp: ODP; index: number; field: keyof ODPNationalClass; prevValue: string; value: string }
>('originalDataPoint/updateNationalClass', async ({ odp, index, field, value, prevValue }, { dispatch }) => {
  const updatedOdp = ODPs.updateNationalClass({
    odp,
    index,
    field,
    value: acceptNextDecimal(value, prevValue),
  })
  dispatch(OriginalDataPointActions.updateODP({ odp: updatedOdp }))
})
