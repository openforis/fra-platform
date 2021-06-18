import * as Promise from 'bluebird'
import { wipeClassData } from '@server/repository/odpClass/odpClassRepository'
import { deleteIssues } from '@server/repository/review/reviewRepository'
import { insertAudit } from '@server/repository/audit/auditRepository'
import { OdpRepository } from '@server/repository'
import { getAndCheckOdpCountryId } from './getAndCheckOdpCountryId'

export const deleteOdp = async (client: any, odpId: any, user: any) => {
  const countryIso = await getAndCheckOdpCountryId(client, odpId, user)
  const odpVersionId = await OdpRepository.getOdpVersionId(client, odpId)
  await client.query('DELETE FROM odp WHERE id = $1', [odpId])
  return Promise.all([
    wipeClassData(client, odpVersionId).then(() =>
      client.query('DELETE FROM odp_version WHERE id = $1', [odpVersionId])
    ),
    deleteIssues(client, countryIso, 'odp', 0, odpId),
    insertAudit(client, user.id, 'deleteOdp', countryIso, 'odp', { odpId }),
  ])
}
