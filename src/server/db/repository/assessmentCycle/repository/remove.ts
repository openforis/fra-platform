import { RepositoryItem } from 'meta/cycleData/repository/item'
import { Objects } from 'utils/objects'

import { BaseProtocol, DB } from 'server/db/db'

type Props = {
  uuid: string
}

export const remove = async (props: Props, client: BaseProtocol = DB): Promise<RepositoryItem> => {
  const { uuid } = props

  if (!uuid) throw new Error('Repository UUID is required')

  return client.one<RepositoryItem>(
    `
      delete from public.repository
      where uuid = $(uuid)
      returning *
    `,
    { uuid },
    (row) => Objects.camelize(row)
  )
}
