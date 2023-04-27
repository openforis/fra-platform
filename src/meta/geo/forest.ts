import { Arrays } from '@utils/arrays'

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
    scale: 24.7376,
    palette: ['#800080'], // purple
    citation: 'https://doi.org/10.1016/j.rse.2014.04.014', // from gee asset
    forestAreaDataProperty: 'faJaxa',
  },
  [ForestKey.TandemX]: {
    scale: 55.6597,
    palette: ['#008000'], // green
    citation: 'https://geoservice.dlr.de/web/dataguide/fnf50/',
    forestAreaDataProperty: 'faTandemx',
  },
  [ForestKey.ESAGlobCover]: {
    scale: 309.2208,
    palette: ['#FF0000'], // red
    citation: 'http://due.esrin.esa.int/page_globcover.php', // from gee asset
    forestAreaDataProperty: 'faEsa2009',
  },
  [ForestKey.GlobeLand]: {
    scale: 30,
    palette: ['#0000FF'], // blue
    citation: 'http://www.globallandcover.com/home_en.html', // official web site
    forestAreaDataProperty: 'faGlobeland',
  },
  [ForestKey.Copernicus]: {
    scale: 100,
    palette: ['#FFFF00'], // yellow
    citation: ' https://doi.org/10.3390/rs12061044', // from gee asset
    forestAreaDataProperty: 'faCopernicus',
  },
  [ForestKey.ESRI]: {
    scale: 10,
    palette: ['#FF7F50'], // coral
    citation: ' https://www.arcgis.com/home/item.html?id=d6642f8a4f6d4685a24ae2dc0c73d4ac',
    forestAreaDataProperty: 'faEsri',
  },
  [ForestKey.ESAWorldCover]: {
    scale: 10,
    palette: ['#00ffff'], // cyan
    citation: 'https://esa-worldcover.org/en', // on gee citation 'A publication is under preparation'
    forestAreaDataProperty: 'faEsa2020',
  },
  [ForestKey.Hansen]: {
    scale: 30.92,
    palette: ['#00ff00'], // lime
    citation: 'https://doi.org/10.1126/science.1244693', // from gee asset
    forestAreaDataProperty: 'faHansen',
  },
  [ForestKey.MODIS]: {
    scale: 231.6563,
    palette: ['#FFD700'], // gold
    citation: 'https://lpdaac.usgs.gov/products/mod44bv006/',
  },
  [ForestKey.CustomFnF]: {
    palette: ['#A52A2A'],
    citation: '',
    scale: 0,
  },
  [ForestKey.Agreement]: {
    palette: agreementPalette,
    citation: '',
    scale: 0,
  },
}

export const forestAgreementRecipes: Array<Recipe> = [
  {
    layers: [
      ForestKey.TandemX,
      ForestKey.JAXA,
      ForestKey.GlobeLand,
      ForestKey.ESAGlobCover,
      ForestKey.Copernicus,
      ForestKey.ESRI,
      ForestKey.ESAWorldCover,
      ForestKey.Hansen,
    ],
    gteHansenTreeCoverPerc: 10,
    forestAreaDataProperty: 'faAgreementHansen10',
    recipeLabel: 'All (GFC Hansen >=10%)',
  },
  {
    layers: [
      ForestKey.JAXA,
      ForestKey.TandemX,
      ForestKey.GlobeLand,
      ForestKey.ESAGlobCover,
      ForestKey.Copernicus,
      ForestKey.ESRI,
      ForestKey.ESAWorldCover,
      ForestKey.Hansen,
    ],
    gteHansenTreeCoverPerc: 20,
    forestAreaDataProperty: 'faAgreementHansen20',
    recipeLabel: 'All (GFC Hansen >=20%)',
  },
  {
    layers: [
      ForestKey.JAXA,
      ForestKey.TandemX,
      ForestKey.GlobeLand,
      ForestKey.ESAGlobCover,
      ForestKey.Copernicus,
      ForestKey.ESRI,
      ForestKey.ESAWorldCover,
      ForestKey.Hansen,
    ],
    gteHansenTreeCoverPerc: 30,
    forestAreaDataProperty: 'faAgreementHansen30',
    recipeLabel: 'All (GFC Hansen >=30%)',
  },
  {
    layers: [ForestKey.ESRI, ForestKey.ESAWorldCover, ForestKey.GlobeLand, ForestKey.Hansen],
    gteHansenTreeCoverPerc: 10,
    forestAreaDataProperty: 'faAgreementEsriEsaGloHansen10',
    recipeLabel: 'ESRI, ESA, Globland 2020 & GFC Hansen >=10%',
  },
  {
    layers: [ForestKey.ESRI, ForestKey.ESAWorldCover],
    forestAreaDataProperty: 'faAgreementEsriEsa',
    recipeLabel: 'ESRI & ESA',
  },
]

export const getRecipeAgreementAreaProperty = (
  selectedLayers: Array<ForestKey>,
  gteAgreementLevel: number,
  gteHansenTreeCoverPerc?: number
): string => {
  const recipe = forestAgreementRecipes.find((recipe) => {
    return (
      recipe.layers.length === selectedLayers.length &&
      (recipe.gteHansenTreeCoverPerc === gteHansenTreeCoverPerc || recipe.gteHansenTreeCoverPerc === undefined) &&
      recipe.layers.every((layer) => selectedLayers.includes(layer as ForestKey))
    )
  })

  return recipe === undefined ? null : `${recipe.forestAreaDataProperty}Gte${gteAgreementLevel}`
}

export const forestLayers: LayerSection = {
  key: LayerSectionKey.Forest,
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
      metadata: forestLayersMetadata.ESAGlobCover,
    },
    {
      key: ForestKey.Hansen,
      options: {
        minTreeCoverPercentage: [...hansenPercentages],
      },
      metadata: forestLayersMetadata.Hansen,
    },
    {
      key: ForestKey.MODIS,
      metadata: forestLayersMetadata.MODIS,
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
          agreementLevels: Arrays.range(1, Object.keys(ForestKey).length, 1),
          reducerScales: [10, 20, 30],
        },
      },
      metadata: forestLayersMetadata.Agreement,
    },
  ],
}
