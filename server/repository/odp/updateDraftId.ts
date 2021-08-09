import { BaseProtocol, DB } from '@server/db'

export const updateDraftId = async (
  options: { odpId: number | string; draftId?: number },
  client: BaseProtocol = DB
) => {
  const { odpId, draftId } = options
  return client.query(
    `UPDATE odp SET draft_id = ${
      !Number.isNaN(+draftId) ? draftId : '(SELECT last_value FROM odp_version_id_seq)'
    } WHERE id = $1`,
    [odpId]
  )
}
