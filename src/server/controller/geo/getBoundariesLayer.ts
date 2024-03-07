import { CountryIso } from 'meta/area'
import { LayerConfig } from 'meta/geo'

import { AssetsController } from 'server/controller/geo/assets'

type Props = {
  countryIso: CountryIso
}

export const getBoundariesLayer = async (props: Props): Promise<LayerConfig> => {
  const { countryIso } = props

  const ftcCountry = AssetsController.getCountryBoundaries(countryIso)

  return new Promise((resolve, reject) => {
    ftcCountry
      .style({ color: '#000000', fillColor: '00000000', width: 1.5 })
      .getMap({}, (mapProperties: any, err: any) => {
        if (err) {
          reject(err)
          return
        }
        resolve({
          mapId: mapProperties.mapid,
          palette: ['#000000'],
        })
      })
  })
}
