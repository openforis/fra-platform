import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { RepositoryItem } from 'meta/cycleData/repository/item'
import { RepositoryItems } from 'meta/cycleData/repository/items'
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
  const { description, fileUuid, folderName, link, props: _props = {}, uuid } = repositoryItem

  if (!RepositoryItems.isFolder(repositoryItem)) {
    if (fileUuid && link) throw new Error('Cannot create both file and link')
    if (!fileUuid && !link) throw new Error('No file or link provided')
  }

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return client.one<RepositoryItem>(
    `
      update ${schemaCycle}.repository
      set description = $(description)
        , file_uuid = $(fileUuid)
        , folder_name = $(folderName)
        , link = $(link)
        , props = $(props)
      where uuid = $(uuid)
      returning *
    `,
    {
      description: description || null,
      fileUuid: fileUuid || null,
      folderName: folderName ?? null,
      link: link || null,
      props: _props,
      uuid,
    },
    (row) => Objects.camelize(row)
  )
}
