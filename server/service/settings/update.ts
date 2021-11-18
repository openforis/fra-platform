import { BaseProtocol, DB } from '@server/db'
import { Settings } from '@core/meta/settings'
import { SettingsRepository } from '@server/repository'

export const update = async (
  props: {
    settings: Settings
  },
  client: BaseProtocol = DB
): Promise<Settings> => {
  const { settings } = props

  return client.tx(async (t) => {
    // TODO: Add activity log entry (public schema?)
    return SettingsRepository.update({ settings }, t)
  })
}
