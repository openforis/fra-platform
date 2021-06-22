import { OdpClassRepository, OdpRepository, OdpDraftRepository } from '@server/repository'
import { CountryIso } from '@core/country'
import { User } from '@core/auth'
import { BaseProtocol, DB } from '@server/db/db'
import * as AuditRepository from '@server/repository/audit/auditRepository'

import { create } from './create'

const updateOrInsertDraft = async (client: any, user: any, odpId: any, countryIso: any, draft: any) => {
  const draftId = await OdpRepository.getDraftId(client, odpId)

  if (draftId) {
    await OdpDraftRepository.updateDraft(client, draft)
    await OdpClassRepository.wipeNationalClassIssues(client, odpId, countryIso, draft.nationalClasses)
  } else {
    await OdpDraftRepository.insertDraft(client, countryIso, user, odpId, draft)
  }

  await AuditRepository.insertAudit(client, user.id, 'updateOrInsertDraft', countryIso, 'odp', { odpId })

  return { odpId }
}

export const persistDraft = async (
  options: { countryIso: CountryIso; user: User; draft: any },
  client: BaseProtocol = DB
) => {
  const { countryIso, user, draft } = options
  return client.tx(async (t) => {
    const odpId = draft.odpId ? draft.odpId : await create({ countryIso, user }, t)
    return updateOrInsertDraft(t, user, odpId, countryIso, draft)
  })
}
