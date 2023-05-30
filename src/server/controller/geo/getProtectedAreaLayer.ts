import { CountryIso } from '@meta/area'
import { Layer, LayerSource, ProtectedAreaKey } from '@meta/geo'

import { AssetsController } from '@server/controller/geo/assets'

import { getMap } from './getMap'

type Props = {
  countryIso: CountryIso
  layer: LayerSource
}

export const getProtectedAreaLayer = async (props: Props): Promise<Layer> => {
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
    year: asset.year,
    scale: asset.metadata.scale,
    palette: asset.metadata.palette,
  }
}
