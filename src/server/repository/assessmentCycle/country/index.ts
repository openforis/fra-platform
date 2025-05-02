import { getCountryIsos } from './getCountryIsos'
import { getCountryLastPublishedInfo } from './getCountryLastPublishedInfo'
import { getMany, getManyRecord } from './getMany'
import { getOne } from './getOne'
import { publishAllAccepted } from './publishAllAccepted'
import { update } from './update'

export const CountryRepository = {
  getCountryIsos,
  getCountryLastPublishedInfo,
  getMany,
  getManyRecord,
  getOne,
  publishAllAccepted,
  update,
}
