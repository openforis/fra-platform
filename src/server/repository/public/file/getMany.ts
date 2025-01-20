import type { File } from 'meta/file'

import { BaseProtocol, DB } from 'server/db'
import { FileAdapter } from 'server/repository/adapter'
import { fieldsFileSummary } from 'server/repository/public/file/fields'

type Props = {
  fileUuids: Array<string>
}

export const getMany = async (props: Props, client: BaseProtocol = DB): Promise<Array<File>> => {
  const { fileUuids } = props

  return client.map(
    `
        select ${fieldsFileSummary.join(', ')}
        from public.file
        where uuid in ($1:list)
        `,
    [fileUuids],
    FileAdapter
  )
}
