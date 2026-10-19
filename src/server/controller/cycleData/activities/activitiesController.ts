import { CountryActivityLogRepository } from 'server/db/repository/assessmentCycle/countryActivityLog'

export const ActivitiesController = {
  getActivities: CountryActivityLogRepository.getMany,
  getActivitiesCount: CountryActivityLogRepository.getCount,
}
