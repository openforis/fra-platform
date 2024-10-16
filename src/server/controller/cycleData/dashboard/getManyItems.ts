import { Objects } from 'utils/objects'

import { AreaCode, Areas } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { DashboardItem, DashboardItemType } from 'meta/dashboard'

import { NodeExtRepository } from 'server/repository/assessmentCycle/nodeExt'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: AreaCode
}

export const getManyItems = async (props: Props): Promise<Array<DashboardItem<DashboardItemType>>> => {
  const { assessment, cycle, countryIso } = props
  const isISOCountry = Areas.isISOCountry(countryIso)
  const countryDashboardItems = await NodeExtRepository.getManyDashboardItems({ assessment, cycle })
  if (isISOCountry) return countryDashboardItems

  const regionDashboardItems = await NodeExtRepository.getManyDashboardItems({ assessment, cycle, region: true })

  return Objects.merge(countryDashboardItems, regionDashboardItems)
}
