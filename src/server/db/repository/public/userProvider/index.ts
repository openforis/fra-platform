import { create } from 'server/db/repository/public/userProvider/create'
import { getUserProviders } from 'server/db/repository/public/userProvider/getUserProviders'
import { read } from 'server/db/repository/public/userProvider/read'
import { update } from 'server/db/repository/public/userProvider/update'

export const UserProviderRepository = {
  create,
  getUserProviders,
  read,
  update,
}
