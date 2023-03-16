import { ForestSource } from '@meta/geo'

export interface Layer {
  key: ForestSource
  title: string
  opacity: number
}

export const layers: Layer[] = [
  {
    key: ForestSource.JAXA,
    title: 'JAXA (2017)',
    opacity: 1,
  },
  {
    key: ForestSource.TandemX,
    title: 'TanDEM-X (2019)',
    opacity: 1,
  },
  {
    key: ForestSource.GlobeLand,
    title: 'GlobeLand (2020)',
    opacity: 1,
  },
  {
    key: ForestSource.ESAGlobCover,
    title: 'ESA GlobCover (2009)',
    opacity: 1,
  },
  {
    key: ForestSource.Copernicus,
    title: 'Copernicus (2019)',
    opacity: 1,
  },
  {
    key: ForestSource.ESRI,
    title: 'ESRI (2020)',
    opacity: 1,
  },
  {
    key: ForestSource.ESAWorldCover,
    title: 'ESA (2020)',
    opacity: 1,
  },
  {
    key: ForestSource.Hansen,
    title: 'Hansen GFC (2020)',
    opacity: 1,
  },
]

export const GLOBAL_OPACITY_KEY = 'GLOBAL_OPACITY'

export enum LayerStatus {
  loading = 'loading',
  failed = 'failed',
  ready = 'ready',
}
