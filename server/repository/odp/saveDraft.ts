import { updateOrInsertDraft } from '@server/repository/odpDraft/odpDraftRepository'
import { OdpRepository } from '@server/repository'

export const saveDraft = async (client: any, countryIso: any, user: any, draft: any) => {
  const odpId = draft.odpId ? draft.odpId : await OdpRepository.createOdp(client, countryIso, user)
  return updateOrInsertDraft(client, user, odpId, countryIso, draft)
}
