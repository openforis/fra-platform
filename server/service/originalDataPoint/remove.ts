import { OriginalDataPointRepository } from '@server/repository/originalDataPoint'
import { ODP } from '@core/odp'
import { BaseProtocol, DB } from '@server/db'
import * as AuditRepository from '@server/repository/audit/auditRepository'
import { User } from '@core/auth'

export const remove = async (props: { id: string; user: User }, client: BaseProtocol = DB): Promise<ODP> => {
  const { id, user } = props
  return client.tx(async (t) => {
    const odp = await OriginalDataPointRepository.remove({ id }, t)
    await AuditRepository.insertAudit(t, user.id, 'deleteOdp', odp.countryIso, 'odp', { odp })
    return odp
  })
}
