import { AreaCode } from 'meta/area'
import { ActivityLog, ActivityLogMessage, Assessment, Cycle, SectionName } from 'meta/assessment'

import { ActivityLogRepository } from 'server/repository/public/activityLog'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: AreaCode
  sectionName: SectionName
  message: ActivityLogMessage
  targetName: string
}

type Returned = Array<ActivityLog<never>>

export const getHistory = async (props: Props): Promise<Returned> => {
  const { assessment, cycle, countryIso, sectionName, message, targetName } = props

  const getHistoryProps = { assessment, cycle, countryIso, sectionName, message, targetName }
  return ActivityLogRepository.getMany(getHistoryProps)
}
