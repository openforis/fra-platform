import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { NodeValuesEstimation } from 'meta/assessment/nodeValuesEstimation'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
  estimation: NodeValuesEstimation
}

export const create = (props: Props, client: BaseProtocol = DB): Promise<NodeValuesEstimation> => {
  const { assessment, countryIso, cycle, estimation } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return client.one<NodeValuesEstimation>(
    `
        insert into ${schemaCycle}.node_values_estimation (uuid, country_iso, table_uuid, method, variables)
        values ($1, $2, $3, $4, $5::json)
        returning *
    `,
    [estimation.uuid, countryIso, estimation.tableUuid, estimation.method, JSON.stringify(estimation.variables)],
    Objects.camelize
  )
}
