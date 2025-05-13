import { API } from 'tools/utils/API/API'

import { Section } from 'meta/assessment/section'

export const getSections = async (props: {
  source: string
  assessmentName: string
  cycleName: string
}): Promise<Array<Section>> => {
  const { assessmentName, cycleName, source } = props
  const urlParams = new URLSearchParams({ assessmentName, cycleName, countryIso: 'WO' }).toString()
  const url = `${source}/api/metadata/sections?${urlParams}`
  const { data } = await API.get(url)
  return data
}
