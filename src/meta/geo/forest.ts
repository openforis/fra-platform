import { Arrays } from 'utils/arrays'

import { LayerMetadata, LayerSection, LayerSectionKey, Recipe } from './layer'

export const hansenPercentages = [10, 20, 30] as const

export type HansenPercentage = typeof hansenPercentages[number]

export enum ForestKey {
  JAXA = 'JAXA',
  TandemX = 'TandemX',
  GlobeLand = 'GlobeLand',
  ESAGlobCover = 'ESAGlobCover',
  Copernicus = 'Copernicus',
  ESRI = 'ESRI',
  ESAWorldCover = 'ESAWorldCover',
  Hansen = 'Hansen',
  MODIS = 'MODIS',
  CustomFnF = 'CustomFnF',
  Agreement = 'Agreement',
}

export const agreementPalette = [
  '#FFC0CB', // pink
  '#FF0000', // red
  '#FF8000', // shade of brown
  '#FFFF00', // yellow
  '#01def9', // shade of cyan
  '#0040FF', // shade of blue
  '#01DF01', // shade of green
  '#0B3B0B', // very dark shade of green
  '#808080', // gray
  '#800080', // purple
  '#000000', // black
]

export const forestLayersMetadata: Record<ForestKey, LayerMetadata> = {
  [ForestKey.JAXA]: {
    title: 'JAXA (2017)',
    scale: 24.7376,
    palette: ['#800080'], // purple
    citation: 'https://doi.org/10.1016/j.rse.2014.04.014', // from gee asset
    forestAreaDataProperty: 'faJaxa',
  },
  [ForestKey.TandemX]: {
    title: 'TanDEM-X (2019)',
    scale: 55.6597,
    palette: ['#008000'], // green
    citation: 'https://geoservice.dlr.de/web/dataguide/fnf50/',
    forestAreaDataProperty: 'faTandemx',
  },
  [ForestKey.ESAGlobCover]: {
    title: 'ESA GlobCover (2009)',
    scale: 309.2208,
    palette: ['#FF0000'], // red
    citation: 'http://due.esrin.esa.int/page_globcover.php', // from gee asset
    forestAreaDataProperty: 'faEsa2009',
  },
  [ForestKey.GlobeLand]: {
    title: 'GlobeLand (2020)',
    scale: 30,
    palette: ['#0000FF'], // blue
    citation: 'http://www.globallandcover.com/home_en.html', // official web site
    forestAreaDataProperty: 'faGlobeland',
  },
  [ForestKey.Copernicus]: {
    title: 'Copernicus (2019)',
    scale: 100,
    palette: ['#FFFF00'], // yellow
    citation: ' https://doi.org/10.3390/rs12061044', // from gee asset
    forestAreaDataProperty: 'faCopernicus',
  },
  [ForestKey.ESRI]: {
    title: 'ESRI (2020)',
    scale: 10,
    palette: ['#FF7F50'], // coral
    citation: ' https://www.arcgis.com/home/item.html?id=d6642f8a4f6d4685a24ae2dc0c73d4ac',
    forestAreaDataProperty: 'faEsri',
  },
  [ForestKey.ESAWorldCover]: {
    title: 'ESA (2020)',
    scale: 10,
    palette: ['#00ffff'], // cyan
    citation: 'https://esa-worldcover.org/en', // on gee citation 'A publication is under preparation'
    forestAreaDataProperty: 'faEsa2020',
  },
  [ForestKey.Hansen]: {
    title: 'Hansen GFC (2020)',
    scale: 30.92,
    palette: ['#00ff00'], // lime
    citation: 'https://doi.org/10.1126/science.1244693', // from gee asset
    forestAreaDataProperty: 'faHansen',
  },
  [ForestKey.MODIS]: {
    title: 'MODIS',
    scale: 231.6563,
    palette: ['#FFD700'], // gold
    citation: 'https://lpdaac.usgs.gov/products/mod44bv006/',
  },
  [ForestKey.CustomFnF]: {
    title: 'Custom FnF',
    palette: ['#A52A2A'],
    citation: '',
    scale: 0,
  },
  [ForestKey.Agreement]: {
    title: 'Agreement layer',
    palette: agreementPalette,
    citation: '',
    scale: 0,
  },
}

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

export const forestLayers: LayerSection = {
  key: LayerSectionKey.Forest,
  title: 'Forest Layers',
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
      key: ForestKey.CustomFnF,
      isCustomAsset: true,
      metadata: forestLayersMetadata.CustomFnF,
    },
    {
      key: ForestKey.Agreement,
      options: {
        agreementLayer: {
          agreementLevels: Arrays.range(1, Object.keys(ForestKey).length, 1),
          reducerScales: [10, 20, 30],
        },
      },
      metadata: forestLayersMetadata.Agreement,
    },
  ],
}

export type BurnedAreaModis = [{ year: number; ba: number; fbaHansen10: number }]
