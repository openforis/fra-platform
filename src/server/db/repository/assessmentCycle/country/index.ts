import { getCountryIsos } from 'server/db/repository/assessmentCycle/country/getCountryIsos'
import { getCountryLastPublishedInfo } from 'server/db/repository/assessmentCycle/country/getCountryLastPublishedInfo'
import { getMany, getManyRecord } from 'server/db/repository/assessmentCycle/country/getMany'
import { getOne } from 'server/db/repository/assessmentCycle/country/getOne'
import { publishAllAccepted } from 'server/db/repository/assessmentCycle/country/publishAllAccepted'
import { update } from 'server/db/repository/assessmentCycle/country/update'

export const CountryRepository = {
  getCountryIsos,
  getCountryLastPublishedInfo,
  getMany,
  getManyRecord,
  getOne,
  publishAllAccepted,
  update,
}
