import './LayersSectionPanel.scss'
import React, { useState } from 'react'

import { LayerKey, LayerSection } from '@meta/geo'

import GeoMapMenuListElement from '../../../GeoMapMenuListElement'
import LayerOpacityControl from './components/LayerOpacityControl'

interface Props {
  section: LayerSection
}

const LayersSectionPanel: React.FC<React.PropsWithChildren<Props>> = ({ section }) => {
  const handleOpacityChange = (value: number, layerKey: LayerKey | 'global') => {
    return [value, layerKey] // Placeholder for logic
  }
  const [checked, setChecked] = useState(false)

  const toggleLayer = (layerKey: LayerKey) => {
    setChecked((current) => !current)
    return layerKey // Placeholder for logic
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
          return (
            <GeoMapMenuListElement
              key={`${section.key}-${layer.key}`}
              title={layer.key}
              tabIndex={0}
              checked={checked}
              onCheckboxClick={() => toggleLayer(layer.key)}
              backgroundColor={layer.metadata?.palette?.[0]}
            >
              <LayerOpacityControl onChange={handleOpacityChange} checked={checked} layerKey={layer.key} />
            </GeoMapMenuListElement>
          )
        })}
      </div>
    </div>
  )
}

export default LayersSectionPanel
