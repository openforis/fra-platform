import { API } from 'tools/utils/API/API'

import { CountryIso } from 'meta/area'

export const getCountries = async (props: {
  source: string
  assessmentName: string
  cycleName: string
}): Promise<CountryIso[]> => {
  const { source, assessmentName, cycleName } = props
  const urlParams = new URLSearchParams({ assessmentName, cycleName }).toString()
  const url = `${source}/api/area/areas?${urlParams}`
  const {
    data: { countries },
  } = await API.get(url)
  return countries
}
