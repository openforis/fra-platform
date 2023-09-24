import { getCountriesData } from './getCountriesData'
import { getODPYears } from './getODPYears'
import { updateNode } from './updateNode'
import { updateNodes } from './updateNodes'

export const DataRedisRepository = {
  getODPYears,
  getCountriesData,
  updateNode,
  updateNodes,
}
