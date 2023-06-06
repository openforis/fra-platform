import './ProtectedAreaLayerSection.scss'
import React from 'react'

import { LayerStatus, ProtectedAreaKey } from 'meta/geo'

import { useAppDispatch } from 'client/store'
import { GeoActions, useProtectedAreasOptions } from 'client/store/ui/geo'

import GeoMapMenuListElement from '../../../GeoMapMenuListElement'
import { GLOBAL_OPACITY_KEY, protectedAreaLayers } from '../layers'
import CustomAssetControl from './CustomAssetControl'
import ProtectedAreasLayerOptionsPanel from './ProtectedAreasLayerOptionsPanel'

const ProtectedAreasLayerSection: React.FC = () => {
  const dispatch = useAppDispatch()
  const protectedAreasOptions = useProtectedAreasOptions()
  const toggleProtectedAreaLayer = (key: ProtectedAreaKey) => {
    dispatch(GeoActions.toggleProtectedAreaLayer(key))
  }

  return (
    <div className="geo-map-menu-data-visualizer-panel-protected-areas">
      <div className="geo-map-menu-data-visualizer-panel-protected-areas-layers">
        <div key={GLOBAL_OPACITY_KEY}>
          <GeoMapMenuListElement title="Global Opacity" tabIndex={0}>
            <ProtectedAreasLayerOptionsPanel layerKey={GLOBAL_OPACITY_KEY} checked />
          </GeoMapMenuListElement>
        </div>
        {protectedAreaLayers.map((layer) => {
          if (layer.key === ProtectedAreaKey.CustomPA) return false
          const isLayerChecked = protectedAreasOptions.selected.includes(layer.key)
          let status = null
          if (protectedAreasOptions.pendingLayers[layer.key] !== undefined) status = LayerStatus.loading
          if (protectedAreasOptions.fetchedLayers[layer.key] !== undefined) status = LayerStatus.ready
          if (protectedAreasOptions.failedLayers[layer.key] !== undefined) status = LayerStatus.failed
          // If the status continues to be null, it means it has not been attempted to fetch the layer
          return (
            <div key={layer.key}>
              <GeoMapMenuListElement
                title={layer.title}
                tabIndex={0}
                checked={isLayerChecked}
                onCheckboxClick={() => toggleProtectedAreaLayer(layer.key)}
                backgroundColor={layer.key.toLowerCase()}
                loadingStatus={status}
              >
                <ProtectedAreasLayerOptionsPanel layerKey={layer.key} checked={isLayerChecked} />
              </GeoMapMenuListElement>
            </div>
          )
        })}
        <CustomAssetControl />
      </div>
    </div>
  )
}

export default ProtectedAreasLayerSection
