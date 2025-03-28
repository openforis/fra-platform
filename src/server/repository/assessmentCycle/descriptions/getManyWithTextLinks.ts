import { Objects } from 'utils/objects'

import { CommentableDescription } from 'meta/assessment'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

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
