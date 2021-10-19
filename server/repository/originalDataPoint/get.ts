import { BaseProtocol, DB } from '@server/db'
import { ODP } from '@core/odp'

export const get = async (props: { id: string }, client: BaseProtocol = DB): Promise<ODP> => {
  const { id } = props

  const odp = await client.one(
    `
        select * from original_data_point where id = $1
    `,
    [id]
  )

  return odp
}
