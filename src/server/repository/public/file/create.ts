import { File } from 'meta/file'

import { BaseProtocol, DB } from 'server/db'
import { FileAdapter } from 'server/repository/adapter'

import { fields } from './fields'

type Props = {
  file: Express.Multer.File
}

export const create = async (props: Props, client: BaseProtocol = DB): Promise<File> => {
  const { file } = props

  return client.one(
    `insert into public.file (name, file) values ($1, $2) returning ${fields.join(', ')}`,
    [file.originalname, file.buffer],
    FileAdapter
  )
}
