import { File } from 'meta/file'

import { BaseProtocol, DB } from 'server/db'
import { FileAdapter } from 'server/repository/adapter'

import { fields } from './fields'

type Props = {
  uuids: string[]
}

export const removeMany = async (props: Props, client: BaseProtocol = DB): Promise<Array<File>> => {
  const { uuids } = props

  return client.map(
    `delete from public.file where uuid in ($1:list) returning ${fields.join(', ')}`,
    [uuids],
    FileAdapter
  )
}
