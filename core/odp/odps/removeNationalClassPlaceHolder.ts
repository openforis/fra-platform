import { ODP } from '@core/odp'

export const removeNationalClassPlaceHolder = (odp: ODP): ODP => ({
  ...odp,
  nationalClasses: [...odp.nationalClasses.filter((nationalClass) => !nationalClass.placeHolder)],
})
