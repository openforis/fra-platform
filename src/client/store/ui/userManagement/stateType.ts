import { CountryIso } from 'meta/area'
import { RoleName, User } from 'meta/user'

export interface UserManagementState {
  count: {
    [key in keyof typeof RoleName | 'totals']?: number
  }
  filters: {
    countries: Array<CountryIso>
    fullName: string
    roles: Array<RoleName>
  }
  user?: User
  users: Array<User>
}
