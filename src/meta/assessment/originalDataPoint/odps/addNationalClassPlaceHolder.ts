import { OriginalDataPoint } from 'meta/assessment'
import { ODPNationalClassFactory } from 'meta/assessment/originalDataPoint'

export const addNationalClassPlaceHolder = (odp: OriginalDataPoint): OriginalDataPoint => ({
  ...odp,
  nationalClasses: [...odp.nationalClasses, ODPNationalClassFactory.newNationalClassPlaceholder()],
})
