import { CountryIso } from '@core/country'
import { OdpRepository } from '@server/repository/odp'
import { User } from '@core/auth'
import { BaseProtocol, DB } from '@server/db/db'
import { insertAudit } from '@server/repository/audit/auditRepository'

export const create = (options: { countryIso: CountryIso; user: User }, client: BaseProtocol = DB) => {
  const { countryIso, user } = options
  return client.tx(async (t) => {
    const odpId = OdpRepository.create({ countryIso }, t)
    await insertAudit(t, user.id, 'createOdp', countryIso, 'odp', { odpId })
    return odpId
  })
}
