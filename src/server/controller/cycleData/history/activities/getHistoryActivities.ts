import { AreaCode } from 'meta/area'
import { ActivityLog } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { SectionName } from 'meta/assessment/section'

import { ActivityLogRepository } from 'server/db/repository/public/activityLog'

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

export const getHistoryActivities = async (props: Props): Promise<Returned> => {
  const { assessment, countryIso, cycle, limit, offset, sectionName, target } = props

  const message = messages[target]

  const getHistoryProps = { assessment, cycle, countryIso, sectionName, message, target, limit, offset }
  return ActivityLogRepository.getMany(getHistoryProps)
}
