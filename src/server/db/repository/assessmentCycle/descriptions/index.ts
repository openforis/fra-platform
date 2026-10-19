import { getDataSources } from 'server/db/repository/assessmentCycle/descriptions/getDataSources'
import { getManyWithDataSourcesLinks } from 'server/db/repository/assessmentCycle/descriptions/getManyWithDataSourcesLinks'
import { getManyWithTextLinks } from 'server/db/repository/assessmentCycle/descriptions/getManyWithTextLinks'
import { getValues } from 'server/db/repository/assessmentCycle/descriptions/getValues'
import { getValuesLastApproved } from 'server/db/repository/assessmentCycle/descriptions/getValuesLastApproved'
import { remove } from 'server/db/repository/assessmentCycle/descriptions/remove'
import { upsert } from 'server/db/repository/assessmentCycle/descriptions/upsert'

export const DescriptionRepository = {
  getDataSources,
  getManyWithDataSourcesLinks,
  getManyWithTextLinks,
  getValues,
  getValuesLastApproved,
  remove,
  upsert,
}
