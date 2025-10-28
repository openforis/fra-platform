import { forestArea } from 'tools/migrations/steps/steps/metadata/dashboard/forestArea'
import { forestAreaPercentOfLandArea } from 'tools/migrations/steps/steps/metadata/dashboard/forestAreaPercentOfLandArea'
import { forestAreaWithinProtectedAreas } from 'tools/migrations/steps/steps/metadata/dashboard/forestAreaWithinProtectedAreas'
import { forestGrowingStockAndCarbonDashboard } from 'tools/migrations/steps/steps/metadata/dashboard/forestGrowingStockAndCarbon'
import { forestOwnership } from 'tools/migrations/steps/steps/metadata/dashboard/forestOwnership'
import { naturallyRegeneratingForestArea } from 'tools/migrations/steps/steps/metadata/dashboard/naturallyRegeneratingForestArea'
import { primaryDesignatedManagementObjectiveDashboard } from 'tools/migrations/steps/steps/metadata/dashboard/primaryDesignatedManagementObjective'
import { primaryForestPercentOfForestArea } from 'tools/migrations/steps/steps/metadata/dashboard/primaryForestPercentOfForestArea'
import { Objects } from 'utils/objects'

import { AssessmentNames } from 'meta/assessment/assessment'

import { BaseProtocol, Schemas } from 'server/db'
import { AssessmentController } from 'server/controller/assessment'
import { CacheController } from 'server/cache/controller'

const assessmentName = AssessmentNames.fra
const cycleName = '2025'

export default async (client: BaseProtocol): Promise<void> => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName, cycleName, metaCache: true },
    client
  )

  const fns = [
    forestArea,
    forestGrowingStockAndCarbonDashboard,
    forestAreaPercentOfLandArea,
    primaryForestPercentOfForestArea,
    forestAreaWithinProtectedAreas,
    forestOwnership,
    primaryDesignatedManagementObjectiveDashboard,
    naturallyRegeneratingForestArea,
  ]

  const countryDashboardItems = fns.map((fn) => fn(cycle, false))
  const regionDashboardItems = fns.map((fn) => fn(cycle, true))
  const regionDashboardItemsPartial = countryDashboardItems.map((countryDashboardItem, i) => {
    return Objects.getDiff(countryDashboardItem, regionDashboardItems[i])
  })

  const schemaName = Schemas.getNameCycle(assessment, cycle)
  await client.query(
    `update ${schemaName}.node_ext set value = $1::jsonb where type ='dashboard' and props ->> 'region' is null `,
    [JSON.stringify(countryDashboardItems)]
  )
  await client.query(
    `update ${schemaName}.node_ext set value = $1::jsonb where type ='dashboard' and props ->> 'region' = 'true' `,
    [JSON.stringify(regionDashboardItemsPartial)]
  )

  // Set fra 2020, 2025 cycle metadata
  await client.query(`
    update public.assessment_cycle ac
    set props = props || '{"dashboard": { "region": true }}'
    where ac.id in (select ac.id
                    from public.assessment_cycle ac
                           left join public.assessment a on ac.assessment_id = a.id
                    where ac.name in ('2020', '2025')
                      and a.props ->> 'name' = 'fra'
    )
  `)

  await CacheController.generateAssessments(client)
}
