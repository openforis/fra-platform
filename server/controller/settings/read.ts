import { BaseProtocol, DB } from '@server/db'
import { Settings } from '@core/meta/settings'
import { SettingsRepository } from '@server/repository'

export const read = async (client: BaseProtocol = DB): Promise<Settings> => {
  return SettingsRepository.read(client)
}
