import { User, UserTitle } from 'meta/user'
import { UserProps } from 'meta/user/user'

export type UserEditForm = {
  user_id: number
  profilePicture?: File
  user_email: string
  user_props_name: string
  user_props_surname: string
  user_props_title: UserTitle
}

export type UserForm = Pick<User, 'email' | 'id'> & {
  props: Pick<UserProps, 'name' | 'surname' | 'title'>
}
export type UserEditCountryForm = {
  profilePicture?: File
  user: UserForm
  // role?: Pick<UserRole, 'id' | 'role'> & { props: Partial<UserRole['props']> }
}

// export type UserAdminForm = UserForm & { status: UserStatus.active | UserStatus.disabled }
// export type UserEditAdminForm = {
//   profilePicture?: File
//   user: UserAdminForm
//   roles: { [roleName in RoleName]?: Array<CountryIso> }
// }
