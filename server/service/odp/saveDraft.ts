import { OdpDraftRepository } from '@server/repository'
import { CountryIso } from '@core/country'
import { User } from '@core/auth'
import { BaseProtocol, DB } from '@server/db/db'
import { create } from './create'

export const saveDraft = async (
  options: { countryIso: CountryIso; user: User; draft: any },
  client: BaseProtocol = DB
) => {
  const { countryIso, user, draft } = options
  return client.tx(async (t) => {
    const odpId = draft.odpId ? draft.odpId : await create({ countryIso, user }, t)
    return OdpDraftRepository.updateOrInsertDraft(t, user, odpId, countryIso, draft)
  })
}
