import { Objects } from 'utils/objects'

import { OriginalDataPoint } from 'meta/assessment/originalDataPoint'

import { calculateValues } from './calc'

export const deleteNationalClass = (props: { odp: OriginalDataPoint; index: number }): OriginalDataPoint => {
  const { odp: odpProps, index } = props

  const odp: OriginalDataPoint = Objects.cloneDeep(odpProps)
  odp.nationalClasses.splice(index, 1)

  return calculateValues(odp)
}
