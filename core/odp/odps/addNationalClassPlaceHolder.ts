import { ODPNationalClassFactory } from '@core/odp/odpNationalClass'
import { OriginalDataPoint } from '@meta/assessment'

export const addNationalClassPlaceHolder = (odp: OriginalDataPoint): OriginalDataPoint => ({
  ...odp,
  nationalClasses: [...odp.nationalClasses, ODPNationalClassFactory.newNationalClassPlaceholder()],
})
