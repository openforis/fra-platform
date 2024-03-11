import './LayersSection.scss'
import React from 'react'

import { LayerSection } from 'meta/geo'

import GlobalOpacity from 'client/components/Navigation/NavGeo/GlobalOpacity'
import Layer from 'client/components/Navigation/NavGeo/Layer/Layer'
import RecipeSelector from 'client/components/Navigation/NavGeo/RecipeSelector'

type Props = {
  section: LayerSection
}

const LayersSection: React.FC<React.PropsWithChildren<Props>> = (props) => {
  const { section } = props

  return (
    <div className="geo-layer-section-panel__container">
      {section.recipes !== undefined && <RecipeSelector recipes={section.recipes} sectionKey={section.key} />}
      {section.layers.length > 2 && <GlobalOpacity sectionKey={section.key} />}
      <div className="geo-layer-section-panel__layer-container">
        {section.layers.map((layer) => {
          return <Layer key={`geo-layer-section-${section.key}-${layer.key}`} layer={layer} section={section} />
        })}
      </div>
    </div>
  )
}

export default LayersSection
