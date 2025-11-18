import { CountryIso } from 'meta/area/countryIso'
import { ForestKey } from 'meta/geo/forest/key'
import { LayerConfig } from 'meta/geo/layer/config'
import { LayerSource } from 'meta/geo/layer/source'

import { AssetsController } from 'server/controller/geo/assets'

import { getMap } from './getMap'

type Props = {
  countryIso: CountryIso
  layer: LayerSource
}

export const getForestLayer = async (props: Props): Promise<LayerConfig> => {
  const { countryIso, layer } = props

  const asset = AssetsController.getForestAssetData(layer)
  let style: { palette: Array<string>; min?: number; max?: number }

  if (layer.key === ForestKey.Agreement) {
    style = {
      palette: asset.metadata.palette.slice(
        layer.options.agreement.gteAgreementLevel - 1,
        layer.options.agreement.layers.length
      ),
      min: layer.options.agreement.gteAgreementLevel,
      max: layer.options.agreement.layers.length,
    }
  } else {
    style = {
      palette: asset.metadata.palette,
    }
  }

  const map = await getMap({
    image: asset.img,
    style,
    countryIso,
  })

  return {
    mapId: map.mapId,
    year: asset.year,
    scale: asset.metadata.scale,
    palette: style.palette,
  }
}
