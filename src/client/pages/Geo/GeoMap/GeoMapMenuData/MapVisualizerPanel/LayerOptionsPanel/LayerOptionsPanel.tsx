import './LayerOptionsPanel.scss'
import React, { useRef } from 'react'
import { batch } from 'react-redux'

import { ForestSource, HansenPercentage, hansenPercentages } from '@meta/geo/forest'

import { useAppDispatch } from '@client/store'
import { GeoActions, useForestSourceOptions } from '@client/store/ui/geo'
import { useGeoMap } from '@client/hooks'
import { MapController } from '@client/utils'

interface Props {
  layerKey: string
  checked: boolean
}

const LayerOptionsPanel: React.FC<Props> = ({ layerKey, checked }) => {
  const dispatch = useAppDispatch()
  const forestOptions = useForestSourceOptions()
  const map = useGeoMap()
  const mapControllerRef = useRef<MapController>(new MapController(map))
  const opacity = forestOptions.opacity[layerKey] !== undefined ? forestOptions.opacity[layerKey] : 1

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const newValue = Math.round(Number(event.currentTarget.value) / 10) / 10
    dispatch(GeoActions.setOpacity({ key: layerKey, opacity: newValue }))
    mapControllerRef.current.setEarthEngineLayerOpacity(layerKey, newValue)
  }

  const handleHansenPercentageChange = (percentage: HansenPercentage) => {
    batch(() => {
      dispatch(GeoActions.setRecipe('custom'))
      dispatch(GeoActions.setHansenPercentage(percentage))
    })
  }

  return (
    <>
      <div className="geo-map-menu-forest-layer-opacity-input">
        <div>
          <input type="range" min="0" max="100" value={opacity * 100} onChange={handleChange} disabled={!checked} />{' '}
        </div>
        <div>
          <small>{`${opacity * 100}%`}</small>
        </div>
      </div>
      {layerKey === ForestSource.Hansen && checked ? (
        <div className="geo-map-menu-forest-hansen-layer-inputs">
          <div>
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
