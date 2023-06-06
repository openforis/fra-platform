import { Settings } from 'meta/assessment'

import { BaseProtocol, DB } from 'server/db'
import { SettingsRepository } from 'server/repository/public/settings'

export const read = async (client: BaseProtocol = DB): Promise<Settings> => {
  return SettingsRepository.read(client)
}
