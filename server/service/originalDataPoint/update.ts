import { OriginalDataPointRepository } from '@server/repository/originalDataPoint'
import { ODP } from '@core/odp'
import { BaseProtocol, DB } from '@server/db'
import * as AuditRepository from '@server/repository/audit/auditRepository'
import { User } from '@core/auth'
import { countryIso } from '@webapp/main/basePaths'

export const update = async (props: { id: string; odp: ODP; user: User }, client: BaseProtocol = DB): Promise<ODP> => {
  const { id, odp, user } = props
  return client.tx(async (t) => {
    const updatedOdp = await OriginalDataPointRepository.update({ id, odp })
    await AuditRepository.insertAudit(t, user.id, 'updateOdp', countryIso, 'odp', { odp: updatedOdp })
    return updatedOdp
  })
}
