import { API } from 'tools/utils/API/API'

import { Country, RegionGroup } from 'meta/area'

type Returned = { countries: Array<Country>; regionGroups: Record<string, RegionGroup> }

export const getCountries = async (props: {
  source: string
  assessmentName: string
  cycleName: string
}): Promise<Returned> => {
  const { source, assessmentName, cycleName } = props
  const urlParams = new URLSearchParams({ assessmentName, cycleName }).toString()
  const url = `${source}/api/area/areas?${urlParams}`
  const {
    data: { countries, regionGroups },
  } = await API.get(url)
  return { countries, regionGroups }
}
