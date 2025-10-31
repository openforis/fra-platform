import { API } from 'tools/utils/API/API'

import { Country } from 'meta/area/country'
import { RegionGroup } from 'meta/area/regionGroup'

type Returned = { countries: Array<Country>; regionGroups: Record<string, RegionGroup> }

export const getCountries = async (props: {
  source: string
  assessmentName: string
  cycleName: string
}): Promise<Returned> => {
  const { assessmentName, cycleName, source } = props
  const urlParams = new URLSearchParams({ assessmentName, cycleName }).toString()
  const url = `${source}/api/area/areas?${urlParams}`
  const {
    data: { countries, regionGroups },
  } = await API.get(url)
  return { countries, regionGroups }
}
