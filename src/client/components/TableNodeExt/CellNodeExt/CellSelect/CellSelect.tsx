import React from 'react'

import Select from 'client/components/Inputs/Select'

import { CellSelectProps } from '../CellProps'
import { useValues } from './hooks/useValues'

const CellSelect: React.FC<CellSelectProps> = (props: CellSelectProps) => {
  const { onChange, disabled, column, value: _value } = props

  const { value, options } = useValues({ column, value: _value })

  return <Select disabled={disabled} value={value} onChange={onChange} options={options} />
}

export default CellSelect
