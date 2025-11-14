import { FileSummary } from 'meta/file/file'

import { BaseProtocol, DB } from 'server/db/db'
import { FileAdapter } from 'server/db/repository/adapter'
import { fieldsFileSummary } from 'server/db/repository/public/file/fields'

type Props = {
  uuid: string
}

export const remove = async (props: Props, client: BaseProtocol = DB): Promise<FileSummary> => {
  const { uuid } = props

  return client.one(
    `
        delete
        from public.file
        where uuid = $1
        returning ${fieldsFileSummary.join(', ')}`,
    [uuid],
    FileAdapter
  )
}
