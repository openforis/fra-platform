// @ts-ignore
import { Image } from '@google/earthengine'

import { CountryIso } from '@meta/area'
import { ProtectedAreaSource } from '@meta/geo'

import { AssetsController } from '@server/controller/geo/assets'

type Props = {
  countryIso: CountryIso
  source: ProtectedAreaSource
  params?: { assetId: string }
}

export const getProtectedAreaAssetData = (props: Props): { img: Image } => {
  const { countryIso, source, params } = props
  const ftcCountry = AssetsController.getCountryBoundaries(countryIso)

  switch (source) {
    case ProtectedAreaSource.FilteredWDPA: {
      return {
        img: Image('users/geofra/protected_areas/PAs_WDPA_polygons_filtered_image_Bin_30m_World_v2')
          .eq(1)
          .clip(ftcCountry)
          .selfMask(),
      }
    }
    case ProtectedAreaSource.Custom: {
      return {
        img: Image(params.assetId).clip(ftcCountry).selfMask(),
      }
    }
    default:
      return null
  }
}
