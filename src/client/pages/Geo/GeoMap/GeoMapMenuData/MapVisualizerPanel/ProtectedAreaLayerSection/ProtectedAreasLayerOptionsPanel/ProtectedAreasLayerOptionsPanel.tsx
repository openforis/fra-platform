import './ProtectedAreasLayerOptionsPanel.scss'
import React, { useState } from 'react'

import { useAppDispatch } from 'client/store'
import { GeoActions, useIsGeoMapAvailable, useProtectedAreasOptions } from 'client/store/ui/geo'
import { mapController } from 'client/utils'

import { GLOBAL_OPACITY_KEY } from '../..'

interface Props {
  layerKey: string
  checked: boolean
}

const ProtectedAreasLayerOptionsPanel: React.FC<Props> = ({ layerKey, checked }) => {
  const dispatch = useAppDispatch()
  const protectedAreasOptions = useProtectedAreasOptions()
  const isMapAvailable = useIsGeoMapAvailable()
  const isLayerEnabled = checked && isMapAvailable
  const opacity = protectedAreasOptions.opacity[layerKey] !== undefined ? protectedAreasOptions.opacity[layerKey] : 1
  const [globalOpacity, setGlobalOpacity] = useState(0.5)

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const newValue = Math.round(Number(event.currentTarget.value) / 10) / 10
    dispatch(GeoActions.setProtectedAreaLayerOpacity({ key: layerKey, opacity: newValue }))
    mapController.setEarthEngineLayerOpacity(layerKey, newValue)
  }

  const handleGlobalOpacityChange = (event: React.FormEvent<HTMLInputElement>) => {
    const newGlobalOpacityValue = Math.round(Number(event.currentTarget.value) / 10) / 10
    setGlobalOpacity(newGlobalOpacityValue)
    protectedAreasOptions.selected.forEach((layerKey) => mapController.setEarthEngineLayerOpacity(layerKey, newGlobalOpacityValue))
    dispatch(GeoActions.setProtectedAreaGlobalOpacity(newGlobalOpacityValue))
  }

  return (
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
  )
}

export default ProtectedAreasLayerOptionsPanel
