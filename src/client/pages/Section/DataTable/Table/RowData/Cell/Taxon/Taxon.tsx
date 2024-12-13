import './Taxon.scss'
import React from 'react'

import classNames from 'classnames'

import Select from 'client/components/Inputs/Select'
import { PropsCell } from 'client/pages/Section/DataTable/Table/RowData/Cell/props'

import { useOnChange } from './hooks/useOnChange'
import { useOnCreateOption } from './hooks/useOnCreateOption'
import { useOnInputChange } from './hooks/useOnInputChange'
import { useOptions } from './hooks/useOptions'

const Taxon: React.FC<PropsCell> = (props: PropsCell) => {
  const { onChangeNodeValue, onPaste, disabled, nodeValue } = props

  const { data, handleInputChange, inputValue, onBlur, onFocus } = useOnInputChange({ nodeValue })
  const { isValidNewOption, options, value } = useOptions({ data, nodeValue })

  const onChange = useOnChange({ nodeValue, onChangeNodeValue, options })
  const onCreateOption = useOnCreateOption({ nodeValue, onChangeNodeValue })

  return (
    <div className={classNames('table-grid__taxon-cell-container', { disabled })}>
      {disabled && inputValue}
      {!disabled && (
        <Select
          createOptionLabelKey="common.addValue"
          inputHidden={false}
          inputValue={inputValue ?? ''}
          isClearable={false}
          isCreatable
          isValidNewOption={isValidNewOption}
          onBlur={onBlur}
          onChange={onChange}
          onCreateOption={onCreateOption}
          onFocus={onFocus}
          onInputChange={handleInputChange}
          onPaste={onPaste}
          options={options}
          value={value}
        />
      )}
    </div>
  )
}

export default Taxon
