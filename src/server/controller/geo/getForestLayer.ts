import { CountryIso } from '@meta/area'
import { Layer, LayerSource } from '@meta/geo'

import { AssetsController } from '@server/controller/geo/assets'

import { getMap } from './getMap'

type Props = {
  countryIso: CountryIso
  layer: LayerSource
}

export const getForestLayer = async (props: Props): Promise<Layer> => {
  const { countryIso, layer } = props

  const asset = AssetsController.getForestAssetData(layer)
  // const metadata = sourcesMetadata[layer.key]

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
