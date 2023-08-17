import React from 'react'

import { Numbers } from 'utils/numbers'

import { PropsCell } from '../props'

const Calculated: React.FC<PropsCell> = (props) => {
  const { nodeValue, row } = props

  const value = nodeValue?.raw ? Numbers.format(Number(nodeValue.raw), row.props?.format?.integer ? 0 : 2) : ''

  return <div>{value}</div>
}

export default Calculated
