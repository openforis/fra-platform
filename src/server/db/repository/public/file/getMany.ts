import { File } from 'meta/file/file'

import { BaseProtocol, DB } from 'server/db/db'
import { FileAdapter } from 'server/db/repository/adapter'
import { fieldsFileSummary } from 'server/db/repository/public/file/fields'

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
