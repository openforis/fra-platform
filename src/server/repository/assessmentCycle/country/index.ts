import { getCountryIsos } from './getCountryIsos'
import { getCountryLastPublishedInfo } from './getCountryLastPublishedInfo'
import { getMany, getManyRecord } from './getMany'
import { getOne } from './getOne'
import { publishAll } from './publishAll'
import { update } from './update'

export const CountryRepository = {
  getCountryIsos,
  getCountryLastPublishedInfo,
  getMany,
  getManyRecord,
  getOne,
  publishAll,
  update,
}
