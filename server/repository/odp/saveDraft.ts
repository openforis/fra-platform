import { updateOrInsertDraft } from '@server/repository/odpDraft/odpDraftRepository'
import { OdpService } from '@server/service'

export const saveDraft = async (client: any, countryIso: any, user: any, draft: any) => {
  const odpId = draft.odpId ? draft.odpId : await OdpService.createOdp(client, countryIso, user)
  return updateOrInsertDraft(client, user, odpId, countryIso, draft)
}
