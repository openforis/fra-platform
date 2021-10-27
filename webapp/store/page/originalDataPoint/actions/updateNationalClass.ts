import { ODP, ODPNationalClass, ODPs } from '@core/odp'
import { acceptNextDecimal } from '@webapp/utils/numberInput'
import { OriginalDataPointActions } from '@webapp/store/page/originalDataPoint'
import { AppDispatch } from '@webapp/store'

export const updateNationalClass = (
  props: { odp: ODP; index: number; field: keyof ODPNationalClass; prevValue: string; value: string },
  dispatch: AppDispatch
) => {
  const { odp, index, field, value, prevValue } = props

  const updatedOdp = ODPs.updateNationalClass({
    odp,
    index,
    field,
    value: acceptNextDecimal(value, prevValue),
  })
  dispatch(OriginalDataPointActions.updateODP({ odp: updatedOdp }))
}
