import { getCountryIsos } from './getCountryIsos'
import { getMany } from './getMany'
import { getOne } from './getOne'
import { update } from './update'

export const CountryRepository = {
  getMany,
  getOne,
  update,
  getCountryIsos,
}
