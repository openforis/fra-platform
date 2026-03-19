import { AreaCode } from 'meta/area/areaCode'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { RepositoryFolder } from 'meta/cycleData/repository/folder'
import { RepositoryItem } from 'meta/cycleData/repository/item'
import { Objects } from 'utils/objects'

import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso?: AreaCode
  global: boolean
}

type Returned = {
  items: Array<RepositoryItem>
  folders: Array<RepositoryFolder>
}

export const getManyAsTree = async (props: Props, client: BaseProtocol = DB): Promise<Returned> => {
  const { assessment, countryIso, cycle, global } = props
  const schema = Schemas.getNameCycle(assessment, cycle)

  const countryCondition = global ? `r.country_iso is null` : `r.country_iso = $(countryIso)`

  return client.one<Returned>(
    `
    with recursive items as (
      select *
      from ${schema}.repository r
      where ${countryCondition}
        and (r.props ->> 'hidden')::boolean is not true
    ),
    relevant_folders(uuid, name, parent_uuid) as (
      select f.uuid, f.name, f.parent_uuid
      from ${schema}.repository_folder f
      where f.uuid in (select folder_uuid from items where folder_uuid is not null)

      union

      select f.uuid, f.name, f.parent_uuid
      from ${schema}.repository_folder f
       -- recursively get (parent) folders
      join relevant_folders rf on rf.parent_uuid = f.uuid
    )
    select jsonb_build_object(
      'items',   coalesce((select jsonb_agg(to_jsonb(i) order by i.id) from items i),           '[]'),
      'folders', coalesce((select jsonb_agg(to_jsonb(rf))              from relevant_folders rf), '[]')
    ) as result
    `,
    { countryIso },
    (row) => Objects.camelize(row.result)
  )
}
