import { User } from '@meta/user'

export interface UserManagementState {
  userToEdit: User | null
  users: Array<User>
}
