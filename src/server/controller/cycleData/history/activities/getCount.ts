import { AreaCode } from 'meta/area'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { SectionName } from 'meta/assessment/section'
import { TablePaginatedCount } from 'meta/tablePaginated'

import { ActivityLogRepository } from 'server/repository/public/activityLog'

import { messages } from './messages'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: AreaCode
  sectionName: SectionName
  target: string
}

export const getCount = async (props: Props): Promise<TablePaginatedCount> => {
  const { assessment, cycle, countryIso, sectionName, target } = props

  const message = messages[target]

  const getHistoryProps = { assessment, cycle, countryIso, sectionName, message, target }
  return ActivityLogRepository.getCount(getHistoryProps)
}
