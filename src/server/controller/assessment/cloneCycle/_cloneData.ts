import { CloneProps } from 'server/controller/assessment/cloneCycle/types'
import { BaseProtocol, Schemas } from 'server/db'

/**
 * Clones all data from cycleSource to cycleTarget.
 * N.B. Also uuids are copied
 */
export const cloneData = async (props: CloneProps, client: BaseProtocol): Promise<void> => {
  const { assessment, cycleSource, cycleTarget } = props

  const schemaCycleSource = Schemas.getNameCycle(assessment, cycleSource)
  const schemaCycleTarget = Schemas.getNameCycle(assessment, cycleTarget)

  await client.query(`
      insert into ${schemaCycleTarget}.node (uuid, country_iso, row_uuid, col_uuid, value)
      select uuid, country_iso, row_uuid, col_uuid, value
      from ${schemaCycleSource}.node;

      insert into ${schemaCycleTarget}.node_ext (country_iso, parent_uuid, props, type, uuid, value)
      select country_iso, parent_uuid, props, type, uuid, value
      from ${schemaCycleSource}.node_ext;

      insert into ${schemaCycleTarget}.node_values_estimation (uuid, country_iso, table_uuid, created_at, method, variables)
      select uuid, country_iso, table_uuid, created_at, method, variables
      from ${schemaCycleSource}.node_values_estimation;

      insert into ${schemaCycleTarget}.original_data_point
      (country_iso, year, data_source_additional_comments, data_source_methods, data_source_references, description,
       national_classes, values, id_legacy)
      select country_iso,
             year,
             data_source_additional_comments,
             data_source_methods,
             data_source_references,
             description,
             national_classes,
             values,
             id_legacy
      from ${schemaCycleSource}.original_data_point;

      insert into ${schemaCycleTarget}.descriptions (country_iso, section_name, name, value)
      select country_iso, section_name, name, value
      from ${schemaCycleSource}.descriptions;

      insert into ${schemaCycleTarget}.repository (uuid, country_iso, file_uuid, link, props)
      select uuid, country_iso, file_uuid, link, props
      from ${schemaCycleSource}.repository;
  `)
}
