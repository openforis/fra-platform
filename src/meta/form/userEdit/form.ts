import { RoleName, User, UserRole } from 'meta/user'
import { UserProps } from 'meta/user/user'
import { CollaboratorPermissionsNEW } from 'meta/user/userRole'

export type UserForm = Pick<User, 'email' | 'id' | 'uuid'> & {
  props: Pick<UserProps, 'name' | 'surname' | 'title'>
}

export type UserEditCountryForm = {
  profilePicture?: File
  user: UserForm
  role?: Pick<UserRole, 'uuid'> & {
    permissions?: CollaboratorPermissionsNEW
    props?: Partial<UserRole['props']>
    role?: RoleName
  }
}

// export type UserAdminForm = UserForm & { status: UserStatus.active | UserStatus.disabled }
// export type UserEditAdminForm = {
//   profilePicture?: File
//   user: UserAdminForm
//   roles: { [roleName in RoleName]?: Array<CountryIso> }
// }
