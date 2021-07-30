import { Objects } from '@core/utils'

import { ODP } from '../odp'
import { ODPNationalClass, ODPNationalClassFactory } from '../odpNationalClass'

export const updateNationalClass = (props: { odp: ODP; index: number; field: string; value: string }): ODP => {
  const { odp: odpProps, index, field, value } = props

  const odp: ODP = Objects.cloneDeep(odpProps)
  const nationalClass: ODPNationalClass = { ...odp.nationalClasses[index], [field]: value }

  const wasPlaceHolder = !Objects.isNil(nationalClass.placeHolder)
  delete nationalClass.placeHolder

  odp.nationalClasses[index] = nationalClass
  if (wasPlaceHolder) {
    odp.nationalClasses.push(ODPNationalClassFactory.newNationalClassPlaceholder())
  }

  return odp
}
