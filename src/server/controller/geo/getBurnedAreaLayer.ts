import { CountryIso } from '@meta/area'
import { BurnedAreaLayerSource, burnedAreaSourcesMetadata, Layer } from '@meta/geo'

import { AssetsController } from '@server/controller/geo/assets'

import { getMap } from './getMap'

type Props = {
  countryIso: CountryIso
  layer: BurnedAreaLayerSource
}

export const getBurnedAreaLayer = async (props: Props): Promise<Layer> => {
  const { countryIso, layer } = props

  const asset = AssetsController.getBurnedAreaAssetData(layer)
  const metadata = burnedAreaSourcesMetadata[layer.key]

  const map = await getMap({
    image: asset.img,
    style: {
      palette: metadata.palette,
    },
    countryIso,
  })

  return {
    mapId: map.mapId,
    year: asset.year,
    scale: metadata.scale,
    palette: metadata.palette,
  }
}
