import { cacheCountryTable } from './cacheCountryTable'
import { getCountriesData } from './getCountriesData'
import { getODPYears } from './getODPYears'
import { removeCountriesData } from './removeCountriesData'
import { removeNodes } from './removeNodes'
import { renameCountriesData } from './renameCountriesData'
import { updateNode } from './updateNode'
import { updateNodes } from './updateNodes'

export const DataRedisRepository = {
  cacheCountryTable,
  getCountriesData,
  getODPYears,
  removeCountriesData,
  removeNodes,
  renameCountriesData,
  updateNode,
  updateNodes,
}
