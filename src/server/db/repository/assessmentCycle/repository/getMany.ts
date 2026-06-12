import { AreaCode } from 'meta/area/areaCode'
import { Assessment } from 'meta/assessment/assessment'
import { Assessments } from 'meta/assessment/assessments'
import { Cycle } from 'meta/assessment/cycle'
import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { SectionNames } from 'meta/assessment/section'
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

export const getMany = async (props: Props, client: BaseProtocol = DB): Promise<Array<RepositoryItemTree>> => {
  const { assessment, countryIso, cycle, global } = props
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  const condition = global ? 'country_iso is null' : 'country_iso = $1'

  const hasODPFeature = Assessments.hasODPFeature(assessment)
  const odpUsageClause = hasODPFeature
    ? `
            union all
            select jsonb_build_object(
              'sectionName', '${SectionNames.originalDataPoints}',
              'suffix', odp.year::text,
              'locations', jsonb_build_array(jsonb_build_object('key', 'nationalDataPoint.references'))
            ) as u
            from ${schemaCycle}.original_data_point odp
              left join ${schemaCycle}.descriptions d 
                on odp.uuid = d.section_uuid and d.name = '${CommentableDescriptionName.dataSources}' and d.section_name = '${SectionNames.nationalDataPoint}'
            where odp.country_iso = tree.country_iso
              and exists
                  (select 1
                   from jsonb_array_elements(d.value) elem
                   where elem ->> 'type' ilike '%' || tree.uuid::text || '%')
            `
    : ''

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
        -- For items (not folders): aggregate usages
        case when tree.folder_name is null then (
          select coalesce(jsonb_agg(u), '[]'::jsonb)
          from (
            select jsonb_build_object(
              'sectionName', d.section_name,
              'locations', jsonb_build_array(jsonb_build_object('key', 'description.' || d.name))
            ) as u
            from ${schemaCycle}.descriptions d
            where d.country_iso = tree.country_iso
              and d.value::text ilike '%' || tree.uuid::text || '%'
            ${odpUsageClause}
          ) sub
        ) end as usages,
        -- For file items: extract extension from file.name
        case when tree.file_uuid is not null then lower(split_part(f.name, '.', -1)) end as file_type
      from tree
      left join public.file f on f.uuid = tree.file_uuid
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
