import { FileSummary } from 'meta/file'

import { BaseProtocol, DB } from 'server/db'
import { FileAdapter } from 'server/repository/adapter'

import { fieldsFileSummary } from './fields'

type Props = {
  uuid: string
}

export const removeOne = async (props: Props, client: BaseProtocol = DB): Promise<FileSummary> => {
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
