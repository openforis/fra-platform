import { CountryActivityLogRepository } from 'server/db/repository/assessmentCycle/countryActivityLog'

export const CycleDataController = {
  // ==== activities
  getActivities: CountryActivityLogRepository.getMany,
  getActivitiesCount: CountryActivityLogRepository.getCount,
}
