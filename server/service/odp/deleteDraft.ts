import { User } from '@core/auth'
import { BaseProtocol, DB } from '@server/db'
import { getAndCheckOdpCountryId } from '@server/repository/odp/getAndCheckOdpCountryId'
import { OdpVersionRepository, OdpClassRepository, OdpRepository } from '@server/repository'
import { deleteIssues } from '@server/repository/review/reviewRepository'
import { insertAudit } from '@server/repository/audit/auditRepository'
import { ODP } from '@core/odp'

export const deleteDraft = async (options: { odpId: number; user: User }, client: BaseProtocol = DB): Promise<ODP> => {
  const { odpId, user } = options
  return client.tx(async (t) => {
    const countryIso = await getAndCheckOdpCountryId({ odpId, user }, t)
    const actualId = OdpRepository.readActualId({ odpId })
    if (actualId) {
      await OdpRepository.updateDraftId({ odpId, draftId: null })
      const odpVersionId = await OdpRepository.getOdpVersionId({ odpId }, t)

      const nationalClasses = await OdpClassRepository.getOdpNationalClasses(t, odpVersionId)
      return OdpClassRepository.wipeNationalClassIssues({ odpId, countryIso, nationalClasses }, t)
    }

    const odpVersionId = await OdpRepository.getOdpVersionId({ odpId }, t)

    await OdpClassRepository.wipeClassData({ odpVersionId }, t)
    await OdpVersionRepository.deleteById({ id: odpVersionId })

    await deleteIssues(t, countryIso, 'odp', 0, odpId)
    await insertAudit(t, user.id, 'deleteOdp', countryIso, 'odp', { odpId })

    return OdpRepository.deleteOdp({ odpId }, t)
  })
}
