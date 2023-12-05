import React, { useCallback } from 'react'

import SelectCommon, { Option } from 'client/components/Inputs/Select'

import { PropsCell } from '../props'
import { useValues } from './hooks/useValues'

const Select: React.FC<PropsCell> = (props) => {
  const { col, disabled, nodeValue, onChange: onChangeProps } = props

  const { options, value } = useValues({ col, nodeValue })

  const onChange = useCallback(
    (option: Option) => {
      // TODO: Refactor -> onChange should take string | undefined, not event
      // @ts-ignore
      onChangeProps({ target: { value: option?.value ?? null } })
    },
    [onChangeProps]
  )

  return (
    <div className="table__select">
      <SelectCommon disabled={disabled} onChange={onChange} options={options} value={value} />
    </div>
  )
}

export default Select
