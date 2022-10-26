import './layerOptionsPanel.scss'
import React, { useCallback, useState } from 'react'

interface Props {
  forestLayerOpacity: number
  opacityChange?: (layerKey: string, opacity: number) => void
  layerKey: string
}

const LayerOptionsPanel: React.FC<Props> = ({ forestLayerOpacity, opacityChange, layerKey }) => {
  const thisLayerKey = layerKey
  const [sliderValue, setSliderValue] = useState(forestLayerOpacity)

  const handleChange = useCallback(
    (event) => {
      const newValue = Math.round(event.target.value / 10) / 10
      setSliderValue(newValue)
      opacityChange(thisLayerKey, newValue)
    },
    [opacityChange, thisLayerKey]
  )

  return (
    <div className="geo-map-menu-forest-layer-options-panel">
      <div>
        <div>
          <input type="range" min="0" max="100" value={sliderValue * 100} onChange={handleChange} />
          {`${sliderValue * 100}%`}
        </div>
      </div>
    </div>
  )
}

LayerOptionsPanel.defaultProps = {
  opacityChange: null,
}

export default LayerOptionsPanel
