import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { RepositoryItem } from 'meta/cycleData/repository/item'
import { Objects } from 'utils/objects'

import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

type Props = {
  assessment: Assessment
  cycle: Cycle
  repositoryItem: RepositoryItem
}

export const update = async (props: Props, client: BaseProtocol = DB): Promise<RepositoryItem> => {
  const { assessment, cycle, repositoryItem } = props
  const { description, fileUuid, link, props: _props, uuid } = repositoryItem

  if (fileUuid && link) throw new Error('Cannot create both file and link')
  if (!fileUuid && !link) throw new Error('No file or link provided')

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return client.one<RepositoryItem>(
    `
      update ${schemaCycle}.repository
      set description = $1
        , file_uuid = $2
        , link = $3
        , props = $4
      where uuid = $5
      returning *
    `,
    [description, fileUuid, link, _props, uuid],
    (row) => Objects.camelize(row)
  )
}
