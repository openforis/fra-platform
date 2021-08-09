import { OdpRepository, OdpClassRepository, OdpVersionRepository } from '@server/repository'
import { getAndCheckOdpCountryId } from '@server/repository/odp/getAndCheckOdpCountryId'
import { getOdpVersionId } from '@server/repository/odp/getOdpVersionId'

import { deleteIssues } from '@server/repository/review/reviewRepository'
import { User } from '@core/auth'
import { BaseProtocol, DB } from '@server/db'
import * as AuditRepository from '@server/repository/audit/auditRepository'

export const deleteOdp = async (options: { odpId: number; user: User }, client: BaseProtocol = DB) => {
  const { odpId, user } = options
  return client.tx(async (t) => {
    const countryIso = await getAndCheckOdpCountryId({ odpId, user }, t)
    const odpVersionId = await getOdpVersionId({ odpId }, t)
    const odp = await OdpRepository.deleteOdp({ odpId }, t)

    await OdpClassRepository.wipeClassData({ odpVersionId }, t)
    await OdpVersionRepository.deleteById({ id: odpVersionId }, t)

    await deleteIssues(t, countryIso, 'odp', 0, odpId)
    await AuditRepository.insertAudit(t, user.id, 'deleteOdp', countryIso, 'odp', { odpId })
    return odp
  })
}
