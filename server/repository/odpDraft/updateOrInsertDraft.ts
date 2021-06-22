import { OdpClassRepository, OdpRepository } from '@server/repository'
import { insertAudit } from '@server/repository/audit/auditRepository'
import { insertDraft, updateDraft } from '@server/repository/odpDraft/odpDraftRepository'

export const updateOrInsertDraft = async (client: any, user: any, odpId: any, countryIso: any, draft: any) => {
  const draftId = await OdpRepository.getDraftId(client, odpId)

  if (draftId) {
    await updateDraft(client, draft)
    await OdpClassRepository.wipeNationalClassIssues(client, odpId, countryIso, draft.nationalClasses)
  } else {
    await insertDraft(client, countryIso, user, odpId, draft)
  }

  await insertAudit(client, user.id, 'updateOrInsertDraft', countryIso, 'odp', { odpId })

  return { odpId }
}
