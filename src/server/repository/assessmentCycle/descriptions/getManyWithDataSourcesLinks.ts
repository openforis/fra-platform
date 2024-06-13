import { Objects } from 'utils/objects'

import { Assessment, CommentableDescription, Cycle } from 'meta/assessment'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
}

export const getManyWithDataSourcesLinks = async (
  props: Props,
  client: BaseProtocol = DB
): Promise<Array<CommentableDescription>> => {
  const { assessment, cycle } = props

  const schemaName = Schemas.getNameCycle(assessment, cycle)

  return client.map<CommentableDescription>(
    `
        select * from ${schemaName}.descriptions
        where exists (
          select from jsonb_array_elements(value->'dataSources') as data_source
          where data_source ->> 'reference' ilike '%href%'
        )
      `,
    [],
    (row) => Objects.camelize(row)
  )
}
