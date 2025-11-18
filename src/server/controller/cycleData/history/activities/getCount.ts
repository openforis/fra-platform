import { AreaCode } from 'meta/area/areaCode'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { SectionName } from 'meta/assessment/section'
import { TablePaginatedCount } from 'meta/tablePaginated/count'

import { ActivityLogRepository } from 'server/db/repository/public/activityLog'

import { messages } from './messages'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: AreaCode
  sectionName: SectionName
  target: string
}

export const getCount = async (props: Props): Promise<TablePaginatedCount> => {
  const { assessment, countryIso, cycle, sectionName, target } = props

  const message = messages[target]

  const getHistoryProps = { assessment, cycle, countryIso, sectionName, message, target }
  return ActivityLogRepository.getCount(getHistoryProps)
}
