import { DescriptionRepository } from 'server/db/repository/assessmentCycle/descriptions'
import { getDescriptionsLastApproved } from 'server/controller/cycleData/description/getDescriptionsLastApproved'

import { removeDataSource } from './removeDataSource'
import { upsertDescription } from './upsertDescription'

export const Description = {
  getDataSources: DescriptionRepository.getDataSources,
  getDescriptionValues: DescriptionRepository.getValues,
  getDescriptionsLastApproved,
  removeDataSource,
  upsertDescription,
}
