import { BurnedAreaKey, BurnedAreasUIOptions } from './burnedAreaSource'
import { ProtectedAreaKey } from './protectedAreaSource'

export enum LayerStatus {
  loading = 'loading',
  failed = 'failed',
  ready = 'ready',
}

export interface ForestOptions {
  selected: ForestSource[]
  fetchedLayers: { [key: string]: string }
  pendingLayers: { [key: string]: string }
  failedLayers: { [key: string]: string }
  opacity: { [key: string]: number }
  hansenPercentage: HansenPercentage
  agreementLayerSelected: boolean
  agreementLayerStatus: LayerStatus
  agreementLevel: number
  agreementPalette: Array<string>
  recipe: string
  customAssetId: string
}

export interface ProtectedAreasOptions {
  selected: ProtectedAreaKey[]
  fetchedLayers: { [key: string]: string }
  pendingLayers: { [key: string]: string }
  failedLayers: { [key: string]: string }
  opacity: { [key: string]: number }
  customAssetId: string
}

export interface BurnedAreasOptions {
  ui: BurnedAreasUIOptions
  applied: BurnedAreasUIOptions
  selected: BurnedAreaKey[]
  fetchedLayers: { [key: string]: string }
  pendingLayers: { [key: string]: string }
  failedLayers: { [key: string]: string }
  opacity: { [key: string]: number }
}

export type BurnedAreaModis = [{ year: number; ba: number; fbaHansen10: number }]

export const hansenPercentages = [10, 20, 30] as const

export type HansenPercentage = typeof hansenPercentages[number]

export interface ForestSourceWithOptions {
  key: ForestSource
  options: {
    [key: string]: string
  }
}

