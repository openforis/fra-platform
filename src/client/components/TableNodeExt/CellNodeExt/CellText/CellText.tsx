import React from 'react'

import TextInput from 'client/components/Inputs/InputText'

import { CellTextProps } from '../CellProps'

const CellText: React.FC<CellTextProps> = (props: CellTextProps) => {
  const { value, onChange, disabled } = props

  return <TextInput disabled={disabled} value={value} onChange={(event) => onChange(event.target.value)} />
}

export default CellText
