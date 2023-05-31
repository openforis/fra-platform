import { Settings } from 'meta/assessment/settings'
import { BaseProtocol, DB } from 'server/db'
import { SettingsRepository } from 'server/repository/public/settings'

export const update = async (
  props: {
    settings: Settings
  },
  client: BaseProtocol = DB
): Promise<Settings> => {
  const { settings } = props

  return client.tx(async (t) => {
    return SettingsRepository.update({ settings }, t)
  })
}
