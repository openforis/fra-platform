import { PropsMerge } from 'tools/cycles/merge/_types'
import { getSchemas } from 'tools/cycles/merge/_utils'

import { BaseProtocol } from 'server/db/db'

export const mergeData = async (props: PropsMerge, client: BaseProtocol): Promise<void> => {
  const { countryISOs } = props

  const { schemaCycleFrom, schemaCycleTo } = getSchemas(props)
  const params = { countryISOs }

  await client.query(
    `
      delete
      from ${schemaCycleTo}.node
      where country_iso in ($(countryISOs:list));

      insert into ${schemaCycleTo}.node
        (uuid, country_iso, row_uuid, col_uuid, value)
      select f.uuid, f.country_iso, f.row_uuid, f.col_uuid, f.value
      from ${schemaCycleFrom}.node f
      where f.country_iso in ($(countryISOs:list));


      delete
      from ${schemaCycleTo}.node_values_estimation
      where country_iso in ($(countryISOs:list));

      insert into ${schemaCycleTo}.node_values_estimation
        (uuid, country_iso, table_uuid, created_at, method, variables)
      select f.uuid, f.country_iso, f.table_uuid, f.created_at, f.method, f.variables
      from ${schemaCycleFrom}.node_values_estimation f
      where f.country_iso in ($(countryISOs:list));

      delete
      from ${schemaCycleTo}.original_data_point
      where country_iso in ($(countryISOs:list));

      insert into ${schemaCycleTo}.original_data_point
      (country_iso, "year", comments_extentofforest, national_classes, "values", id_legacy,
       comments_forestcharacteristics, uuid)
      select f.country_iso,
             f."year",
             f.comments_extentofforest,
             f.national_classes,
             f."values",
             f.id_legacy,
             f.comments_forestcharacteristics,
             f.uuid
      from ${schemaCycleFrom}.original_data_point f
      where f.country_iso in ($(countryISOs:list));
    `,
    params
  )
}
