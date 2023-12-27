import React from 'react'

import Select from 'client/components/Inputs/Select'

import { CellSelectProps } from '../CellProps'

const CellSelect: React.FC<CellSelectProps> = (props) => {
  const { column, disabled, nodeExt, onChange } = props

  const value = nodeExt.value.raw

  return <Select disabled={disabled} value={value} onChange={onChange} options={column.props.options} />
}

export default CellSelect
