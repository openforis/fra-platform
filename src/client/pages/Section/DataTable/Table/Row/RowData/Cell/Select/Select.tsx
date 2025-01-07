import './Select.scss'
import React, { useCallback } from 'react'

import { Cols } from 'meta/assessment'

import { useCycle } from 'client/store/assessment'
import SelectCommon from 'client/components/Inputs/Select'

import { PropsCell } from '../props'
import { useOptions } from './hooks/useOptions'

const Select: React.FC<PropsCell> = (props) => {
  const { col, disabled, nodeValue, onChangeNodeValue } = props

  const cycle = useCycle()
  const options = useOptions({ col, nodeValue })

  const { isMulti } = Cols.getSelectProps({ cycle, col })

  const onChange = useCallback(
    (raw: string | Array<string> | null) => {
      onChangeNodeValue({ ...nodeValue, raw })
    },
    [nodeValue, onChangeNodeValue]
  )

  return (
    <div className="table__select-container">
      <SelectCommon disabled={disabled} isMulti={isMulti} onChange={onChange} options={options} value={nodeValue.raw} />
    </div>
  )
}

export default Select
