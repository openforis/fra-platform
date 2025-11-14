import { ForestKey } from 'meta/geo/forest/key'
import { Recipe } from 'meta/geo/layer/recipe'

export const forestAgreementRecipes: Array<Recipe> = [
  {
    layers: [
      { key: ForestKey.TandemX },
      { key: ForestKey.JAXA },
      { key: ForestKey.GlobeLand },
      { key: ForestKey.ESAGlobCover },
      { key: ForestKey.Copernicus },
      { key: ForestKey.ESRI },
      { key: ForestKey.ESAWorldCover },
      { key: ForestKey.JRC2020 },
      {
        key: ForestKey.Hansen,
        options: {
          gteTreeCoverPercent: 10,
        },
      },
    ],
    forestAreaDataProperty: 'faAgreementHansen10',
    labelKey: 'geo.recipes.forest.allGfc10',
  },
  {
    layers: [
      { key: ForestKey.JAXA },
      { key: ForestKey.TandemX },
      { key: ForestKey.GlobeLand },
      { key: ForestKey.ESAGlobCover },
      { key: ForestKey.Copernicus },
      { key: ForestKey.ESRI },
      { key: ForestKey.ESAWorldCover },
      { key: ForestKey.JRC2020 },
      {
        key: ForestKey.Hansen,
        options: {
          gteTreeCoverPercent: 20,
        },
      },
    ],
    forestAreaDataProperty: 'faAgreementHansen20',
    labelKey: 'geo.recipes.forest.allGfc20',
  },
  {
    layers: [
      { key: ForestKey.JAXA },
      { key: ForestKey.TandemX },
      { key: ForestKey.GlobeLand },
      { key: ForestKey.ESAGlobCover },
      { key: ForestKey.Copernicus },
      { key: ForestKey.ESRI },
      { key: ForestKey.ESAWorldCover },
      { key: ForestKey.JRC2020 },
      {
        key: ForestKey.Hansen,
        options: {
          gteTreeCoverPercent: 30,
        },
      },
    ],
    forestAreaDataProperty: 'faAgreementHansen30',
    labelKey: 'geo.recipes.forest.allGfc30',
  },
  {
    layers: [
      { key: ForestKey.ESRI },
      { key: ForestKey.ESAWorldCover },
      { key: ForestKey.GlobeLand },
      {
        key: ForestKey.Hansen,
        options: {
          gteTreeCoverPercent: 10,
        },
      },
    ],
    forestAreaDataProperty: 'faAgreementEsriEsaGloHansen10',
    labelKey: 'geo.recipes.forest.esriEsaGlobland2020Gfc10',
  },
  {
    layers: [{ key: ForestKey.ESRI }, { key: ForestKey.ESAWorldCover }],
    forestAreaDataProperty: 'faAgreementEsriEsa',
    labelKey: 'geo.recipes.forest.esriEsa',
  },
]
