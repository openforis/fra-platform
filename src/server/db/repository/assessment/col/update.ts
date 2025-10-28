import { Assessment } from 'meta/assessment/assessment'
import { Col } from 'meta/assessment/col'

import { BaseProtocol, DB } from 'server/db/db'
import { ColAdapter } from 'server/db/repository/adapter'
import { Schemas } from 'server/db/schemas'

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
