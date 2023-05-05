import './CustomAssetControl.scss'
import React, { ChangeEvent, useState } from 'react'

import classNames from 'classnames'

import { LayerKey } from '@meta/geo'

import LayerOpacityControl from '../LayerOpacityControl'

interface Props {
  checked: boolean
  opacity: number
  onOpacityChange: (value: number, layerKey: LayerKey) => void
  onToggle: (layerKey: LayerKey) => void
  layerKey: LayerKey
  backgroundColor?: string
}

const CustomAssetControl: React.FC<Props> = ({
  checked,
  opacity,
  onToggle,
  onOpacityChange,
  layerKey,
  backgroundColor,
}) => {
  const [inputValue, setInputValue] = useState<string>('')
  const [inputError, setInputError] = useState(false)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value)
    if (inputError && event.target.value.trim() !== '') {
      setInputError(false)
    }
  }

  const handleSubmit = (): void => {
    if (inputValue.trim() === '') {
      setInputError(true)
    } else {
      setInputError(false)
    }
  }

  return (
    <>
      <div className="custom-asset-list-element">
        <div className="custom-asset-item-title">
          <div
            className="custom-asset-list-element-checkbox"
            role="checkbox"
            aria-checked={checked}
            tabIndex={0}
            onClick={() => onToggle(layerKey)}
            onKeyDown={() => onToggle(layerKey)}
          >
            <div style={checked ? { backgroundColor } : {}} className={classNames('fra-checkbox', { checked })} />
          </div>
          <div className="custom-input-container">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Asset ID"
              className={classNames('custom-input', inputError ? 'error' : '')}
            />
            <button type="button" className="btn-primary" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
        <LayerOpacityControl layerKey={layerKey} checked={checked} onChange={onOpacityChange} opacity={opacity} />
      </div>
      <div className="custom-asset-list-element-bottom" />
    </>
  )
}

CustomAssetControl.defaultProps = {
  backgroundColor: null,
}

export default CustomAssetControl
