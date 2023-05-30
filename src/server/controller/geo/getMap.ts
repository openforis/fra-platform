// @ts-ignore
import { Image } from '@google/earthengine'

import { CountryIso } from '@meta/area'

import { AssetsController } from '@server/controller/geo/assets'

type Props = {
  image: Image
  style: any
  countryIso?: CountryIso
}

export const getMap = async (
  props: Props
): Promise<{
  mapId: string
}> => {
  const { countryIso, image, style } = props
  let finalImage = image

  if (countryIso) {
    const ftcCountry = AssetsController.getCountryBoundaries(countryIso)
    finalImage = image.clip(ftcCountry)
  }

  return new Promise((resolve, reject) => {
    finalImage.getMap(style, (mapProperties: any, err: any) => {
      if (err) {
        reject(err)
        return
      }
      resolve({
        mapId: mapProperties.mapid,
      })
    })
  })
}
