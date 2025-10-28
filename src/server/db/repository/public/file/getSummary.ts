import type { File, FileSummary } from 'meta/file'

import { BaseProtocol, DB } from 'server/db/db'
import { FileAdapter } from 'server/db/repository/adapter'
import { fieldsFileSummary } from 'server/db/repository/public/file/fields'

type Props = {
  fileUuid: string
}

export const getSummary = async (props: Props, client: BaseProtocol = DB): Promise<File | FileSummary> => {
  const { fileUuid } = props

  return client.one(
    `
        select ${fieldsFileSummary.join(', ')}
        from public.file
        where uuid = $1`,
    [fileUuid],
    FileAdapter
  )
}
