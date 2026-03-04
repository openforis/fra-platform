import { RepositoryItem } from 'meta/cycleData/repository/item'
import { Objects } from 'utils/objects'

import { BaseProtocol, DB } from 'server/db/db'

type Props = {
  repositoryItem: RepositoryItem
}

export const update = async (props: Props, client: BaseProtocol = DB): Promise<RepositoryItem> => {
  const { repositoryItem } = props
  const { fileUuid, link, props: _props, uuid } = repositoryItem

  if (fileUuid && link) throw new Error('Cannot create both file and link')
  if (!fileUuid && !link) throw new Error('No file or link provided')

  return client.one<RepositoryItem>(
    `
      update public.repository
      set file_uuid = $(fileUuid)
        , link = $(link)
        , props = $(props)
      where uuid = $(uuid)
      returning *
    `,
    { fileUuid, link, props: _props, uuid },
    (row) => Objects.camelize(row)
  )
}
