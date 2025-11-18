// @ts-ignore
import { Image } from '@google/earthengine'

import { BurnedAreaKey } from 'meta/geo/burnedArea/key'
import { ForestKey } from 'meta/geo/forest/key'
import { LayerSource } from 'meta/geo/layer/source'
import { ProtectedAreaKey } from 'meta/geo/protectedArea/key'

import { getBurnedAreaAssetData } from './getBurnedAreaAssetData'
import { getCountryBoundaries } from './getCountryBoundaries'
import { getForestAssetData } from './getForestAssetData'
import { getProtectedAreaAssetData } from './getProtectedAreaAssetData'

export const getAssetData = (source: LayerSource): { year?: number; img: Image; metadata: any } => {
  let asset = {} as { year?: number; img: Image; metadata: any }

  if (Object.keys(ProtectedAreaKey).includes(source.key)) {
    asset = getProtectedAreaAssetData(source)
  } else if (Object.keys(BurnedAreaKey).includes(source.key)) {
    asset = getBurnedAreaAssetData(source)
  } else if (Object.keys(ForestKey).includes(source.key)) {
    asset = getForestAssetData(source)
  }
  return asset
}

export const AssetsController = {
  getCountryBoundaries,
  getForestAssetData,
  getProtectedAreaAssetData,
  getBurnedAreaAssetData,
  getAssetData,
}
