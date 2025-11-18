import { createMaterializedView } from 'server/db/repository/assessmentCycle/countryActivityLog/createMaterializedView'
import { dropMaterializedView } from 'server/db/repository/assessmentCycle/countryActivityLog/dropMaterializedView'
import { getCount } from 'server/db/repository/assessmentCycle/countryActivityLog/getCount'
import { getCountryISOsOutOfSync } from 'server/db/repository/assessmentCycle/countryActivityLog/getCountryISOsOutOfSync'
import { getMany } from 'server/db/repository/assessmentCycle/countryActivityLog/getMany'
import { refreshMaterializedView } from 'server/db/repository/assessmentCycle/countryActivityLog/refreshMaterializedView'

export const CountryActivityLogRepository = {
  createMaterializedView,
  dropMaterializedView,
  getCount,
  getCountryISOsOutOfSync,
  getMany,
  refreshMaterializedView,
}
