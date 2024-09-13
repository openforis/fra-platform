import { RoleName, User } from 'meta/user'

export interface UserManagementState {
  count: {
    [key in keyof typeof RoleName | 'totals']?: number
  }
  user?: User
  users: Array<User>
}
