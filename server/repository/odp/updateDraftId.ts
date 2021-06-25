import { BaseProtocol, DB } from '@server/db'

export const updateDraftId = async (options: { odpId: number; draftId?: number }, client: BaseProtocol = DB) => {
  const { odpId, draftId = '(SELECT last_value FROM odp_version_id_seq)' } = options
  return client.query(`UPDATE odp SET draft_id = $2 WHERE id = $1`, [odpId, draftId])
}
