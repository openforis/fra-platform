import { Assessment, Table } from '@meta/assessment'
import { BaseProtocol, DB, Schemas } from '@server/db'
import { Objects } from '@core/utils'

export const getTable = async (
  props: { assessment: Assessment; assessmentCycleUuid: string; tableName: string },
  client: BaseProtocol = DB
): Promise<Table> => {
  const schemaName = Schemas.getName(props.assessment)

  return client.one<Table>(
    `
          select t.*
          from ${schemaName}.table t
          where props ->> 'name' = $2 
            and props -> 'cycles' ? $1;
      `,
    [props.assessmentCycleUuid, props.tableName],
    Objects.camelize
  )
}
