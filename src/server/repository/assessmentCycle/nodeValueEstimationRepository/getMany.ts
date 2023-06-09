import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { NodeValuesEstimation } from 'meta/assessment/nodeValuesEstimation'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
  tableUuid: string
}

export const getMany = (props: Props, client: BaseProtocol = DB): Promise<Array<NodeValuesEstimation>> => {
  const { assessment, cycle, countryIso, tableUuid } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return client.map<NodeValuesEstimation>(
    `
      with estimations_ranked as (
        select e.uuid,
          row_number() over (partition by jsonb_object_keys(e.variables) order by e.id desc) as row_number
        from ${schemaCycle}.node_values_estimation e
        where e.table_uuid = $1
          and e.country_iso = $2
        order by e.id desc
      )
      select e.uuid, e.country_iso, e.table_uuid, e.method, e.variables
      from ${schemaCycle}.node_values_estimation e
      where e.uuid in (select r.uuid from estimations_ranked r where r.row_number = 1);
    `,
    [tableUuid, countryIso],
    (row) => Objects.camelize(row)
  )
}
