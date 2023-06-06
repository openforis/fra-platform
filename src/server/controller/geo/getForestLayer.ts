import { CountryIso } from 'meta/area'
import { ForestSource, Layer, LayerSource } from 'meta/geo'

import { AssetsController } from 'server/controller/geo/assets'

import { getMap } from './getMap'

type Props = {
  countryIso: CountryIso
  layer: LayerSource
}

export const getForestLayer = async (props: Props): Promise<Layer> => {
  const { countryIso, layer } = props

  const asset = AssetsController.getForestAssetData(layer)
  let style: { palette: string[]; min?: number; max?: number }

  if (layer.key === ForestSource.Agreement) {
    style = {
      palette: asset.metadata.palette.slice(layer.options.agreement.gteAgreementLevel - 1, layer.options.agreement.layers.length),
      min: layer.options.agreement.gteAgreementLevel,
      max: layer.options.agreement.layers.length,
    }
  } else {
    style = {
      palette: asset.metadata.palette,
    }
  }

  const map = await getMap({
    image: asset.img.selfMask(),
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
