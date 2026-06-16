import { FileSummary } from 'meta/file/file'

import { BaseProtocol, DB } from 'server/db/db'
import { FileAdapter } from 'server/db/repository/adapter'
import { fieldsFileSummary } from 'server/db/repository/public/file/fields'

type Props = {
  fileName: string
  size: number
}

export const create = async (props: Props, client: BaseProtocol = DB): Promise<FileSummary> => {
  const { fileName, size } = props

  return client.one(
    `
        insert into public.file (name, size)
        values ($(fileName), $(size))
        returning ${fieldsFileSummary.join(', ')}`,
    { fileName, size },
    FileAdapter
  )
}
