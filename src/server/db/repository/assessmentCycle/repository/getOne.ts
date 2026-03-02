import { RepositoryItem } from 'meta/cycleData/repository/item'
import { Objects } from 'utils/objects'

import { BaseProtocol, DB } from 'server/db/db'

type Props = { uuid: string } | { fileName: string } | { fileUuid: string }

export const getOne = async (props: Props, client: BaseProtocol = DB): Promise<RepositoryItem> => {
  let values: Array<string>
  let where: string

  if ('uuid' in props) {
    values = [props.uuid]
    where = 'uuid = $1'
  } else if ('fileName' in props) {
    values = [props.fileName]
    where = "props -> 'translation' ->> 'en' = $1"
  } else {
    values = [props.fileUuid]
    where = 'file_uuid = $1'
  }

  return client.one<RepositoryItem>(
    `
      select * from public.repository
      where ${where}
    `,
    values,
    (row) => Objects.camelize(row)
  )
}
