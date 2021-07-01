import { deleteIssues } from '@server/repository/review/reviewRepository'
import { insertAudit } from '@server/repository/audit/auditRepository'
import { OdpClassRepository } from '@server/repository'
import { getAndCheckOdpCountryId } from './getAndCheckOdpCountryId'
import { getOdpVersionId } from './getOdpVersionId'

export const deleteOdp = async (client: any, odpId: any, user: any) => {
  const countryIso = await getAndCheckOdpCountryId({ odpId, user }, client)
  const odpVersionId = await getOdpVersionId(client, odpId)
  await client.query('DELETE FROM odp WHERE id = $1', [odpId])
  return Promise.all([
    OdpClassRepository.wipeClassData(client, odpVersionId).then(() =>
      client.query('DELETE FROM odp_version WHERE id = $1', [odpVersionId])
    ),
    deleteIssues(client, countryIso, 'odp', 0, odpId),
    insertAudit(client, user.id, 'deleteOdp', countryIso, 'odp', { odpId }),
  ])
}
