import './LayerOptionsPanel.scss'
import React, { useState } from 'react'
import { batch } from 'react-redux'

import { ForestSource, HansenPercentage, hansenPercentages } from 'meta/geo/forest'

import { useAppDispatch } from 'client/store'
import { GeoActions, useForestSourceOptions, useIsGeoMapAvailable } from 'client/store/ui/geo'
import { mapController } from 'client/utils'

import { GLOBAL_OPACITY_KEY } from '..'

interface Props {
  layerKey: string
  checked: boolean
}

const LayerOptionsPanel: React.FC<Props> = ({ layerKey, checked }) => {
  const dispatch = useAppDispatch()
  const forestOptions = useForestSourceOptions()
  const isMapAvailable = useIsGeoMapAvailable()
  const isLayerEnabled = checked && isMapAvailable
  const opacity = forestOptions.opacity[layerKey] !== undefined ? forestOptions.opacity[layerKey] : 1
  const [globalOpacity, setGlobalOpacity] = useState(0.5)

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const newValue = Math.round(Number(event.currentTarget.value) / 10) / 10
    dispatch(GeoActions.setForestLayerOpacity({ key: layerKey, opacity: newValue }))
    mapController.setEarthEngineLayerOpacity(layerKey, newValue)
  }

  const handleHansenPercentageChange = (percentage: HansenPercentage) => {
    batch(() => {
      dispatch(GeoActions.setForestLayersRecipe('custom'))
      dispatch(GeoActions.setHansenPercentage(percentage))
    })
  }

  const handleGlobalOpacityChange = (event: React.FormEvent<HTMLInputElement>) => {
    const newGlobalOpacityValue = Math.round(Number(event.currentTarget.value) / 10) / 10
    setGlobalOpacity(newGlobalOpacityValue)
    forestOptions.selected.forEach((layerKey) =>
      mapController.setEarthEngineLayerOpacity(layerKey, newGlobalOpacityValue)
    )
    dispatch(GeoActions.setForestGlobalOpacity(newGlobalOpacityValue))
  }

  return (
    <>
      <div className="geo-map-menu-forest-layer-opacity-input">
        <div className="geo-map-menu-forest-layer-opacity-input-div">
          <input
            type="range"
            min="0"
            max="100"
            value={(layerKey === GLOBAL_OPACITY_KEY ? globalOpacity : opacity) * 100}
            onChange={layerKey === GLOBAL_OPACITY_KEY ? handleGlobalOpacityChange : handleChange}
            disabled={!isLayerEnabled}
          />{' '}
        </div>
        <div className="geo-map-menu-forest-layer-opacity-percentage-div">
          <small>{`${(layerKey === GLOBAL_OPACITY_KEY ? globalOpacity : opacity) * 100}%`}</small>
        </div>
      </div>
      {layerKey === ForestSource.Hansen && isLayerEnabled ? (
        <div className="geo-map-menu-forest-hansen-layer-inputs">
          <div>
            <div>
              <p>Select min. tree cover percentage:</p>
              <fieldset>
                {hansenPercentages.map((percentage) => {
                  const id = `hansenPercentage-${percentage}`
                  return (
                    <label htmlFor={id} key={id}>
                      <input
                        type="radio"
                        checked={forestOptions.hansenPercentage === percentage}
                        id={id}
                        onChange={() => handleHansenPercentageChange(percentage)}
                      />
                      <small>{percentage} %</small>
                    </label>
                  )
                })}
              </fieldset>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default LayerOptionsPanel
