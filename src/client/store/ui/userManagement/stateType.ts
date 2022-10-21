import { User } from '@meta/user'

export interface UserManagementState {
  user: User | null
  users: Array<User>
}
