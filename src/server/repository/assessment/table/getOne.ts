import { Assessment, Cycle, Table, TableName } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'
import { TableAdapter } from 'server/repository/adapter'

type Props = {
  assessment: Assessment
  cycle: Cycle
  tableName: TableName
}

export const getOne = async (props: Props, client: BaseProtocol = DB): Promise<Table> => {
  const { assessment, cycle } = props

  const schemaName = Schemas.getName(assessment)

  return client.one<Table>(
    `
          select t.*
          from ${schemaName}.table t
          where props ->> 'name' = $2 
            and props -> 'cycles' ? $1;
      `,
    [cycle.uuid, props.tableName],
    TableAdapter
  )
}
