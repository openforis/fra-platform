import { OriginalDataPointRepository } from '@server/repository/originalDataPoint'
import { ODP } from '@core/odp'
import { BaseProtocol, DB } from '@server/db'
import * as AuditRepository from '@server/repository/audit/auditRepository'
import { User } from '@core/auth'

export const create = async (props: { countryIso: string; user: User }, client: BaseProtocol = DB): Promise<ODP> => {
  const { countryIso, user } = props
  return client.tx(async (t) => {
    const odp = await OriginalDataPointRepository.create({ countryIso }, t)
    await AuditRepository.insertAudit(t, user.id, 'createOdp', countryIso, 'odp', { odp })
    return odp
  })
}
