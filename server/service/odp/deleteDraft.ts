import { User } from '@core/auth'
import { BaseProtocol, DB } from '@server/db'
import { getAndCheckOdpCountryId } from '@server/repository/odp/getAndCheckOdpCountryId'
import { OdpClassRepository, OdpRepository } from '@server/repository'

export const deleteDraft = async (options: { odpId: number; user: User }, client: BaseProtocol = DB) => {
  const { odpId, user } = options
  return client.tx(async (t) => {
    const countryIso = await getAndCheckOdpCountryId({ odpId, user }, t)
    const actualId = OdpRepository.readActualId({ odpId })
    if (actualId) {
      OdpRepository.updateDraftId({ odpId, draftId: null })
      const odpVersionId = await OdpRepository.getOdpVersionId(t, odpId)
      const nationalClasses = await OdpClassRepository.getOdpNationalClasses(t, odpVersionId)
      return OdpClassRepository.wipeNationalClassIssues({ odpId, countryIso, nationalClasses }, t)
    }

    return OdpRepository.deleteOdp(t, odpId, user)
  })
}
