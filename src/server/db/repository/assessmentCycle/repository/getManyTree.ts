import { AreaCode } from 'meta/area/areaCode'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { RepositoryItemTree } from 'meta/cycleData/repository/item'
import { Objects } from 'utils/objects'

import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso?: AreaCode
  global: boolean
}

export const getManyTree = async (props: Props, client: BaseProtocol = DB): Promise<Array<RepositoryItemTree>> => {
  const { assessment, countryIso, cycle, global } = props
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  const condition = global ? 'country_iso is null' : 'country_iso = $1'

  // Map of parentUuid | null : RepositoryItem
  const nodeMap = new Map<string, RepositoryItemTree>()
  const roots: Array<RepositoryItemTree> = []

  await client.map(
    `
      with recursive tree as (
        select * from ${schemaCycle}.repository
        where parent_uuid is null
          and (props ->> 'hidden')::boolean is not true
          and ${condition}

        union all

        select r.* from ${schemaCycle}.repository r
        join tree t on r.parent_uuid = t.uuid
        where (r.props ->> 'hidden')::boolean is not true
      )
      select
        tree.*,
        case when tree.file_uuid is not null then (
          exists(select 1 from ${schemaCycle}.original_data_point odp where odp.data_source_references ilike '%' || tree.uuid::text || '%')
          or
          exists(select 1 from ${schemaCycle}.descriptions d where d.value::text ilike '%' || tree.uuid::text || '%')
        ) end as used
      from tree
      order by folder_name nulls last
    `,
    [countryIso],
    (row): void => {
      const node: RepositoryItemTree = { ...Objects.camelize(row), children: [] }
      nodeMap.set(node.uuid, node)
      if (node.parentUuid) nodeMap.get(node.parentUuid)?.children.push(node)
      else roots.push(node)
    }
  )

  return roots
}
