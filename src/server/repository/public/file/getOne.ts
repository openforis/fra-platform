import type { File, FileSummary } from 'meta/file'

import { BaseProtocol, DB } from 'server/db'
import { FileAdapter } from 'server/repository/adapter'
import { fieldsFile, fieldsFileSummary } from 'server/repository/public/file/fields'

type Props = {
  fileUuid: string
  meta: boolean
}

export const getOne = async (props: Props, client: BaseProtocol = DB): Promise<File | FileSummary> => {
  const { fileUuid, meta } = props

  const fields = meta ? fieldsFileSummary : fieldsFile

  return client.one(
    `
        select ${fields.join(', ')}
        from public.file
        where uuid = $1`,
    [fileUuid],
    FileAdapter
  )
}
