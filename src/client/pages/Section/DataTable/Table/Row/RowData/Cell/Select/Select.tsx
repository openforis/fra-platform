import './Select.scss'
import React, { useCallback } from 'react'

import SelectCommon from 'client/components/Inputs/Select'

import { PropsCell } from '../props'
import { useOptions } from './hooks/useOptions'

const Select: React.FC<PropsCell> = (props) => {
  const { col, disabled, nodeValue, onChange: onChangeProps } = props

  const options = useOptions({ col, nodeValue })

  const onChange = useCallback(
    (value: string | null) => {
      // TODO: Refactor -> onChange should take string | undefined, not event
      // @ts-ignore
      onChangeProps({ target: { value } })
    },
    [onChangeProps]
  )

  return (
    <div className="table__select-container">
      <SelectCommon disabled={disabled} onChange={onChange} options={options} value={nodeValue.raw} />
    </div>
  )
}

export default Select
