import { BaseProtocol, DB } from '@server/db'

export const readActualId = async (options: { odpId: any }, client: BaseProtocol = DB): Promise<number> => {
  const { odpId } = options
  const [{ actual_id: actualId }] = await client.query('SELECT actual_id FROM odp WHERE id = $1', [odpId])
  return actualId
}
