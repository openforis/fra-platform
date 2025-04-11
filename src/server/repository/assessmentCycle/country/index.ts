import { getCountryIsos } from './getCountryIsos'
import { getCountryLastPublishedInfo } from './getCountryLastPublishedInfo'
import { getMany, getManyRecord } from './getMany'
import { getOne } from './getOne'
import { update } from './update'

export const CountryRepository = {
  getMany,
  getManyRecord,
  getOne,
  update,
  getCountryIsos,
  getCountryLastPublishedInfo,
}
