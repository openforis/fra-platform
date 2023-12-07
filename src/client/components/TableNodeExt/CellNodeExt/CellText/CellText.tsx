import React from 'react'

import TextInput from 'client/components/Inputs/InputText'

import { CellProps } from '../CellProps'

const CellText: React.FC<CellProps & { value: string }> = (props: CellProps & { value: string }) => {
  const { value, onChange, disabled } = props

  return <TextInput disabled={disabled} value={value} onChange={(event) => onChange(event.target.value)} />
}

export default CellText
