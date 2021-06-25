import { OdpRepository } from '@server/repository/odp'
import { User } from '@core/auth'
import { BaseProtocol, DB } from '@server/db'
import { getAndCheckOdpCountryId } from '@server/repository/odp/getAndCheckOdpCountryId'
import { getOdpVersionId } from '@server/repository/odp/getOdpVersionId'
import { OdpClassRepository } from '@server/repository'
import { deleteOdp } from '@server/repository/odp/deleteOdp'

export const deleteDraft = async (options: { odpId: any; user: User }, client: BaseProtocol = DB) => {
  const { odpId, user } = options
  return client.tx(async (t) => {
    const countryIso = await getAndCheckOdpCountryId(t, odpId, user)
    const actualId = OdpRepository.readActualId(odpId)
    if (actualId) {
      await t.query('UPDATE odp SET draft_id = null WHERE id = $1', [odpId])
      const odpVersionId = await getOdpVersionId(t, odpId)
      const nationalClasses = await OdpClassRepository.getOdpNationalClasses(t, odpVersionId)
      return OdpClassRepository.wipeNationalClassIssues({ odpId, countryIso, nationalClasses }, t)
    }

    return deleteOdp(t, odpId, user)
  })
}
