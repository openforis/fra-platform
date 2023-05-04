import './LayerOpacityControl.scss'
import React, { useState } from 'react'

import { LayerKey } from '@meta/geo'

interface Props {
  checked: boolean
  onChange: (value: number, layerKey: LayerKey | 'global') => void
  layerKey: LayerKey | 'global'
}

const LayerOpacityControl: React.FC<Props> = ({ checked, onChange, layerKey }) => {
  const [opacity, setOpacity] = useState(0.5) // This will be changed to use redux instead

  const handleOpacityChange = (event: React.FormEvent<HTMLInputElement>) => {
    const newValue = Math.round(Number(event.currentTarget.value) / 10) / 10
    setOpacity(newValue)
    onChange(newValue, layerKey)
  }

  return (
    <div className="geo-map-menu-layer-opacity-input-container">
      <div className="geo-map-menu-layer-opacity-input">
        <input
          type="range"
          min="0"
          max="100"
          value={opacity * 100}
          onChange={handleOpacityChange}
          disabled={!checked}
        />
      </div>
      <div className="geo-map-menu-opacity-percentage-container">
        <small>{`${opacity * 100}%`}</small>
      </div>
    </div>
  )
}

export default LayerOpacityControl
