export interface ForestOptions {
  selected: ForestSourceKeyAndStatus[]
  fetchedLayers: { [key: string]: string }
  hansenPercentage: HansenPercentage
}

export const hansenPercentages = [10, 20, 30] as const

export type HansenPercentage = typeof hansenPercentages[number]

export interface ForestSourceWithOptions {
  key: ForestSource
  options: {
    [key: string]: string
  }
}

export interface ForestSourceKeyAndStatus {
  key: ForestSource
  status: ForestSourceStatus
}

export type ForestSourceStatus = 'loading' | 'ready'

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
}

export type Layer = {
  mapId: string
  palette: Array<string>
  year?: number
  scale?: number
  citation?: string
}

export const precalForestAgreementSources: Array<ForestSource> = [
  ForestSource.JAXA,
  ForestSource.TandemX,
  ForestSource.GlobeLand,
  ForestSource.ESAGlobCover,
  ForestSource.Copernicus,
  ForestSource.ESRI,
  ForestSource.ESAWorldCover,
  ForestSource.Hansen, // precal with tree cover gte 10,20,30%
]

export const sourcesMetadata = {
  [ForestSource.JAXA]: {
    scale: 24.7376,
    palette: ['#800080'], // purple
    citation: 'https://doi.org/10.1016/j.rse.2014.04.014', // from gee asset
    forestAreaDataProperty: 'fa_jaxa',
  },
  [ForestSource.TandemX]: {
    scale: 55.6597,
    palette: ['#008000'], // green
    citation: 'https://geoservice.dlr.de/web/dataguide/fnf50/',
    forestAreaDataProperty: 'fa_tandemx',
  },
  [ForestSource.ESAGlobCover]: {
    scale: 309.2208,
    palette: ['#FF0000'], // red
    citation: 'http://due.esrin.esa.int/page_globcover.php', // from gee asset
    forestAreaDataProperty: 'fa_esa_2009',
  },
  [ForestSource.GlobeLand]: {
    scale: 30,
    palette: ['#0000FF'], // blue
    citation: 'http://www.globallandcover.com/home_en.html', // official web site
    forestAreaDataProperty: 'fa_globeland',
  },
  [ForestSource.Copernicus]: {
    scale: 100,
    palette: ['#FFFF00'], // yellow
    citation: ' https://doi.org/10.3390/rs12061044', // from gee asset
    forestAreaDataProperty: 'fa_copernicus',
  },
  [ForestSource.ESRI]: {
    scale: 10,
    palette: ['#FF7F50'], // coral
    citation: ' https://www.arcgis.com/home/item.html?id=d6642f8a4f6d4685a24ae2dc0c73d4ac',
    forestAreaDataProperty: 'fa_esri',
  },
  [ForestSource.ESAWorldCover]: {
    scale: 10,
    palette: ['#00ffff'], // cyan
    citation: 'https://esa-worldcover.org/en', // on gee citation 'A publication is under preparation'
    forestAreaDataProperty: 'fa_esa_2020',
  },
  [ForestSource.Hansen]: {
    scale: 30.92,
    palette: ['#00ff00'], // lime
    citation: 'https://doi.org/10.1126/science.1244693', // from gee asset
    forestAreaDataProperty: 'fa_hansen',
  },
  [ForestSource.MODIS]: {
    scale: 231.6563,
    palette: ['#FFD700'], // gold
    citation: 'https://lpdaac.usgs.gov/products/mod44bv006/',
  },
}

export const agreementPalette = [
  '#baecba', // light shade of green
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
