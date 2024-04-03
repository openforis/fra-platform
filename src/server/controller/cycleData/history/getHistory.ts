import { AreaCode } from 'meta/area'
import { ActivityLog, ActivityLogMessage, Assessment, Cycle, SectionName } from 'meta/assessment'

import { ActivityLogRepository } from 'server/repository/public/activityLog'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: AreaCode
  sectionName: SectionName
  target: string
}

type Returned = Array<ActivityLog<never>>

const messages: Record<string, ActivityLogMessage> = {
  dataSources: ActivityLogMessage.descriptionUpdate,
}

export const getHistory = async (props: Props): Promise<Returned> => {
  const { assessment, cycle, countryIso, sectionName, target } = props

  const message = messages[target]

  const getHistoryProps = { assessment, cycle, countryIso, sectionName, message, target }
  return ActivityLogRepository.getMany(getHistoryProps)
}
