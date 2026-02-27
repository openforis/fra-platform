import { BaseProtocol } from 'server/db/db'

type Props = {
  schema: string
  tableName: string
}

export const tableExists = (props: Props, client: BaseProtocol): Promise<{ exists: boolean }> => {
  const { schema, tableName } = props
  return client.oneOrNone<{ exists: boolean }>(
    `
      select exists (
        select 1 from information_schema.tables
        where table_schema = '${schema}' and table_name = '${tableName}'
      ) as exists
    `
  )
}
