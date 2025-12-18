import { CountryIso } from 'meta/area/countryIso'
import { LayerConfig } from 'meta/geo/layer/config'
import { LayerSource } from 'meta/geo/layer/source'
import { ProtectedAreaKey } from 'meta/geo/protectedArea/key'

import { AssetsController } from 'server/controller/geo/assets'

import { getMap } from './getMap'

type Props = {
  countryIso: CountryIso
  layer: LayerSource
}

export const getProtectedAreaLayer = async (props: Props): Promise<LayerConfig> => {
  const { countryIso, layer } = props

  const asset = AssetsController.getProtectedAreaAssetData(layer)
  const mapParams =
    layer.key === ProtectedAreaKey.WDPA
      ? {
          image: asset.img,
          style: {},
          countryIso,
        }
      : {
          image: asset.img.selfMask(),
          style: { palette: asset.metadata.palette },
          countryIso,
        }

  const map = await getMap(mapParams)

  return {
    mapId: map.mapId,
    palette: asset.metadata.palette,
    scale: asset.metadata.scale,
    tileUrl: map.tileUrl,
    year: asset.year,
  }
}
