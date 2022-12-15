import './LayerOptionsPanel.scss'
import React from 'react'

import { ForestSource, hansenPercentages } from '@meta/geo/forest'

import { useAppDispatch } from '@client/store'
import { GeoActions, useForestSourceOptions } from '@client/store/ui/geo'

interface Props {
  opacityChange?: (layerKey: string, opacity: number) => void
  layerKey: string
}

const LayerOptionsPanel: React.FC<Props> = ({ layerKey, opacityChange }) => {
  const dispatch = useAppDispatch()
  const forestOptions = useForestSourceOptions()
  const opacity = forestOptions.opacity[layerKey] || 1

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const newValue = Math.round(Number(event.currentTarget.value) / 10) / 10
    dispatch(GeoActions.setOpacity({ key: layerKey, opacity: newValue }))
    opacityChange(layerKey, newValue)
  }

  return (
    <div className="geo-map-menu-forest-layer-options-panel">
      <div>
        <div>
          <input type="range" min="0" max="100" value={opacity * 100} onChange={handleChange} />
          <small>{`${opacity * 100}%`}</small>
          {layerKey === ForestSource.Hansen ? (
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
