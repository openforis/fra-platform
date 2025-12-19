import { UserProviderRepository } from 'server/db/repository/public/userProvider'

import { create } from './create'

export const UserProviderController = {
  create,
  getUserProviders: UserProviderRepository.getUserProviders,
  read: UserProviderRepository.read,
}
