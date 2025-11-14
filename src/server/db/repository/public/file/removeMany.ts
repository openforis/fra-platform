import { FileSummary } from 'meta/file/file'

import { BaseProtocol, DB } from 'server/db/db'
import { FileAdapter } from 'server/db/repository/adapter'
import { fieldsFileSummary } from 'server/db/repository/public/file/fields'

type Props = {
  uuids: Array<string>
}

export const removeMany = async (props: Props, client: BaseProtocol = DB): Promise<Array<FileSummary>> => {
  const { uuids } = props

  return client.map(
    `
        delete
        from public.file
        where uuid in ($1:list)
        returning ${fieldsFileSummary.join(', ')}`,
    [uuids],
    FileAdapter
  )
}
