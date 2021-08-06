import { OdpClassRepository, OdpRepository, OdpVersionRepository } from '@server/repository'
import { CountryIso } from '@core/country'
import { User } from '@core/auth'
import { BaseProtocol, DB } from '@server/db/db'
import * as AuditRepository from '@server/repository/audit/auditRepository'

import { ODP } from '@core/odp'
import { create } from './create'

const updateDraft = async (options: { draft: ODP }, client: BaseProtocol = DB) => {
  const { draft } = options
  const draftId = await OdpRepository.getDraftId(client, draft.odpId)

  await OdpClassRepository.wipeClassData(client, draftId)
  await OdpClassRepository.addClassData({ odpVersionId: draftId, odp: draft }, client)

  OdpVersionRepository.update({ draft, draftId }, client)
}

const insertDraft = async (options: { odpId: number; draft: ODP }, client: BaseProtocol = DB) => {
  const { odpId, draft } = options
  const odpVersionId = await OdpVersionRepository.create({ draft }, client)

  await OdpClassRepository.addClassData({ odpVersionId, odp: draft }, client)
  await OdpRepository.updateDraftId({ odpId }, client)
}

const updateOrInsertDraft = async (
  options: { user: User; odpId: number; countryIso: CountryIso; draft: ODP },
  client: BaseProtocol = DB
) => {
  const { user, odpId, countryIso, draft } = options
  const draftId = await OdpRepository.getDraftId(client, odpId)

  if (draftId) {
    await updateDraft({ draft }, client)
  } else {
    await insertDraft({ odpId, draft }, client)
  }

  await AuditRepository.insertAudit(client, user.id, 'updateOrInsertDraft', countryIso, 'odp', { odpId })

  return { odpId }
}

export const persistDraft = async (
  options: { countryIso: CountryIso; user: User; draft: ODP },
  client: BaseProtocol = DB
) => {
  const { countryIso, user, draft } = options
  return client.tx(async (t) => {
    const odpId = draft.odpId ? draft.odpId : await create({ countryIso, user }, t)
    return updateOrInsertDraft({ user, odpId, countryIso, draft }, t)
  })
}
