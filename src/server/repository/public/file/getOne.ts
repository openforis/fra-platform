import type { File } from 'meta/file'

import { BaseProtocol, DB } from 'server/db'
import { FileAdapter } from 'server/repository/adapter'
import { fieldsFile } from 'server/repository/public/file/fields'

type Props = {
  fileUuid: string
}

export const getOne = async (props: Props, client: BaseProtocol = DB): Promise<File> => {
  const { fileUuid } = props

  return client.one(
    `
        select ${fieldsFile.join(', ')}
        from public.file
        where uuid = $1`,
    [fileUuid],
    FileAdapter
  )
}
