import { ForestSource } from '@meta/geo'

export interface Layer {
  key: ForestSource
  title: string
  apiUri: string
  opacity: number
}

export const layers: Layer[] = [
  {
    key: ForestSource.JAXA,
    title: 'JAXA (2017)',
    apiUri: '/api/geo/layers/forest/?countryIso=FIN&forestSource=JAXA',
    opacity: 1,
  },
  {
    key: ForestSource.TandemX,
    title: 'TanDEM-X (2019)',
    apiUri: '/api/geo/layers/forest/?countryIso=FIN&forestSource=TandemX',
    opacity: 1,
  },
  {
    key: ForestSource.GlobeLand,
    title: 'GlobeLand (2020)',
    apiUri: '/api/geo/layers/forest/?countryIso=FIN&forestSource=GlobeLand',
    opacity: 1,
  },
  {
    key: ForestSource.ESAGlobCover,
    title: 'Global Land Cover ESA (2009)',
    apiUri: '/api/geo/layers/forest/?countryIso=FIN&forestSource=ESAGlobCover',
    opacity: 1,
  },
  {
    key: ForestSource.Copernicus,
    title: 'Copernicus (2019)',
    apiUri: '/api/geo/layers/forest/?countryIso=FIN&forestSource=Copernicus',
    opacity: 1,
  },
  {
    key: ForestSource.ESRI,
    title: 'ESRI (2020)',
    apiUri: '/api/geo/layers/forest/?countryIso=FIN&forestSource=ESRI',
    opacity: 1,
  },
  {
    key: ForestSource.ESAWorldCover,
    title: 'ESA (2020)',
    apiUri: '/api/geo/layers/forest/?countryIso=FIN&forestSource=ESAWorldCover',
    opacity: 1,
  },
  {
    key: ForestSource.Hansen,
    title: 'Hansen GFC (2020)',
    apiUri: '/api/geo/layers/forest/?countryIso=FIN&forestSource=Hansen',
    opacity: 1,
  },
]
