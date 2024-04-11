import { AreaCode } from 'meta/area'
import { ActivityLog, Assessment, Cycle, SectionName } from 'meta/assessment'

import { ActivityLogRepository } from 'server/repository/public/activityLog'

import { messages } from './messages'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: AreaCode
  sectionName: SectionName
  target: string
  limit: string
  offset: string
}

type Returned = Array<ActivityLog<never>>

export const getHistory = async (props: Props): Promise<Returned> => {
  const { assessment, cycle, countryIso, sectionName, target, limit, offset } = props

  const message = messages[target]

  const getHistoryProps = { assessment, cycle, countryIso, sectionName, message, target, limit, offset }
  return ActivityLogRepository.getMany(getHistoryProps)
}
