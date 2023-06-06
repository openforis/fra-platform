import './BurnedAreaLayerSection.scss'
import React from 'react'

import { BurnedAreaKey, LayerStatus } from 'meta/geo'

import { useAppDispatch } from 'client/store'
import { GeoActions, useBurnedAreasOptions } from 'client/store/ui/geo'

import GeoMapMenuListElement from '../../../GeoMapMenuListElement'
import { burnedAreaLayers, GLOBAL_OPACITY_KEY } from '../layers'
import BurnedAreasLayerOptionsPanel from './BurnedAreasLayerOptionsPanel'

const BurnedAreasLayerSection: React.FC = () => {
  const dispatch = useAppDispatch()
  const burnedAreasOptions = useBurnedAreasOptions()
  const toggleBurnedAreaLayer = (key: BurnedAreaKey) => {
    dispatch(GeoActions.toggleBurnedAreaLayer(key))
  }

  return (
    <div className="geo-map-menu-data-visualizer-panel-burned-areas">
      <div className="geo-map-menu-data-visualizer-panel-burned-areas-layers">
        {burnedAreaLayers.length > 1 && ( // Render only when there are multiple layers
          <div key={GLOBAL_OPACITY_KEY}>
            <GeoMapMenuListElement title="Global Opacity" tabIndex={0}>
              <BurnedAreasLayerOptionsPanel layerKey={GLOBAL_OPACITY_KEY} checked />
            </GeoMapMenuListElement>
          </div>
        )}
        {burnedAreaLayers.map((layer) => {
          const key =
            layer.key + (layer.key === BurnedAreaKey.MODIS ? `__${burnedAreasOptions.applied.selectedYear}` : '')
          const isLayerChecked = burnedAreasOptions.selected.includes(layer.key)
          let status = null
          if (burnedAreasOptions.pendingLayers[key] !== undefined) status = LayerStatus.loading
          if (burnedAreasOptions.fetchedLayers[key] !== undefined) status = LayerStatus.ready
          if (burnedAreasOptions.failedLayers[key] !== undefined) status = LayerStatus.failed
          // If the status continues to be null, it means it has not been attempted to fetch the layer
          return (
            <div key={layer.key}>
              <GeoMapMenuListElement
                title={layer.title}
                tabIndex={0}
                checked={isLayerChecked}
                onCheckboxClick={() => toggleBurnedAreaLayer(layer.key)}
                backgroundColor={layer.key.toLowerCase()}
                loadingStatus={status}
              >
                <BurnedAreasLayerOptionsPanel layerKey={layer.key} checked={isLayerChecked} />
              </GeoMapMenuListElement>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default BurnedAreasLayerSection
