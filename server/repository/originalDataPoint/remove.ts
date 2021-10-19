import { BaseProtocol, DB } from '@server/db'
import { Objects } from '@core/utils'
import { ODP } from '@core/odp'

export const remove = async (props: { id: string }, client: BaseProtocol = DB): Promise<ODP> => {
  const { id } = props

  const odp = await client.one(
    `
        delete from original_data_point where id = ($1) returning *;
    `,
    [id]
  )

  return Objects.camelize(odp)
}
