import './LayersSection.scss'
import React from 'react'

import { LayerSection } from 'meta/geo'

import OptionsGrid from 'client/components/Navigation/NavGeo/Grid/OptionsGrid'
import Layer from 'client/components/Navigation/NavGeo/Layer/Layer'
import GlobalOpacity from 'client/components/Navigation/NavGeo/LayersSection/GlobalOpacity'
import RecipeSelector from 'client/components/Navigation/NavGeo/LayersSection/RecipeSelector'

type Props = {
  section: LayerSection
}

const LayersSection: React.FC<React.PropsWithChildren<Props>> = (props) => {
  const { section } = props

  return (
    <>
      {section.recipes !== undefined && <RecipeSelector recipes={section.recipes} sectionKey={section.key} />}
      {section.layers.length > 2 && <GlobalOpacity sectionKey={section.key} />}
      <OptionsGrid className="geo-layers-section">
        {section.layers.map((layer) => {
          return <Layer key={`geo-layer-section-${section.key}-${layer.key}`} layer={layer} section={section} />
        })}
      </OptionsGrid>
    </>
  )
}

export default LayersSection
