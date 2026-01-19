import { useMemo } from 'react'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area/countryIso'
import { Objects } from 'utils/objects'

type Returned = string

type Props = {
  countryIso?: CountryIso
}

export const useLinksPath = (props: Props): Returned => {
  const { countryIso } = props

  return useMemo<Returned>(() => {
    const basePath = ApiEndPoint.CycleData.Links.many()
    if (Objects.isEmpty(countryIso)) return basePath

    const queryParams = new URLSearchParams({ countryIso })
    return `${basePath}?${queryParams.toString()}`
  }, [countryIso])
}
