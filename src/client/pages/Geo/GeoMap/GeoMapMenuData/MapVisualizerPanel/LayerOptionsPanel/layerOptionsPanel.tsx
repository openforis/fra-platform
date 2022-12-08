import './layerOptionsPanel.scss'
import React, { useCallback, useState } from 'react'

import { hansenPercentages } from '@meta/geo/forest'

import { useAppDispatch } from '@client/store'
import { GeoActions, useForestSourceOptions } from '@client/store/ui/geo'

interface Props {
  forestLayerOpacity: number
  opacityChange?: (layerKey: string, opacity: number) => void
  layerKey: string
}

const LayerOptionsPanel: React.FC<Props> = ({ forestLayerOpacity, layerKey, opacityChange }) => {
  const dispatch = useAppDispatch()
  const forestOptions = useForestSourceOptions()
  const thisLayerKey = layerKey
  const [sliderValue, setSliderValue] = useState(forestLayerOpacity)

  const handleChange = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      const newValue = Math.round(Number(event.currentTarget.value) / 10) / 10
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
          <small>{`${sliderValue * 100}%`}</small>
          {layerKey === 'Hansen' ? (
            <div>
              <p>Select Hansen percentage:</p>
              <fieldset>
                {hansenPercentages.map((percentage) => {
                  const id = `hansenPercentage-${percentage}`
                  return (
                    <label htmlFor={id} key={id}>
                      <input
                        type="radio"
                        checked={forestOptions.hansenPercentage === percentage}
                        id={id}
                        onChange={() => dispatch(GeoActions.setHansenPercentage(percentage))}
                      />
                      <small>{percentage} %</small>
                    </label>
                  )
                })}
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
}

export default LayerOptionsPanel
