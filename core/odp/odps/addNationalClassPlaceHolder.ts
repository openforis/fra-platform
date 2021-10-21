import { ODP, ODPNationalClassFactory } from '@core/odp'

export const addNationalClassPlaceHolder = (odp: ODP): ODP => ({
  ...odp,
  nationalClasses: [...odp.nationalClasses, ODPNationalClassFactory.newNationalClassPlaceholder()],
})
