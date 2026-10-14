import { AreaCode } from 'meta/area/areaCode'
import { Areas } from 'meta/area/areas'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { DashboardItem, DashboardItemType } from 'meta/dashboard/item'
import { Objects } from 'utils/objects'

import { NodeExtRepository } from 'server/db/repository/assessmentCycle/nodeExt'

type Props = {
  assessment: Assessment
  cycle: Cycle
  areaCode: AreaCode
}

export const getManyItems = async (props: Props): Promise<Array<DashboardItem<DashboardItemType>>> => {
  const { areaCode, assessment, cycle } = props
  const isISOCountry = Areas.isISOCountry(areaCode)
  const countryDashboardItems = await NodeExtRepository.getManyDashboardItems({ assessment, cycle })
  if (isISOCountry) return countryDashboardItems

  const regionDashboardItems = await NodeExtRepository.getManyDashboardItems({ assessment, cycle, region: true })

  return Objects.merge(countryDashboardItems, regionDashboardItems)
}
