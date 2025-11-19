import { CountryIso } from 'meta/area/countryIso'
import { CollaboratorPermissions } from 'meta/user/role/collaborator'
import { RoleName } from 'meta/user/role/name'
import { UserRole } from 'meta/user/role/role'
import { User, UserProps } from 'meta/user/user'

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
    permissions?: CollaboratorPermissions
    props?: Partial<UserRole['props']>
    role?: RoleName
  }
  roles?: UserEditFormRoles
}
