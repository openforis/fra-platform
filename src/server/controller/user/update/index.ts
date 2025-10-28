import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db/db'
import { UserRepository } from 'server/repository/public/user'

import { Props } from './props'
import { updateRoleName } from './updateRoleName'
import { updateRolePermissions } from './updateRolePermissions'
import { updateRoleProps } from './updateRoleProps'
import { updateRoles } from './updateRoles'
import { updateUser } from './updateUser'

export const update = async (props: Props, client: BaseProtocol = DB): Promise<User> => {
  const { cycle } = props

  return client.tx(async (t) => {
    let targetUser = await updateUser(props, t)
    targetUser = await updateRoleName({ ...props, targetUser }, t)
    await updateRoleProps({ ...props, targetUser }, t)
    await updateRolePermissions({ ...props, targetUser }, t)
    await updateRoles({ ...props, targetUser }, t)

    return UserRepository.getOne({ uuid: targetUser.uuid, cycleUuid: cycle.uuid }, t)
  })
}
