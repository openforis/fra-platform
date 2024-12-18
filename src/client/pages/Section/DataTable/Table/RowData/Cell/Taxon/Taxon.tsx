import './Taxon.scss'
import React from 'react'

import Select from 'client/components/Inputs/Select'
import { PropsCell } from 'client/pages/Section/DataTable/Table/RowData/Cell/props'

import { useIsValidNewOption } from './hooks/useIsValidNewOption'
import { useOnBlur } from './hooks/useOnBlur'
import { useOnChange } from './hooks/useOnChange'
import { useOnCreateOption } from './hooks/useOnCreateOption'
import { useOnInputChange } from './hooks/useOnInputChange'
import { useOptions } from './hooks/useOptions'
import { CURRENT_NODE_OPTION_VALUE } from './types'

const Taxon: React.FC<PropsCell> = (props: PropsCell) => {
  const { onChangeNodeValue, onPaste, disabled, nodeValue } = props

  const { data, handleInputChange, inputValue, onFocus } = useOnInputChange({ nodeValue })

  const options = useOptions({ data, inputValue, nodeValue })
  const isValidNewOption = useIsValidNewOption({
    nodeValue,
  })

  const onChange = useOnChange({ nodeValue, onChangeNodeValue, options })
  const onCreateOption = useOnCreateOption({ nodeValue, onChangeNodeValue })
  const onBlur = useOnBlur({ nodeValue, onChange, onCreateOption, options })

  return (
    <div className="table-grid__taxon-cell-container">
      <Select
        createOptionLabelKey="common.add"
        createOptionPosition="first"
        disabled={disabled}
        inputHidden={false}
        inputValue={!disabled ? inputValue : null}
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
        value={nodeValue?.taxonCode ?? CURRENT_NODE_OPTION_VALUE}
      />
    </div>
  )
}

export default Taxon