export enum ForestSource {
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

export type Layer = {
  mapId: string
  palette: Array<string>
  year?: number
  scale?: number
  citation?: string
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

export const sourcesMetadata = {
  [ForestSource.JAXA]: {
    scale: 24.7376,
    palette: ['#800080'], // purple
    citation: 'https://doi.org/10.1016/j.rse.2014.04.014', // from gee asset
    forestAreaDataProperty: 'faJaxa',
  },
  [ForestSource.TandemX]: {
    scale: 55.6597,
    palette: ['#008000'], // green
    citation: 'https://geoservice.dlr.de/web/dataguide/fnf50/',
    forestAreaDataProperty: 'faTandemx',
  },
  [ForestSource.ESAGlobCover]: {
    scale: 309.2208,
    palette: ['#FF0000'], // red
    citation: 'http://due.esrin.esa.int/page_globcover.php', // from gee asset
    forestAreaDataProperty: 'faEsa2009',
  },
  [ForestSource.GlobeLand]: {
    scale: 30,
    palette: ['#0000FF'], // blue
    citation: 'http://www.globallandcover.com/home_en.html', // official web site
    forestAreaDataProperty: 'faGlobeland',
  },
  [ForestSource.Copernicus]: {
    scale: 100,
    palette: ['#FFFF00'], // yellow
    citation: ' https://doi.org/10.3390/rs12061044', // from gee asset
    forestAreaDataProperty: 'faCopernicus',
  },
  [ForestSource.ESRI]: {
    scale: 10,
    palette: ['#FF7F50'], // coral
    citation: ' https://www.arcgis.com/home/item.html?id=d6642f8a4f6d4685a24ae2dc0c73d4ac',
    forestAreaDataProperty: 'faEsri',
  },
  [ForestSource.ESAWorldCover]: {
    scale: 10,
    palette: ['#00ffff'], // cyan
    citation: 'https://esa-worldcover.org/en', // on gee citation 'A publication is under preparation'
    forestAreaDataProperty: 'faEsa2020',
  },
  [ForestSource.Hansen]: {
    scale: 30.92,
    palette: ['#00ff00'], // lime
    citation: 'https://doi.org/10.1126/science.1244693', // from gee asset
    forestAreaDataProperty: 'faHansen',
  },
  [ForestSource.MODIS]: {
    scale: 231.6563,
    palette: ['#FFD700'], // gold
    citation: 'https://lpdaac.usgs.gov/products/mod44bv006/',
  },
  [ForestSource.CustomFnF]: {
    palette: ['#A52A2A'],
    citation: '',
    scale: 0,
  },
  [ForestSource.Agreement]: {
    palette: agreementPalette,
    citation: '',
    scale: 0,
  },
}

export interface LayerSource {
  key: ForestSource | ProtectedAreaKey | BurnedAreaKey
  options?: {
    gteTreeCoverPercent?: number
    assetId?: string
    year?: number
    agreement?: {
      layers: Array<LayerSource>
      gteAgreementLevel: number
    }
  }
}

export interface Recipe {
  layers: Array<ForestSource>
  gteHansenTreeCoverPerc?: HansenPercentage
  forestAreaDataProperty: string
  recipeLabel: string
}

export const forestAgreementRecipes: Array<Recipe> = [
  {
    layers: [
      ForestSource.TandemX,
      ForestSource.JAXA,
      ForestSource.GlobeLand,
      ForestSource.ESAGlobCover,
      ForestSource.Copernicus,
      ForestSource.ESRI,
      ForestSource.ESAWorldCover,
      ForestSource.Hansen,
    ],
    gteHansenTreeCoverPerc: 10,
    forestAreaDataProperty: 'faAgreementHansen10',
    recipeLabel: 'All (GFC Hansen >=10%)',
  },
  {
    layers: [
      ForestSource.JAXA,
      ForestSource.TandemX,
      ForestSource.GlobeLand,
      ForestSource.ESAGlobCover,
      ForestSource.Copernicus,
      ForestSource.ESRI,
      ForestSource.ESAWorldCover,
      ForestSource.Hansen,
    ],
    gteHansenTreeCoverPerc: 20,
    forestAreaDataProperty: 'faAgreementHansen20',
    recipeLabel: 'All (GFC Hansen >=20%)',
  },
  {
    layers: [
      ForestSource.JAXA,
      ForestSource.TandemX,
      ForestSource.GlobeLand,
      ForestSource.ESAGlobCover,
      ForestSource.Copernicus,
      ForestSource.ESRI,
      ForestSource.ESAWorldCover,
      ForestSource.Hansen,
    ],
    gteHansenTreeCoverPerc: 30,
    forestAreaDataProperty: 'faAgreementHansen30',
    recipeLabel: 'All (GFC Hansen >=30%)',
  },
  {
    layers: [ForestSource.ESRI, ForestSource.ESAWorldCover, ForestSource.GlobeLand, ForestSource.Hansen],
    gteHansenTreeCoverPerc: 10,
    forestAreaDataProperty: 'faAgreementEsriEsaGloHansen10',
    recipeLabel: 'ESRI, ESA, Globland 2020 & GFC Hansen >=10%',
  },
  {
    layers: [ForestSource.ESRI, ForestSource.ESAWorldCover],
    forestAreaDataProperty: 'faAgreementEsriEsa',
    recipeLabel: 'ESRI & ESA',
  },
]

export const getRecipeAgreementAreaProperty = (
  selectedLayers: Array<ForestSource>,
  gteAgreementLevel: number,
  gteHansenTreeCoverPerc?: number
): string => {
  const recipe = forestAgreementRecipes.find((recipe) => {
    return (
      recipe.layers.length === selectedLayers.length &&
      (recipe.gteHansenTreeCoverPerc === gteHansenTreeCoverPerc || recipe.gteHansenTreeCoverPerc === undefined) &&
      recipe.layers.every((layer) => selectedLayers.includes(layer))
    )
  })

  return recipe === undefined ? null : `${recipe.forestAreaDataProperty}Gte${gteAgreementLevel}`
}
