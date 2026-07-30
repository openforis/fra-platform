import { PropsMerge } from 'tools/cycles/merge/_types'
import { getSchemas } from 'tools/cycles/merge/_utils'

import { BaseProtocol } from 'server/db/db'

export const mergeData = async (props: PropsMerge, client: BaseProtocol): Promise<void> => {
  const { schemaCycleFrom, schemaCycleTo } = getSchemas(props)

  await client.query(
    `
      insert into ${schemaCycleTo}.node
        (uuid, country_iso, row_uuid, col_uuid, value)
      select f.uuid, f.country_iso, f.row_uuid, f.col_uuid, f.value
      from ${schemaCycleFrom}.node f on conflict (country_iso, col_uuid, row_uuid) do
      update
        set value = excluded.value;

      insert into ${schemaCycleTo}.node_values_estimation
        (uuid, country_iso, table_uuid, created_at, method, variables)
      select f.uuid, f.country_iso, f.table_uuid, f.created_at, f.method, f.variables
      from ${schemaCycleFrom}.node_values_estimation f on conflict (uuid) do nothing
    `
  )
}
