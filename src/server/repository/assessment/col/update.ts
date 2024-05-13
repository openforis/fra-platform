import { Assessment, Col } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'
import { ColAdapter } from 'server/repository/adapter'

type Props = {
  assessment: Assessment
  colId: number
  colProps: Partial<Col['props']>
}

export const update = async (props: Props, client: BaseProtocol = DB): Promise<Col> => {
  const { assessment, colId, colProps } = props

  const schemaName = Schemas.getName(assessment)

  return client.one<Col>(
    `
            update ${schemaName}.col
            set props = props || $1::jsonb
            where id = $2
            returning *;`,
    [JSON.stringify(colProps), +colId],
    ColAdapter
  )
}
