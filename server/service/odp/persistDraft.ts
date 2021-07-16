import { OdpClassRepository, OdpRepository, OdpVersionRepository } from '@server/repository'
import { CountryIso } from '@core/country'
import { User } from '@core/auth'
import { BaseProtocol, DB } from '@server/db/db'
import * as AuditRepository from '@server/repository/audit/auditRepository'

import { create } from './create'

const updateDraft = async (options: { draft: any }, client: BaseProtocol = DB) => {
  const { draft } = options
  const draftId = await OdpRepository.getDraftId(client, draft.odpId)

  await OdpClassRepository.wipeClassData(client, draftId)
  await OdpClassRepository.addClassData({ odpVersionId: draftId, odp: draft }, client)

  OdpVersionRepository.update({ draft, draftId }, client)
}

const insertDraft = async (options: { odpId: any; draft: any }, client: BaseProtocol = DB) => {
  const { odpId, draft } = options
  const odpVersionId = await OdpVersionRepository.create({ draft }, client)

  await OdpClassRepository.addClassData({ odpVersionId, odp: draft }, client)
  await OdpRepository.updateDraftId({ odpId }, client)
}

const updateOrInsertDraft = async (
  options: { user: any; odpId: any; countryIso: any; draft: any },
  client: BaseProtocol = DB
) => {
  const { user, odpId, countryIso, draft } = options
  const draftId = await OdpRepository.getDraftId(client, odpId)

  if (draftId) {
    updateDraft({ draft })
  } else {
    await insertDraft({ odpId, draft }, client)
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
    return updateOrInsertDraft({ user, odpId, countryIso, draft }, t)
  })
}
