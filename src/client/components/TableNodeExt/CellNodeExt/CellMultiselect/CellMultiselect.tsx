import React from 'react'

import MultiSelect from 'client/components/MultiSelect'

import { CellValueMultiProps } from '../CellProps'
import { useOptions } from './hooks/useOptions'

const CellMultiselect: React.FC<CellValueMultiProps> = (props: CellValueMultiProps) => {
  const { value, onChange, disabled, column } = props
  const options = useOptions(column.props.options)

  return <MultiSelect disabled={disabled} options={options} values={value} onChange={onChange} />
}

export default CellMultiselect
