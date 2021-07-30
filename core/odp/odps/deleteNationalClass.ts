import { Objects } from '@core/utils'

import { ODP } from '../odp'

export const deleteNationalClass = (props: { odp: ODP; index: number }): ODP => {
  const { odp: odpProps, index } = props

  const odp: ODP = Objects.cloneDeep(odpProps)
  odp.nationalClasses.splice(index, 1)

  return odp
}
