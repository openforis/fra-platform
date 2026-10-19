import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { TableNames } from 'meta/assessment/table'
import { NodeExtType } from 'meta/nodeExt/nodeExt'

import { CloneProps } from 'server/controller/assessment/cloneCycle/types'
import { BaseProtocol } from 'server/db/db'
import { ODPCommentColumns } from 'server/db/repository/assessmentCycle/originalDataPoint/commentColumns'
import { Schemas } from 'server/db/schemas'

/**
 * Clones all data from cycleSource to cycleTarget.
 * N.B. Also uuids are copied
 */
export const cloneData = async (props: CloneProps, client: BaseProtocol): Promise<void> => {
  const { assessment, cycleSource, cycleTarget } = props

  const schemaCycleSource = Schemas.getNameCycle(assessment, cycleSource)
  const schemaCycleTarget = Schemas.getNameCycle(assessment, cycleTarget)
  const commentColumnExtentOfForest = ODPCommentColumns[TableNames.extentOfForest]
  const commentColumnForestCharacteristics = ODPCommentColumns[TableNames.forestCharacteristics]

  await client.query(`
      insert into ${schemaCycleTarget}.node (uuid, country_iso, row_uuid, col_uuid, value)
      select uuid, country_iso, row_uuid, col_uuid, value
      from ${schemaCycleSource}.node;

      insert into ${schemaCycleTarget}.node_ext (
          country_iso, parent_uuid, props, type, uuid, value
      )
      select 
          country_iso, parent_uuid, props, type, uuid,
          case 
              when type = '${NodeExtType.dashboard}' then 
                  replace(value::text, '${cycleSource.uuid}', '${cycleTarget.uuid}')::jsonb
              else value
          end as value
      from ${schemaCycleSource}.node_ext;

      insert into ${schemaCycleTarget}.node_values_estimation (uuid, country_iso, table_uuid, created_at, method, variables)
      select uuid, country_iso, table_uuid, created_at, method, variables
      from ${schemaCycleSource}.node_values_estimation;

      insert into ${schemaCycleTarget}.original_data_point
      (uuid, country_iso, year, ${commentColumnExtentOfForest}, ${commentColumnForestCharacteristics}, national_classes, values, id_legacy)
      select uuid,
             country_iso,
             year,
             ${commentColumnExtentOfForest},
             ${commentColumnForestCharacteristics},
             national_classes,
             values,
             id_legacy
      from ${schemaCycleSource}.original_data_point;

      insert into ${schemaCycleTarget}.descriptions (country_iso, section_name, section_uuid, name, value)
      select country_iso,
             section_name,
             section_uuid,
             name,
             case
                 when name = '${CommentableDescriptionName.dataSources}' then jsonb_delete(value, 'text')
                 else value
                 end -- // delete nationalData->dataSources->text needed only in FRA 2025 
      from ${schemaCycleSource}.descriptions;

      insert into ${schemaCycleTarget}.repository (uuid, country_iso, file_uuid, link, props)
      select uuid, country_iso, file_uuid, link, props
      from ${schemaCycleSource}.repository;
  `)
}
