import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

export const removeNationalClassPlaceHolder = (odp: OriginalDataPoint): OriginalDataPoint => ({
  ...odp,
  nationalClasses: [...odp.nationalClasses.filter((nationalClass) => !nationalClass.placeHolder)],
})
