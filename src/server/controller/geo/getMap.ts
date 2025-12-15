// @ts-ignore
import { Image } from '@google/earthengine'

import { CountryIso } from 'meta/area/countryIso'

import { AssetsController } from 'server/controller/geo/assets'

type Props = {
  image: Image
  style: any
  countryIso?: CountryIso
}

export const getMap = async (
  props: Props
): Promise<{
  tileUrl: string
  mapId: string
}> => {
  const { countryIso, image, style } = props
  let finalImage = image

  if (countryIso) {
    const ftcCountry = AssetsController.getCountryBoundaries(countryIso)
    finalImage = image.clip(ftcCountry)
  }

  const map = await finalImage.getMap(style)

  return { mapId: map.mapid, tileUrl: map.urlFormat }
}
