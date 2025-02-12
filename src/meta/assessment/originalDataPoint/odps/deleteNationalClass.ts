import { Objects } from 'utils/objects'

import { ODPs } from 'meta/assessment/originalDataPoint/odps/index'

import { OriginalDataPoint } from '../originalDataPoint'

export const deleteNationalClass = (props: { odp: OriginalDataPoint; index: number }): OriginalDataPoint => {
  const { odp: odpProps, index } = props

  const odp: OriginalDataPoint = Objects.cloneDeep(odpProps)
  odp.nationalClasses.splice(index, 1)

  return ODPs.calculateValues(odp)
}
