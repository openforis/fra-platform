import './LayersSectionPanel.scss'
import React, { useState } from 'react'

import { GLOBAL_OPACITY_KEY, LayerKey, LayerSection } from '@meta/geo'

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
  const [globalOpacity, setGlobalOpacity] = useState(0.5)

  const handleOpacityChange = (opacity: number, layerKey: LayerKey | typeof GLOBAL_OPACITY_KEY) => {
    if (layerKey === GLOBAL_OPACITY_KEY) {
      setGlobalOpacity(opacity)
      dispatch(GeoActions.setSectionGlobalOpacity({ sectionKey: section.key, opacity }))
    } else {
      dispatch(GeoActions.setLayerOpacity({ sectionKey: section.key, layerKey, opacity }))
    }
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
            <LayerOpacityControl
              onChange={handleOpacityChange}
              checked
              layerKey={GLOBAL_OPACITY_KEY}
              opacity={globalOpacity}
            />
          </GeoMapMenuListElement>
        )}
        {section.layers.map((layer) => {
          const isLayerSelected = sectionState?.[layer.key]?.selected || false // default to false
          const opacity = sectionState?.[layer.key]?.opacity ?? 1
          if (layer.isCustomAsset)
            return (
              <CustomAssetControl
                key={`${section.key}-${layer.key}`}
                onToggle={toggleLayer}
                onOpacityChange={handleOpacityChange}
                opacity={opacity}
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
              <LayerOpacityControl
                onChange={handleOpacityChange}
                checked={isLayerSelected}
                layerKey={layer.key}
                opacity={opacity}
              />
            </GeoMapMenuListElement>
          )
        })}
      </div>
    </div>
  )
}

export default LayersSectionPanel
