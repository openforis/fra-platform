import './LayersSectionPanel.scss'
import React from 'react'

import { LayerKey, LayerSection } from '@meta/geo'

import { useAppDispatch } from '@client/store'
import { GeoActions, useGeoLayerSection } from '@client/store/ui/geo'

import GeoMapMenuListElement from '../../../GeoMapMenuListElement'
import CustomAssetControl from './components/CustomAssetControl'
import LayerOpacityControl from './components/LayerOpacityControl'

interface Props {
  section: LayerSection
}

const LayersSectionPanel: React.FC<React.PropsWithChildren<Props>> = ({ section }) => {
  const dispatch = useAppDispatch()
  const sectionState = useGeoLayerSection(section.key)

  const handleOpacityChange = (value: number, layerKey: LayerKey | 'global') => {
    return [value, layerKey] // Placeholder for logic
  }

  const toggleLayer = (layerKey: LayerKey) => {
    dispatch(GeoActions.toggleLayer({ sectionKey: section.key, layerKey }))
  }

  return (
    <div className="geo-map-section-panel-container">
      <div className="geo-map-section-panel-layers">
        {section.layers.length > 2 && (
          <GeoMapMenuListElement
            key={`${section.key}-global-opacity`}
            title="Global Opacity"
            tabIndex={0}
            checked={null}
          >
            <LayerOpacityControl onChange={handleOpacityChange} checked layerKey="global" />
          </GeoMapMenuListElement>
        )}
        {section.layers.map((layer) => {
          const isLayerSelected = sectionState?.[layer.key]?.selected || false // default to false
          if (layer.isCustomAsset)
            return (
              <CustomAssetControl
                key={`${section.key}-${layer.key}`}
                onToggle={toggleLayer}
                onOpacityChange={handleOpacityChange}
                checked={isLayerSelected}
                layerKey={layer.key}
                backgroundColor={layer.metadata?.palette?.[0]}
              />
            )

          return (
            <GeoMapMenuListElement
              key={`${section.key}-${layer.key}`}
              title={layer.key}
              tabIndex={0}
              checked={isLayerSelected}
              onCheckboxClick={() => toggleLayer(layer.key)}
              backgroundColor={layer.metadata?.palette?.[0]}
            >
              <LayerOpacityControl onChange={handleOpacityChange} checked={isLayerSelected} layerKey={layer.key} />
            </GeoMapMenuListElement>
          )
        })}
      </div>
    </div>
  )
}

export default LayersSectionPanel
