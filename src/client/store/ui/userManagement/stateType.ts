import { CountryIso } from '@meta/area'
import { RoleName, User } from '@meta/user'

export interface UserManagementState {
  user?: User
  users: Array<User>
  filters: {
    countries: Array<CountryIso>
    langs: Array<string>
    roles: Array<RoleName>
  }
}
