import { Objects } from 'utils/objects'

import { AreaCode } from 'meta/area/areaCode'
import { Areas } from 'meta/area/areas'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { DashboardItem, DashboardItemType } from 'meta/dashboard/item'

import { NodeExtRepository } from 'server/db/repository/assessmentCycle/nodeExt'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: AreaCode
}

export const getManyItems = async (props: Props): Promise<Array<DashboardItem<DashboardItemType>>> => {
  const { assessment, countryIso, cycle } = props
  const isISOCountry = Areas.isISOCountry(countryIso)
  const countryDashboardItems = await NodeExtRepository.getManyDashboardItems({ assessment, cycle })
  if (isISOCountry) return countryDashboardItems

  const regionDashboardItems = await NodeExtRepository.getManyDashboardItems({ assessment, cycle, region: true })

  return Objects.merge(countryDashboardItems, regionDashboardItems)
}
