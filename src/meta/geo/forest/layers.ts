import { Arrays } from 'utils/arrays'

import { forestAgreementRecipes } from 'meta/geo/forest/agreementRecipes'
import { ForestKey } from 'meta/geo/forest/key'
import { forestLayersMetadata } from 'meta/geo/forest/layersMetadata'
import { hansenPercentages } from 'meta/geo/hansen'
import { LayerSection } from 'meta/geo/layer/section'
import { LayerSectionKey } from 'meta/geo/layer/sectionKey'

export const forestLayers: LayerSection = {
  key: LayerSectionKey.Forest,
  titleKey: 'geo.sections.forest.title',
  recipes: forestAgreementRecipes,
  layers: [
    {
      key: ForestKey.JAXA,
      metadata: forestLayersMetadata.JAXA,
    },
    {
      key: ForestKey.TandemX,
      metadata: forestLayersMetadata.TandemX,
    },
    {
      key: ForestKey.GlobeLand,
      metadata: forestLayersMetadata.GlobeLand,
    },
    {
      key: ForestKey.ESAGlobCover,
      metadata: forestLayersMetadata.ESAGlobCover,
    },
    {
      key: ForestKey.Copernicus,
      metadata: forestLayersMetadata.Copernicus,
    },
    {
      key: ForestKey.ESRI,
      metadata: forestLayersMetadata.ESRI,
    },
    {
      key: ForestKey.ESAWorldCover,
      metadata: forestLayersMetadata.ESAWorldCover,
    },
    {
      key: ForestKey.Hansen,
      options: {
        gteTreeCoverPercent: [...hansenPercentages],
      },
      metadata: forestLayersMetadata.Hansen,
    },
    // {
    //   key: ForestKey.MODIS, // <- Layer not yet implemented in the backend
    //   metadata: forestLayersMetadata.MODIS,
    // },
    {
      key: ForestKey.JRC2020,
      metadata: forestLayersMetadata.JRC2020,
    },
    {
      key: ForestKey.CustomFnF,
      isCustomAsset: true,
      metadata: forestLayersMetadata.CustomFnF,
    },
    {
      key: ForestKey.Agreement,
      options: {
        agreementLayer: {
          agreementLevels: Arrays.range(1, Object.keys(ForestKey).length - 1, 1),
          reducerScales: [10, 20, 30],
        },
      },
      metadata: forestLayersMetadata.Agreement,
    },
  ],
}
