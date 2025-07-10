import { User } from 'meta/user'

import { Props } from 'server/controller/user/update/props'
import { updateRole } from 'server/controller/user/update/updateRole'
import { updateUser } from 'server/controller/user/update/updateUser'
import { BaseProtocol, DB } from 'server/db'
import { UserRepository } from 'server/repository/public/user'

export const update = async (props: Props, client: BaseProtocol = DB): Promise<User> => {
  const { cycle } = props

  return client.tx(async (t) => {
    const updatedUser = await updateUser(props, t)
    await updateRole({ ...props, targetUser: updatedUser }, t)

    return UserRepository.getOne({ uuid: updatedUser.uuid, cycleUuid: cycle.uuid }, t)
  })
}
