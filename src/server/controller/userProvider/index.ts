import { UserProviderRepository } from 'server/repository/public/userProvider'

import { create } from './create'
import { read } from './read'

export const UserProviderController = {
  create,
  getUserProviders: UserProviderRepository.getUserProviders,
  read,
}
