import { CountryIso } from 'meta/area'
import { LayerConfig, LayerSource } from 'meta/geo'

import { AssetsController } from 'server/controller/geo/assets'

import { getMap } from './getMap'

type Props = {
  countryIso: CountryIso
  layer: LayerSource
}

export const getBurnedAreaLayer = async (props: Props): Promise<LayerConfig> => {
  const { countryIso, layer } = props

  const asset = AssetsController.getBurnedAreaAssetData(layer)

  const map = await getMap({
    image: asset.img,
    style: {
      palette: asset.metadata.palette,
    },
    countryIso,
  })

  return {
    mapId: map.mapId,
    year: asset.year,
    scale: asset.metadata.scale,
    palette: asset.metadata.palette,
  }
}
