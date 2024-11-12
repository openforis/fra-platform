import './Select.scss'
import React, { useCallback } from 'react'

import { Cols } from 'meta/assessment'

import { useCycle } from 'client/store/assessment'
import SelectCommon from 'client/components/Inputs/Select'

import { PropsCell } from '../props'
import { useOptions } from './hooks/useOptions'

const Select: React.FC<PropsCell> = (props) => {
  const { col, disabled, nodeValue, onChange: onChangeProps } = props

  const cycle = useCycle()
  const options = useOptions({ col, nodeValue })

  const { isMulti } = Cols.getSelectProps({ cycle, col })

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
      <SelectCommon disabled={disabled} isMulti={isMulti} onChange={onChange} options={options} value={nodeValue.raw} />
    </div>
  )
}

export default Select
