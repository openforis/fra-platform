import { Repository } from 'server/controller/cycleData/repository'
import { CountryActivityLogRepository } from 'server/db/repository/assessmentCycle/countryActivityLog'

export const CycleDataController = {
  // ==== activities
  getActivities: CountryActivityLogRepository.getMany,
  getActivitiesCount: CountryActivityLogRepository.getCount,

  // ====== repository
  Repository,
}
