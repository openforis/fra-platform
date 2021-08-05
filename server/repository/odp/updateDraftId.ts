import { BaseProtocol, DB } from '@server/db'

export const updateDraftId = async (options: { odpId: number }, client: BaseProtocol = DB) => {
  const { odpId } = options
  return client.query('UPDATE odp SET draft_id = (SELECT last_value FROM odp_version_id_seq) WHERE id = $1', [odpId])
}
