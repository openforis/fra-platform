import { User } from '@meta/user'
import { UserRoles } from '@meta/user/userRoles'

import { useUsers } from '@client/store/ui/userManagement'
import useGetUsers from '@client/pages/AssessmentHome/hooks/useGetUsers'

import { StatusTransition } from './types'

export const useRecipients = (props: { status: StatusTransition }): Array<User> => {
  useGetUsers()
  const users = useUsers()
  return users.filter((user) =>
    user.roles.find((role) => UserRoles.getRecipientRoles(props.status).includes(role.role))
  )
}
