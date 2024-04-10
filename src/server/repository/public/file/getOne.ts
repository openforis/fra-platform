import type { File } from 'meta/file'

import { BaseProtocol, DB } from 'server/db'
import { FileAdapter } from 'server/repository/adapter'
import { fieldsFile } from 'server/repository/public/file/fields'

type Props =
  | {
      fileUuid: string
    }
  | { fileName: string }

export const getOne = async (props: Props, client: BaseProtocol = DB): Promise<File> => {
  const values = 'fileUuid' in props ? [props.fileUuid] : [props.fileName]
  const where = 'fileUuid' in props ? 'uuid = $1' : 'name = $1'

  return client.one(
    `
        select ${fieldsFile.join(', ')}
        from public.file
        where ${where}`,
    values,
    FileAdapter
  )
}
