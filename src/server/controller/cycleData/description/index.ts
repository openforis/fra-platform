import { DescriptionRepository } from 'server/repository/assessmentCycle/descriptions'

import { removeDataSource } from './removeDataSource'
import { upsertDescription } from './upsertDescription'

export const Description = {
  getDataSources: DescriptionRepository.getDataSources,
  getDescriptionValues: DescriptionRepository.getValues,
  removeDataSource,
  upsertDescription,
}
