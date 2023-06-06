import { BurnedAreaKey, ForestSource, ProtectedAreaKey } from 'meta/geo'

export interface ForestLayer {
  key: ForestSource
  title: string
  opacity: number
}

export interface ProtectedAreaLayer {
  key: ProtectedAreaKey
  title: string
  opacity: number
}

export interface BurnedAreaLayer {
  key: BurnedAreaKey
  title: string
  opacity: number
}

export const forestLayers: ForestLayer[] = [
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
  {
    key: ForestSource.CustomFnF,
    title: 'Custom layer',
    opacity: 1,
  },
]

export const protectedAreaLayers: ProtectedAreaLayer[] = [
  {
    key: ProtectedAreaKey.FilteredWDPA,
    title: 'Filtered WDPA',
    opacity: 1,
  },
  // Commented out until the right implementation for rendering is done
  // {
  //   key: ProtectedAreaKey.WDPA,
  //   title: 'WDPA',
  //   opacity: 1,
  // },
  {
    key: ProtectedAreaKey.CustomPA,
    title: 'Custom protected area',
    opacity: 1,
  },
]

export const burnedAreaLayers: BurnedAreaLayer[] = [
  {
    key: BurnedAreaKey.MODIS,
    title: 'MODIS',
    opacity: 1,
  },
]

export const GLOBAL_OPACITY_KEY = 'GLOBAL_OPACITY'
