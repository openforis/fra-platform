import * as pgPromise from 'pg-promise'
import { Objects } from 'utils/objects'
import { Promises } from 'utils/promises'

import { AssessmentNames, Cycle } from 'meta/assessment'
import { DashboardItem } from 'meta/dashboard'
import { NodeExtType } from 'meta/nodeExt'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'
import { Logger } from 'server/utils/logger'

import { forestArea } from './metadata/dashboard/forestArea'
import { forestAreaPercentOfLandArea } from './metadata/dashboard/forestAreaPercentOfLandArea'
import { forestAreaWithinProtectedAreas } from './metadata/dashboard/forestAreaWithinProtectedAreas'
import { forestGrowingStockAndCarbonDashboard } from './metadata/dashboard/forestGrowingStockAndCarbon'
import { forestOwnership } from './metadata/dashboard/forestOwnership'
import { naturallyRegeneratingForestArea } from './metadata/dashboard/naturallyRegeneratingForestArea'
import { primaryDesignatedManagementObjectiveDashboard } from './metadata/dashboard/primaryDesignatedManagementObjective'
import { primaryForestPercentOfForestArea } from './metadata/dashboard/primaryForestPercentOfForestArea'

type DashboardItemFactory = (cycle: Cycle, region: boolean) => DashboardItem

const dashboardItemFactories: Array<DashboardItemFactory> = [
  forestArea,
  forestGrowingStockAndCarbonDashboard,
  forestAreaPercentOfLandArea,
  primaryForestPercentOfForestArea,
  forestAreaWithinProtectedAreas,
  forestOwnership,
  primaryDesignatedManagementObjectiveDashboard,
  naturallyRegeneratingForestArea,
]

const keysToIgnore = ['uuid', 'id', 'rowId', 'tableId']

const _getDiffs = (
  countryItems: Array<DashboardItem>,
  regionItems: Array<DashboardItem>
): Array<Partial<DashboardItem> | undefined> => {
  return countryItems.map((countryItem, index) =>
    Objects.getDiffAsPartialObject<DashboardItem>(countryItem, regionItems[index], keysToIgnore)
  )
}

export default async (client: BaseProtocol) => {
  const pgp = pgPromise()
  const assessment = await AssessmentController.getOne({ assessmentName: AssessmentNames.fra }, client)
  await Promises.each(assessment.cycles, async (cycle) => {
    const schemaCycle = Schemas.getNameCycle(assessment, cycle)
    const dashboardItemsCountry = dashboardItemFactories.map((factory) => factory(cycle, false))
    const dashboardItemsRegion = dashboardItemFactories.map((factory) => factory(cycle, true))
    const diffs = _getDiffs(dashboardItemsCountry, dashboardItemsRegion)
    const nodeExtType = NodeExtType.dashboard

    const queryExists = `select 1 from ${schemaCycle}.node_ext where type = $1`
    const exists = (await client.manyOrNone(queryExists, [nodeExtType])).length > 0
    if (!exists) {
      const columns = ['type', 'value', 'props']
      const options = { table: { table: 'node_ext', schema: schemaCycle } }
      const cs = new pgp.helpers.ColumnSet(columns, options)
      const values = [
        { type: nodeExtType, value: JSON.stringify(dashboardItemsCountry), props: {} },
        { type: `${nodeExtType}`, value: JSON.stringify(diffs), props: { region: true } },
      ]
      const query = pgp.helpers.insert(values, cs)
      await client.none(query)
      Logger.info(`Inserted dashboard items for cycle ${cycle.name}`)
    } else {
      Logger.info(`Dashboard items for cycle ${cycle.name} already exist`)
    }
  })
}
