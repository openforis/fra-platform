import { Objects } from 'utils/objects'

import { Assessment, Cycle } from 'meta/assessment'
import { RepositoryItem } from 'meta/cycleData'

import { BaseProtocol, DB, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle

  repositoryItem: RepositoryItem
}

export const update = async (props: Props, client: BaseProtocol = DB): Promise<RepositoryItem> => {
  const { assessment, cycle, repositoryItem } = props
  const { fileUuid, link, name, uuid } = repositoryItem

  if (fileUuid && link) throw new Error('Cannot create both file and link')
  if (!fileUuid && !link) throw new Error('No file or link provided')

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return client.one<RepositoryItem>(
    `
      update ${schemaCycle}.repository
      set
          name = $1
        , file_uuid = $2
        , link = $3
      where uuid = $4
      returning *
    `,
    [name, fileUuid, link, uuid],
    (row) => Objects.camelize(row)
  )
}
