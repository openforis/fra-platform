import { SettingsRepository } from 'server/repository/public/settings'

export const SettingsController = {
  read: SettingsRepository.read,
  update: SettingsRepository.update,
}
