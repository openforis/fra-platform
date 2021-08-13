import { BaseProtocol, DB } from '@server/db'
import { ODP } from '@core/odp'

export const deleteOdp = async (options: { odpId: number | string }, client: BaseProtocol = DB): Promise<ODP> => {
  const { odpId } = options
  return client.query('DELETE FROM odp WHERE id = $1 RETURNING *', [odpId])
}
