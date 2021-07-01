import { BaseProtocol, DB } from '@server/db'

export const deleteById = async (options: { id: number }, client: BaseProtocol = DB) => {
  const { id } = options
  return client.query('DELETE FROM odp_version WHERE id = $1', [id])
}
