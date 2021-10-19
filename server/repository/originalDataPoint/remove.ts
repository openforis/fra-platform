import { BaseProtocol, DB } from '@server/db'

export const remove = async (props: { id: string }, client: BaseProtocol = DB): Promise<string> => {
  const { id } = props

  const odp = await client.one(
    `
        delete from original_data_point where id = ($1) returning *;
    `,
    [id]
  )

  return odp
}
