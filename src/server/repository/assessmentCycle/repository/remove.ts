import { Objects } from 'utils/objects'

import { Assessment, Cycle } from 'meta/assessment'
import { RepositoryItem } from 'meta/cycleData'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle

  uuid: string
}

export const remove = async (props: Props, client: BaseProtocol = DB): Promise<RepositoryItem> => {
  const { assessment, cycle, uuid } = props

  if (!uuid) throw new Error('Repository UUID is required')

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return client.one<RepositoryItem>(
    `
      delete from ${schemaCycle}.repository
      where uuid = $1
      returning *
    `,
    [uuid],
    (row) => Objects.camelize(row)
  )
}
