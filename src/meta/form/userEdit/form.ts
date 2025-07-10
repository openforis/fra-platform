import { User, UserRole } from 'meta/user'
import { UserProps } from 'meta/user/user'

export type UserForm = Pick<User, 'email' | 'id' | 'uuid'> & {
  props: Pick<UserProps, 'name' | 'surname' | 'title'>
}

export type UserEditCountryForm = {
  profilePicture?: File
  user: UserForm
  role?: Pick<UserRole, 'uuid' | 'role'> & { props: Partial<UserRole['props']> }
}

// export type UserAdminForm = UserForm & { status: UserStatus.active | UserStatus.disabled }
// export type UserEditAdminForm = {
//   profilePicture?: File
//   user: UserAdminForm
//   roles: { [roleName in RoleName]?: Array<CountryIso> }
// }
