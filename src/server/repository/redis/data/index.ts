import { getCountriesData } from './getCountriesData'
import { getODPYears } from './getODPYears'
import { updateCountryTable } from './updateCountryTable'
import { updateNode } from './updateNode'

export const DataRedisRepository = {
  getODPYears,
  getCountriesData,
  updateCountryTable,
  updateNode,
}
