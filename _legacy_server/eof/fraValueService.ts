import { ODP } from '@core/odp'

import { getDynamicCountryConfiguration } from '@server/repository/country/getDynamicCountryConfiguration'
import { OriginalDataPointRepository } from '@server/repository/originalDataPoint'

import * as fraRepository from '../repository/eof/fraRepository'
import forestAreaTableResponse from './forestAreaTableResponse'
import focTableResponse from './focTableResponse'

export const fraReaders: { [key: string]: any } = {
  extentOfForest: fraRepository.readFraForestAreas,
  forestCharacteristics: fraRepository.readFraForestCharacteristics,
}

export const defaultResponses: { [key: string]: any } = {
  extentOfForest: forestAreaTableResponse,
  forestCharacteristics: focTableResponse,
}
export const odpsInUse: { [key: string]: any } = {
  extentOfForest: (_: any) => true,
  forestCharacteristics: (config: any) => config.useOriginalDataPointsInFoc === true,
}

export const getOdps = async (section: string, countryIso: string, schemaName = 'public'): Promise<Array<ODP>> => {
  const dynamicConfig = await getDynamicCountryConfiguration(countryIso, schemaName)
  const useOdps = odpsInUse[section](dynamicConfig)
  if (useOdps) {
    return OriginalDataPointRepository.getManyNormalized({ countryIso })
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

export const getFraValues = async (section: string, countryIso: string, schemaName = 'public') => {
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
