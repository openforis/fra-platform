import * as Promise from 'bluebird'
import { insertAudit } from '@server/repository/audit/auditRepository'
import { wipeClassData } from '@server/repository/odpClass/odpClassRepository'
import { getAndCheckOdpCountryId } from './getAndCheckOdpCountryId'

export const markAsActual = async (client: any, odpId: any, user: any) => {
  const currentOdpPromise = client.query('SELECT actual_id, draft_id FROM odp WHERE id = $1', [odpId])
  const checkCountryAccessPromise = getAndCheckOdpCountryId(client, odpId, user)
  const updateOdpPromise = client.query(
    'UPDATE odp SET actual_id = draft_id, draft_id = null WHERE id = $1 AND draft_id IS NOT NULL',
    [odpId]
  )
  const { oldActualId, countryIso } = await (Promise as any).join(
    currentOdpPromise,
    checkCountryAccessPromise,
    updateOdpPromise,
    (oldActualResult: any, countryIso: any) => {
      if (oldActualResult.rowCount > 0 && oldActualResult.rows[0].draft_id) {
        return { oldActualId: oldActualResult.rows[0].actual_id, countryIso }
      }
      return { countryIso }
    }
  )
  await insertAudit(client, user.id, 'markAsActual', countryIso, 'odp', { odpId })
  if (oldActualId) {
    return Promise.all([
      wipeClassData(client, oldActualId),
      client.query('DELETE FROM odp_version WHERE id = $1', [oldActualId]),
    ])
  }
  return null
}
