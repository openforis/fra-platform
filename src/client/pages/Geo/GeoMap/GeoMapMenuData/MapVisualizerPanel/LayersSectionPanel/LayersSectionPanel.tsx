import './LayersSectionPanel.scss'
import React, { useState } from 'react'
import { batch } from 'react-redux'

import { LayerRequestBody } from '@meta/api/request/geo/layer'
import { GLOBAL_OPACITY_KEY, LayerKey, LayerSection, sectionsApiEndpoint } from '@meta/geo'

import { useAppDispatch } from '@client/store'
import { GeoActions, useGeoLayerSection } from '@client/store/ui/geo'
import { LayerFetchStatus } from '@client/store/ui/geo/stateType'
import { useCountryIso } from '@client/hooks'

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
  const countryIso = useCountryIso()

  const handleOpacityChange = (opacity: number, layerKey: LayerKey | typeof GLOBAL_OPACITY_KEY) => {
    if (layerKey === GLOBAL_OPACITY_KEY) {
      setGlobalOpacity(opacity)
      dispatch(GeoActions.setSectionGlobalOpacity({ sectionKey: section.key, opacity }))
    } else {
      dispatch(GeoActions.setLayerOpacity({ sectionKey: section.key, layerKey, opacity }))
    }
  }

  const toggleLayer = (layerKey: LayerKey) => {
    const layerState = sectionState?.[layerKey]
    const newSelectedState = !layerState?.selected
    const currentMapId = layerState?.mapId
    batch(() => {
      // If the layer is selected and doesn't have a mapId cached, fetch it
      if (newSelectedState && !currentMapId) {
        const requestBody: LayerRequestBody = {
          countryIso,
          layer: {
            key: layerKey as LayerKey,
            ...(layerState?.options && { options: { ...layerState.options } }),
          },
        }
        const uri = sectionsApiEndpoint[section.key]
        dispatch(GeoActions.postLayer({ sectionKey: section.key, layerKey, uri, body: requestBody }))
      }
      dispatch(GeoActions.toggleLayer({ sectionKey: section.key, layerKey }))
    })
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
          const loadingStatus = sectionState?.[layer.key]?.status ?? LayerFetchStatus.Unfetched
          if (layer.isCustomAsset)
            return (
              <CustomAssetControl
                key={`${section.key}-${layer.key}`}
                onToggle={toggleLayer}
                onOpacityChange={handleOpacityChange}
                opacity={opacity}
                checked={isLayerSelected}
                sectionKey={section.key}
                layerKey={layer.key}
                backgroundColor={layer.metadata?.palette?.[0]}
                loadingStatus={loadingStatus}
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
              loadingStatus={loadingStatus}
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
