import { Assessment, Cycle, SectionNames } from 'meta/assessment'
import { FileUsage } from 'meta/file'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = { assessment: Assessment; cycle: Cycle; uuid: string }

export const getUsages = async (props: Props, client: BaseProtocol = DB): Promise<Array<FileUsage>> => {
  const { assessment, cycle, uuid } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return client.map<FileUsage>(
    `
-- Original Data Point
        select
            jsonb_build_object(
                    'sectionName', '${SectionNames.originalDataPoints}',
                    'suffix', odp.year,
                    'locations', jsonb_build_array(jsonb_build_object('key', 'nationalDataPoint.references'))) as values

        from ${schemaCycle}.original_data_point odp where odp.data_source_references ilike '%$1#%'
        union
-- Section descriptions
        select
            jsonb_build_object(
                    'sectionName', d.section_name,
                    'locations', jsonb_build_array(jsonb_build_object('key', 'description' || '.' || d.name))) as values
        from ${schemaCycle}.descriptions d
        where d.value::text ilike '%$1#%'
    `,
    [uuid],
    (row) => row.values
  )
}
