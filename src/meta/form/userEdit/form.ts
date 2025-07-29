import { CountryIso } from 'meta/area'
import { RoleName, User, UserRole } from 'meta/user'
import { UserProps } from 'meta/user/user'
import { CollaboratorPermissionsNEW } from 'meta/user/userRole'

export type UserForm = Pick<User, 'email' | 'id' | 'uuid'> & {
  disabled?: boolean
  props: Pick<UserProps, 'name' | 'surname' | 'title'>
}

export type UserEditFormRoles = {
  [key in
    | RoleName.REVIEWER
    | RoleName.NATIONAL_CORRESPONDENT
    | RoleName.ALTERNATE_NATIONAL_CORRESPONDENT
    | RoleName.COLLABORATOR
    | RoleName.VIEWER]: Array<CountryIso>
} & {
  [RoleName.ADMINISTRATOR]: boolean
}

export type UserEditCountryForm = {
  profilePicture?: File
  user: UserForm
  role?: Pick<UserRole, 'uuid'> & {
    permissions?: CollaboratorPermissionsNEW
    props?: Partial<UserRole['props']>
    role?: RoleName
  }
  roles?: UserEditFormRoles
}
