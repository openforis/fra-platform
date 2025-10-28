import { cacheCountryTable } from 'server/cache/repository/data/cacheCountryTable'
import { getCountriesData } from 'server/cache/repository/data/getCountriesData'
import { getODPYears } from 'server/cache/repository/data/getODPYears'
import { removeCountriesData } from 'server/cache/repository/data/removeCountriesData'
import { removeNodes } from 'server/cache/repository/data/removeNodes'
import { renameCountriesData } from 'server/cache/repository/data/renameCountriesData'
import { updateNode } from 'server/cache/repository/data/updateNode'
import { updateNodes } from 'server/cache/repository/data/updateNodes'

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
