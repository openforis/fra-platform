import './LayerOpacityControl.scss'
import React from 'react'

import { GLOBAL_OPACITY_KEY, LayerKey } from 'meta/geo'

interface Props {
  checked: boolean
  onChange: (value: number, layerKey: LayerKey | typeof GLOBAL_OPACITY_KEY) => void
  layerKey: LayerKey | typeof GLOBAL_OPACITY_KEY
  opacity: number
}

const LayerOpacityControl: React.FC<Props> = ({ checked, onChange, layerKey, opacity }) => {
  const handleOpacityChange = (event: React.FormEvent<HTMLInputElement>) => {
    const newValue = Math.round(Number(event.currentTarget.value) / 10) / 10
    onChange(newValue, layerKey)
  }

  // Avoid undefined warnings
  const opacityValue = opacity !== undefined ? opacity * 100 : 100

  return (
    <div className="geo-map-menu-layer-opacity-input-container">
      <div className="geo-map-menu-layer-opacity-input">
        <input type="range" min="0" max="100" value={opacityValue} onChange={handleOpacityChange} disabled={!checked} />
      </div>
      <div className="geo-map-menu-opacity-percentage-container">
        <small>{`${opacityValue}%`}</small>
      </div>
    </div>
  )
}

export default LayerOpacityControl
