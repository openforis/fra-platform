import { getDataSources } from 'server/db/repository/assessmentCycle/descriptions/getDataSources'
import { getMany } from 'server/db/repository/assessmentCycle/descriptions/getMany'
import { getManyWithDataSourcesLinks } from 'server/db/repository/assessmentCycle/descriptions/getManyWithDataSourcesLinks'
import { getManyWithTextLinks } from 'server/db/repository/assessmentCycle/descriptions/getManyWithTextLinks'
import { getValues } from 'server/db/repository/assessmentCycle/descriptions/getValues'
import { getValuesLastApproved } from 'server/db/repository/assessmentCycle/descriptions/getValuesLastApproved'
import { upsert } from 'server/db/repository/assessmentCycle/descriptions/upsert'

export const DescriptionRepository = {
  getDataSources,
  getMany,
  getManyWithDataSourcesLinks,
  getManyWithTextLinks,
  getValues,
  getValuesLastApproved,
  upsert,
}
