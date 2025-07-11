import { User } from 'meta/user'

import { Props } from 'server/controller/user/update/props'
import { updateRoleName } from 'server/controller/user/update/updateRoleName'
import { updateRoleProps } from 'server/controller/user/update/updateRoleProps'
import { updateUser } from 'server/controller/user/update/updateUser'
import { BaseProtocol, DB } from 'server/db'
import { UserRepository } from 'server/repository/public/user'

export const update = async (props: Props, client: BaseProtocol = DB): Promise<User> => {
  const { cycle } = props

  return client.tx(async (t) => {
    let updatedUser = await updateUser(props, t)
    updatedUser = await updateRoleName({ ...props, targetUser: updatedUser }, t)
    await updateRoleProps({ ...props, targetUser: updatedUser }, t)

    return UserRepository.getOne({ uuid: updatedUser.uuid, cycleUuid: cycle.uuid }, t)
  })
}
