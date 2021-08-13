import { insertAudit } from '@server/repository/audit/auditRepository'
import { OdpClassRepository } from '@server/repository'
import { BaseProtocol, DB } from '@server/db'
import { User } from '@core/auth'
import { getAndCheckOdpCountryId } from './getAndCheckOdpCountryId'

export const markAsActual = async (
  options: { odpId: string | number; user: User },
  client: BaseProtocol = DB
): Promise<void> => {
  const { user, odpId } = options
  const [oldActualResult] = await client.query('SELECT actual_id, draft_id FROM odp WHERE id = $1', [odpId])
  const countryIso = await getAndCheckOdpCountryId({ odpId, user }, client)
  await client.query('UPDATE odp SET actual_id = draft_id, draft_id = null WHERE id = $1 AND draft_id IS NOT NULL', [
    odpId,
  ])

  await insertAudit(client, user.id, 'markAsActual', countryIso, 'odp', { odpId })

  if (oldActualResult && oldActualResult.draft_id) {
    const oldActualId = oldActualResult.actual_id
    await OdpClassRepository.wipeClassData({ odpVersionId: oldActualId }, client)
    await client.query('DELETE FROM odp_version WHERE id = $1', [oldActualId])
  }
}
