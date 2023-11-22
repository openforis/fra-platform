import { Assessment, Cycle } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'

type FileIsInUseProps = { assessment: Assessment; cycle: Cycle; uuid: string }
export const fileIsInUse = async (
  props: FileIsInUseProps,
  client: BaseProtocol = DB
): Promise<Array<{ key: string; suffixes?: Array<string> }>> => {
  const { assessment, cycle, uuid } = props

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return client.map<{ key: string; suffixes?: Array<string> }>(
    `
        select
            jsonb_build_object(
                    'key', 'nationalDataPoint.nationalDataPoint',
                    'suffixes', jsonb_build_array(odp.year, 'nationalDataPoint.references')) as values
        from ${schemaCycle}.original_data_point odp where odp.data_source_references ilike '%$1#%'
    `,
    [uuid],
    (row) => row.values
  )
}
