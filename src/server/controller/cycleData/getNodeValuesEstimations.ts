import { CountryIso } from 'meta/area'
import { Assessment, Cycle, NodeValuesEstimation } from 'meta/assessment'

import { BaseProtocol, DB } from 'server/db'
import { TableRepository } from 'server/repository/assessment/table'
import { NodeValueEstimationRepository } from 'server/repository/assessmentCycle/nodeValueEstimationRepository'

export const getNodeValuesEstimations = async (
  props: {
    assessment: Assessment
    countryIso: CountryIso
    cycle: Cycle
    tableName: string
  },
  client: BaseProtocol = DB
): Promise<Record<string, NodeValuesEstimation>> => {
  const { assessment, cycle, countryIso, tableName } = props

  const table = await TableRepository.getOne({ assessment, cycle, tableName })

  const tableEstimations = await NodeValueEstimationRepository.getMany(
    { assessment, cycle, countryIso, tableUuid: table.uuid },
    client
  )

  return tableEstimations.reduce((acc, curr) => ({ ...acc, [curr.uuid]: curr }), {})
}
