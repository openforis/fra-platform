import { getCountryIsos } from './getCountryIsos'
import { getMany, getManyRecord } from './getMany'
import { getOne } from './getOne'
import { update } from './update'

export const CountryRepository = {
  getMany,
  getManyRecord,
  getOne,
  update,
  getCountryIsos,
}
