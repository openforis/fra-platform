import { Assessment, Cycle, Table } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'
import { TableAdapter } from 'server/repository/adapter'

type Props = {
  assessment: Assessment
  cycle: Cycle
  tableNames?: Array<string>
}

export const getMany = async (props: Props, client: BaseProtocol = DB): Promise<Array<Table>> => {
  const { assessment, cycle, tableNames } = props
  const schemaName = Schemas.getName(assessment)

  return client.map<Table>(
    `
          select t.*
          from ${schemaName}.table t
          where props -> 'cycles' ? $1
          ${tableNames ? `and props ->> 'name' in ($2:csv)` : ''}
      `,
    [cycle.uuid, tableNames],
    TableAdapter
  )
}
