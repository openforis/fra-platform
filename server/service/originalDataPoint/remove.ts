import { OriginalDataPointRepository } from '@server/repository/originalDataPoint'
import { ODP } from '@core/odp'
import { BaseProtocol, DB } from '@server/db'
import * as AuditRepository from '@server/repository/audit/auditRepository'
import { countryIso } from '@webapp/main/basePaths'
import { User } from '@core/auth'

export const remove = async (props: { id: string; user: User }, client: BaseProtocol = DB): Promise<ODP> => {
  const { id, user } = props
  return client.tx(async (t) => {
    const removedOdp = await OriginalDataPointRepository.remove({ id }, t)
    await AuditRepository.insertAudit(t, user.id, 'deleteOdp', countryIso, 'odp', { removedOdp })
    return removedOdp
  })
}
