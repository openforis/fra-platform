import { BaseProtocol, DB } from '@server/db'

export const deleteOdp = async (options: { odpId: number }, client: BaseProtocol = DB) => {
  const { odpId } = options
  return client.query('DELETE FROM odp WHERE id = $1 RETURNING *', [odpId])
