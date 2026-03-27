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

  const linkedInOdp = (ref: string): string =>
    `exists(select 1 from ${schemaCycle}.original_data_point odp where odp.country_iso = tree.country_iso and odp.data_source_references ilike '%' || ${ref} || '%')`
  const linkedInDescriptions = (ref: string): string =>
    `exists(select 1 from ${schemaCycle}.descriptions d where d.country_iso = tree.country_iso and d.value::text ilike '%' || ${ref} || '%')`

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
        -- For items (not folders): populate "linked"
        case when tree.folder_name is null then (
             ${linkedInOdp('tree.uuid::text')}
          or ${linkedInDescriptions('tree.uuid::text')}
          or (tree.link is not null and ${linkedInDescriptions('tree.link')})
          or (tree.link is not null and ${linkedInOdp('tree.link')})
        ) end as linked
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
