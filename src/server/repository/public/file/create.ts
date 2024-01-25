import { BaseProtocol, DB } from 'server/db'

type Props = {
  file: Express.Multer.File
}

export const create = async (props: Props, client: BaseProtocol = DB): Promise<string> => {
  const { file } = props

  const result = await client.one(`insert into public.file (file_name, file) values ($1, $2) returning uuid`, [
    file.originalname,
    file.buffer,
  ])
  return result.uuid
}
