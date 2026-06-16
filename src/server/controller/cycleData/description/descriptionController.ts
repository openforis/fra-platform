import { getLastApproved } from 'server/controller/cycleData/description/getLastApproved'
import { removeDataSource } from 'server/controller/cycleData/description/removeDataSource'
import { upsertDescription } from 'server/controller/cycleData/description/upsertDescription'
import { DescriptionRepository } from 'server/db/repository/assessmentCycle/descriptions'

export const DescriptionController = {
  getDataSources: DescriptionRepository.getDataSources,
  getValues: DescriptionRepository.getValues,
  getLastApproved,
  removeDataSource,
  upsertDescription,
}
