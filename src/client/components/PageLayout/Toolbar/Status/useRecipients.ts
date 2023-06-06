import { User } from 'meta/user'
import { UserRoles } from 'meta/user/userRoles'

import { useUsers } from 'client/store/ui/userManagement'

import { StatusTransition } from './types'

export const useRecipients = (props: { status: StatusTransition }): Array<User> => {
  const users = useUsers()
  return users.filter((user) => user.roles.find((role) => UserRoles.getRecipientRoles(props.status).includes(role.role)))
}
