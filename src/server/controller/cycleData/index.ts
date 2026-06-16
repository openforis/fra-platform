import { Report } from 'server/controller/cycleData/report'
import { CountryActivityLogRepository } from 'server/db/repository/assessmentCycle/countryActivityLog'

export const CycleDataController = {
  // ==== activities
  getActivities: CountryActivityLogRepository.getMany,
  getActivitiesCount: CountryActivityLogRepository.getCount,

  // ====== report
  Report,
}
