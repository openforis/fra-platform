import React from 'react'

import { Numbers } from '@core/utils'

import { PropsCell } from '../props'

const Calculated: React.FC<PropsCell> = (props) => {
  const { datum, row } = props

  const value = datum ? Numbers.format(Number(datum), row.props?.format?.integer ? 0 : 2) : ''

  return <div>{value}</div>
}

export default Calculated
