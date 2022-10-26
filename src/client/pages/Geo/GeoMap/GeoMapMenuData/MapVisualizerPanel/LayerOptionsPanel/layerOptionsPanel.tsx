import './layerOptionsPanel.scss'
import React, { useCallback, useState } from 'react'

interface Props {
  forestLayerOpacity: number
  hansenPercentage: number
  opacityChange?: (layerKey: string, opacity: number) => void
  setHansenPercentageCallback?: (percentage: number) => void
  layerKey: string
}

const LayerOptionsPanel: React.FC<Props> = ({
  forestLayerOpacity,
  layerKey,
  hansenPercentage,
  opacityChange,
  setHansenPercentageCallback,
}) => {
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

  const handleHansenChange = useCallback(
    (event) => {
      const newValue = Math.round(event.target.value / 10) * 10
      setHansenPercentageCallback(newValue)
    },
    [setHansenPercentageCallback]
  )

  return (
    <div className="geo-map-menu-forest-layer-options-panel">
      <div>
        <div>
          <input type="range" min="0" max="100" value={sliderValue * 100} onChange={handleChange} />
          <small>{`${sliderValue * 100}%`}</small>
          {layerKey === 'Hansen' ? (
            <div>
              <p>Select Hansen percentage:</p>
              <fieldset>
                <label htmlFor="10">
                  <input
                    type="radio"
                    checked={hansenPercentage === 10}
                    name="hansenPercentageRadio"
                    id="10"
                    value={10}
                    onChange={handleHansenChange}
                  />
                  <small>10%</small>
                </label>
                <label htmlFor="20">
                  <input
                    type="radio"
                    checked={hansenPercentage === 20}
                    name="hansenPercentageRadio"
                    id="20"
                    value={20}
                    onChange={handleHansenChange}
                  />
                  <small>20%</small>
                </label>
                <label htmlFor="30">
                  <input
                    type="radio"
                    checked={hansenPercentage === 30}
                    name="hansenPercentageRadio"
                    id="30"
                    value={30}
                    onChange={handleHansenChange}
                  />
                  <small>30%</small>
                </label>
              </fieldset>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

LayerOptionsPanel.defaultProps = {
  opacityChange: null,
  setHansenPercentageCallback: null,
}

export default LayerOptionsPanel
