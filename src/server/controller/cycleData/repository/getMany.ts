import { AreaCode } from 'meta/area/areaCode'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Cycles } from 'meta/assessment/cycles'
import { RepositoryItem } from 'meta/cycleData/repository/item'

import { RepositoryRepository } from 'server/db/repository/assessmentCycle/repository'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso?: AreaCode
  global: boolean
}

export const getMany = async (props: Props): Promise<Array<RepositoryItem>> => {
  const { assessment, countryIso, cycle, global } = props

  const items = await RepositoryRepository.getMany({ assessment, countryIso, global })

  // For global items return [this cycle items] + [previous cycle items]
  if (global) {
    const previousCycleUuids = Cycles.getPreviousCycles({ assessment, cycle }).map((c) => c.uuid)
    return items.filter((item) => previousCycleUuids.includes(item.cycleUuid))
  }

  return items
}
