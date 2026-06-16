import { Links } from 'server/controller/cycleData/links'
import { Report } from 'server/controller/cycleData/report'
import { Repository } from 'server/controller/cycleData/repository'
import { CountryActivityLogRepository } from 'server/db/repository/assessmentCycle/countryActivityLog'

export const CycleDataController = {
  // ==== activities
  getActivities: CountryActivityLogRepository.getMany,
  getActivitiesCount: CountryActivityLogRepository.getCount,

  // ====== report
  Report,

  // ====== repository
  Repository,

  // ====== links
  Links,
}
