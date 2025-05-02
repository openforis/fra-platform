import { publishMany } from 'server/repository/assessmentCycle/country/publishMany'

import { getCountryIsos } from './getCountryIsos'
import { getCountryLastPublishedInfo } from './getCountryLastPublishedInfo'
import { getMany, getManyRecord } from './getMany'
import { getOne } from './getOne'
import { update } from './update'

export const CountryRepository = {
  getCountryIsos,
  getCountryLastPublishedInfo,
  getMany,
  getManyRecord,
  getOne,
  publishMany,
  update,
}
