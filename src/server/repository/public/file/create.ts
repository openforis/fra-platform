import { FileSummary } from 'meta/file'

import { BaseProtocol, DB } from 'server/db'
import { FileAdapter } from 'server/repository/adapter'

import { fieldsFileSummary } from './fields'

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
