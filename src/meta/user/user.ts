import { RoleName, UserRole } from './index'

export enum UserStatus {
  invitationPending = 'invitationPending',
  active = 'active',
  inactive = 'inactive',
}

export type UserProps = {
  title?: string
  name: string
  surname?: string
  lang: string
}

export interface User {
  readonly id: number
  readonly uuid: string
  email: string
  profilePictureFile?: string
  profilePictureFilename?: string
  props: UserProps
  roles: Array<UserRole<RoleName>>
  status: UserStatus
}
