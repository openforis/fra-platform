import { BaseProtocol, DB, Schemas } from '@server/db'
import { Objects } from '@core/utils'
import { Assessment, Table } from '@meta/assessment'

export const getTable = async (
  props: { assessment: Assessment; assessmentCycleUuid: string; tableName: string },
  client: BaseProtocol = DB
): Promise<Table> => {
  const schemaName = Schemas.getName(props.assessment)
  return client
    .oneOrNone<Table>(
      `
          select t.*
          from ${schemaName}.table t
          where props ->> 'name' = $2 
            and props -> 'cycles' ? $1;
      `,
      [props.assessmentCycleUuid, props.tableName]
    )
    .then(Objects.camelize)
}
