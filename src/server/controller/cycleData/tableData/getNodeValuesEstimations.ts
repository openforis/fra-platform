import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { NodeValuesEstimation } from 'meta/assessment/nodeValuesEstimation'

import { BaseProtocol, DB } from 'server/db/db'
import { TableRepository } from 'server/db/repository/assessment/table'
import { NodeValueEstimationRepository } from 'server/db/repository/assessmentCycle/nodeValueEstimationRepository'

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
  tableName: string
}

export const getNodeValuesEstimations = async (
  props: Props,
  client: BaseProtocol = DB
): Promise<Record<string, NodeValuesEstimation>> => {
  const { assessment, countryIso, cycle, tableName } = props

  const table = await TableRepository.getOne({ assessment, cycle, tableName })

  const tableEstimations = await NodeValueEstimationRepository.getMany(
    { assessment, cycle, countryIso, tableUuid: table.uuid },
    client
  )

  return tableEstimations.reduce((acc, curr) => ({ ...acc, [curr.uuid]: curr }), {})
}
