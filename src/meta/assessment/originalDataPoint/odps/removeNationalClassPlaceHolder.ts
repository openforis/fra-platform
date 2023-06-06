import { OriginalDataPoint } from 'meta/assessment'

export const removeNationalClassPlaceHolder = (odp: OriginalDataPoint): OriginalDataPoint => ({
  ...odp,
  nationalClasses: [...odp.nationalClasses.filter((nationalClass) => !nationalClass.placeHolder)],
})
