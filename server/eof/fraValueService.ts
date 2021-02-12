import * as fraRepository from './fraRepository'
import * as odpRepository from '../odp/odpRepository'
import { getDynamicCountryConfiguration } from '../country/countryRepository'

import forestAreaTableResponse from './forestAreaTableResponse'
import focTableResponse from './focTableResponse'

export const fraReaders: { [key: string]: any } = {
  extentOfForest: fraRepository.readFraForestAreas,
  forestCharacteristics: fraRepository.readFraForestCharacteristics,
}
export const odpReaders: { [key: string]: any } = {
  extentOfForest: odpRepository.readEofOdps,
  forestCharacteristics: odpRepository.readFocOdps,
}
export const defaultResponses: { [key: string]: any } = {
  extentOfForest: forestAreaTableResponse,
  forestCharacteristics: focTableResponse,
}
export const odpsInUse: { [key: string]: any } = {
  extentOfForest: (config: any) => true,
  forestCharacteristics: (config: any) => config.useOriginalDataPointsInFoc === true,
}

export const getOdps = async (section: any, countryIso: any, schemaName = 'public') => {
  const dynamicConfig = await getDynamicCountryConfiguration(countryIso, schemaName)
  const useOdps = odpsInUse[section](dynamicConfig)
  const readOdp = odpReaders[section]
  if (useOdps) {
    const odps = await readOdp(countryIso, schemaName)
    return odps
  }
  return []
}

export const getFraValuesResult = async (fra: any, odp: any, defaultResponse: any) => {
  const odpYears = odp.map((_odp: any) => _odp.year)
  const fraYears = fra.map((_fra: any) => _fra.year)
  const allYears = [...odpYears, ...fraYears]
  const _containsYear = (year: any, arr: any[]) => arr.includes(year)
  const defaults = defaultResponse.filter(({ year }: any) => !_containsYear(year, allYears))
  const fraNoOdpYears: any[] = fra.filter(({ year }: any) => !_containsYear(year, odpYears))
  const _sortFn = (a: any, b: any) => (a.year === b.year ? (a.type < b.type ? -1 : 1) : a.year - b.year)
  const res: any[] = [...fraNoOdpYears, ...defaults, ...odp].sort(_sortFn)

  return res
}

export const getFraValues = async (section: any, countryIso: any, schemaName = 'public') => {
  const readFra = fraReaders[section]

  const defaultResponse = defaultResponses[section]

  const fra = await readFra(countryIso, schemaName)
  const odp = await getOdps(section, countryIso, schemaName)

  const result = await getFraValuesResult(fra, odp, defaultResponse)
  const resultNoNDPs = await getFraValuesResult(fra, [], defaultResponse)

  return { fra: result, fraNoNDPs: resultNoNDPs }
}

export default {
  getFraValues,
}
