import { accept } from 'server/db/repository/public/userInvitation/accept'
import { create } from 'server/db/repository/public/userInvitation/create'
import { getCount } from 'server/db/repository/public/userInvitation/getCount'
import { getMany } from 'server/db/repository/public/userInvitation/getMany'
import { getOne } from 'server/db/repository/public/userInvitation/getOne'
import { remove } from 'server/db/repository/public/userInvitation/remove'
import { renew } from 'server/db/repository/public/userInvitation/renew'

export const UserInvitationRepository = {
  accept,
  create,
  getCount,
  getMany,
  getOne,
  remove,
  renew,
}
