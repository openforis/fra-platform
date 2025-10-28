import { FileSummary } from 'meta/file'

import { BaseProtocol, DB } from 'server/db/db'
import { FileAdapter } from 'server/db/repository/adapter'
import { fieldsFileSummary } from 'server/db/repository/public/file/fields'

type Props = {
  fileName: string
}

export const create = async (props: Props, client: BaseProtocol = DB): Promise<FileSummary> => {
  const { fileName } = props

  return client.one(
    `
        insert into public.file (name)
        values ($1)
        returning ${fieldsFileSummary.join(', ')}`,
    [fileName],
    FileAdapter
  )
}
