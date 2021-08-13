import { BaseProtocol, DB } from '@server/db'

export const getDraftId = async (
  options: { odpId: string | number },
  client: BaseProtocol = DB
): Promise<null | string> => {
  const { odpId } = options
  const [{ draft_id: draftId }] = await client.query('SELECT draft_id FROM odp WHERE id = $1', [odpId])
  return draftId
}
