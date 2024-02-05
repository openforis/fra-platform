import type { File } from 'meta/file'

import { BaseProtocol, DB } from 'server/db'

type Props = {
  fileUuid: string
}

export const getOne = async (props: Props, client: BaseProtocol = DB): Promise<File> => {
  const { fileUuid } = props

  return client.one(`select * from public.file where uuid = $1`, [fileUuid])
}
