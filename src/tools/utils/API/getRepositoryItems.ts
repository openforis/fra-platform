import { AxiosInstance } from 'axios'

import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { RepositoryItem } from 'meta/cycleData/repository/item'
import { API } from 'tools/utils/API/API'

export const getRepositoryItems = async (props: {
  api?: AxiosInstance
  source: string
  assessmentName: AssessmentName
  cycleName: CycleName
  countryIso: CountryIso
  global?: boolean
}): Promise<Array<RepositoryItem>> => {
  const { api = API, assessmentName, countryIso, cycleName, global = false, source } = props
  const urlParams = new URLSearchParams({ assessmentName, cycleName, countryIso, global: String(global) }).toString()
  const { data } = await api.get(`${source}/api/cycle-data/repository/items?${urlParams}`)
  return data
}
