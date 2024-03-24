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
  '#d7adb5', // pink
  '#bb969d', // red
  '#a18187', // shade of brown
  '#866c71', // yellow
  '#755f63', // shade of cyan
  '#645054', // shade of blue
  '#4d3d40', // shade of green
  '#382c2e', // very dark shade of green
  '#2a2122', // gray
  '#1e1717', // purple
  '#070505', // black
]

export const forestLayersMetadata: Record<ForestKey, LayerMetadata> = {
  [ForestKey.JAXA]: {
    titleKey: 'geo.sections.forest.layerTitles.jaxa2017',
    scale: 24.7376,
    palette: ['#940194'], // purple
    citation: 'https://doi.org/10.1016/j.rse.2014.04.014', // from gee asset
    forestAreaDataProperty: 'faJaxa',
  },
  [ForestKey.TandemX]: {
    titleKey: 'geo.sections.forest.layerTitles.tanDemX2019',
    scale: 55.6597,
    palette: ['#008000'], // green
    citation: 'https://geoservice.dlr.de/web/dataguide/fnf50/',
    forestAreaDataProperty: 'faTandemx',
  },
  [ForestKey.ESAGlobCover]: {
    titleKey: 'geo.sections.forest.layerTitles.esaGlobCover2009',
    scale: 309.2208,
    palette: ['#f3671c'], // red
    citation: 'http://due.esrin.esa.int/page_globcover.php', // from gee asset
    forestAreaDataProperty: 'faEsa2009',
  },
  [ForestKey.GlobeLand]: {
    titleKey: 'geo.sections.forest.layerTitles.globeLand2020',
    scale: 30,
    palette: ['#0000FF'], // blue
    citation: 'http://www.globallandcover.com/home_en.html', // official web site
    forestAreaDataProperty: 'faGlobeland',
  },
  [ForestKey.Copernicus]: {
    titleKey: 'geo.sections.forest.layerTitles.copernicus2019',
    scale: 100,
    palette: ['#919134'], // yellow
    citation: ' https://doi.org/10.3390/rs12061044', // from gee asset
    forestAreaDataProperty: 'faCopernicus',
  },
  [ForestKey.ESRI]: {
    titleKey: 'geo.sections.forest.layerTitles.esri2020',
    scale: 10,
    palette: ['#f16b33'], // coral
    citation: ' https://www.arcgis.com/home/item.html?id=d6642f8a4f6d4685a24ae2dc0c73d4ac',
    forestAreaDataProperty: 'faEsri',
  },
  [ForestKey.ESAWorldCover]: {
    titleKey: 'geo.sections.forest.layerTitles.esa2020',
    scale: 10,
    palette: ['#13bebe'], // cyan
    citation: 'https://esa-worldcover.org/en', // on gee citation 'A publication is under preparation'
    forestAreaDataProperty: 'faEsa2020',
  },
  [ForestKey.Hansen]: {
    titleKey: 'geo.sections.forest.layerTitles.hansenGfc2020',
    scale: 30.92,
    palette: ['#61bd61'], // lime
    citation: 'https://doi.org/10.1126/science.1244693', // from gee asset
    forestAreaDataProperty: 'faHansen',
  },
  [ForestKey.MODIS]: {
    titleKey: 'geo.sections.forest.layerTitles.modis',
    scale: 231.6563,
    palette: ['#FFD700'], // gold
    citation: 'https://lpdaac.usgs.gov/products/mod44bv006/',
  },
  [ForestKey.CustomFnF]: {
    titleKey: 'geo.sections.forest.layerTitles.customFnf',
    palette: ['#A52A2A'],
    citation: '',
    scale: 0,
  },
  [ForestKey.Agreement]: {
    titleKey: 'geo.sections.forest.layerTitles.agreement',
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

export type BurnedAreaModis = [{ year: number; ba: number; fbaHansen10: number }]
