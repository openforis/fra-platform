import { cacheCountryTable } from './cacheCountryTable'
import { getCountriesData } from './getCountriesData'
import { getODPYears } from './getODPYears'
import { removeNodes } from './removeNodes'
import { updateNode } from './updateNode'
import { updateNodes } from './updateNodes'

export const DataRedisRepository = {
  cacheCountryTable,
  getCountriesData,
  getODPYears,
  removeNodes,
  updateNode,
  updateNodes,
}
