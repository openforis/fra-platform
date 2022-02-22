import { Objects } from '@core/utils'
import { OriginalDataPoint } from '@meta/assessment'

import { ODPNationalClass, ODPNationalClassFactory } from '../odpNationalClass'

export const updateNationalClass = (props: {
  odp: OriginalDataPoint
  index: number
  field: keyof ODPNationalClass
  value: string
}): OriginalDataPoint => {
  const { odp: odpProps, index, field, value } = props

  const odp: OriginalDataPoint = Objects.cloneDeep(odpProps)
  const nationalClass: ODPNationalClass = { ...odp.nationalClasses[index], [field]: value }

  const wasPlaceHolder = !Objects.isNil(nationalClass.placeHolder)
  delete nationalClass.placeHolder

  odp.nationalClasses[index] = nationalClass
  if (wasPlaceHolder) {
    odp.nationalClasses.push(ODPNationalClassFactory.newNationalClassPlaceholder())
  }

  return odp
}
