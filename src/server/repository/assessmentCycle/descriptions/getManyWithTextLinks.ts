import { Objects } from 'utils/objects'

import { Assessment, CommentableDescription, Cycle } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
}

export const getManyWithTextLinks = async (
  props: Props,
  client: BaseProtocol = DB
): Promise<Array<CommentableDescription>> => {
  const { assessment, cycle } = props

  const schemaName = Schemas.getNameCycle(assessment, cycle)

  return client.map<CommentableDescription>(
    `
        select * from ${schemaName}.descriptions
        where value ->> 'text' ilike '%href%'
      `,
    [],
    (row) => Objects.camelize(row)
  )
}
