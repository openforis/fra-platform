import { RepositoryItem } from 'meta/cycleData/repository/item'
import { Objects } from 'utils/objects'

import { BaseProtocol, DB } from 'server/db/db'

type Props =
  | { uuid: string }
  | { fileUuid: string }
  /**
   * @deprecated
   */
  | { fileName: string }

export const getOne = async (props: Props, client: BaseProtocol = DB): Promise<RepositoryItem> => {
  let value: string
  let where: string

  if ('uuid' in props) {
    value = props.uuid
    where = 'uuid = $(value)'
  } else if ('fileName' in props) {
    value = props.fileName
    where =
      "props -> 'translation' ->> 'en' = $(value) and (props ->> 'hidden')::boolean = true and country_iso is null"
  } else {
    value = props.fileUuid
    where = 'file_uuid = $(value)'
  }

  return client.one<RepositoryItem>(
    `
      select * from public.repository
      where ${where}
    `,
    { value },
    (row) => Objects.camelize(row)
  )
}
