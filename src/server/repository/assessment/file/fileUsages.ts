import { Assessment, Cycle } from 'meta/assessment'
import { FileUsage } from 'meta/cycleData'

import { BaseProtocol, DB, Schemas } from 'server/db'

type FileIsInUseProps = { assessment: Assessment; cycle: Cycle; uuid: string }
export const fileUsages = async (props: FileIsInUseProps, client: BaseProtocol = DB): Promise<Array<FileUsage>> => {
  const { assessment, cycle, uuid } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return client.map<FileUsage>(
    `
-- Check usage:
-- Original Data Point
        select
            jsonb_build_object(
                    'key', 'nationalDataPoint.nationalDataPoint',
                    'suffixes', jsonb_build_array(odp.year, 'nationalDataPoint.references')) as values
        from ${schemaCycle}.original_data_point odp where odp.data_source_references ilike '%$1#%'
        union
-- Section descriptions
        select
            jsonb_build_object(
                    'key', d.section_name || '.' || d.section_name,
                    'suffixes', jsonb_build_array('description' || '.' || d.name )) as values
        from ${schemaCycle}.descriptions d
        where d.value::text ilike '%$1#%'

    `,
    [uuid],
    (row) => row.values
  )
}