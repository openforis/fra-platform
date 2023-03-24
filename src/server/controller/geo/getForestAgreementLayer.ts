import { CountryIso } from '@meta/area'
import { agreementPalette, Layer, LayerSource } from '@meta/geo'

import { AssetsController } from '@server/controller/geo/assets/'

import { getMap } from './getMap'

type Props = {
  countryIso: CountryIso
  layers: Array<LayerSource>
  gteAgreementLevel: number
}

export const getForestAgreementLayer = async (props: Props): Promise<Layer> => {
  const { countryIso, layers, gteAgreementLevel } = props

  const asset = AssetsController.getForestAgreementAssetData(layers, gteAgreementLevel)
  const palette = agreementPalette.slice(gteAgreementLevel - 1, layers.length)

  const map = await getMap({
    image: asset.img,
    style: {
      palette,
      min: gteAgreementLevel,
      max: layers.length,
    },
    countryIso,
  })

  return {
    mapId: map.mapId,
    palette,
  }
}
