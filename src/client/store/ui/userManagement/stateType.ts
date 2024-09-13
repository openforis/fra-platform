import { User } from 'meta/user'

export interface UserManagementState {
  user?: User
  users: Array<User>
}
