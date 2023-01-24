import { RoleName, UserRole } from './index'

export enum UserStatus {
  invitationPending = 'invitationPending',
  active = 'active',
  inactive = 'inactive',
}

export type UserProps = {
  // old fields
  name: string
  lang: string
  institution?: string
  position?: string
  // new fields
  title?: string
  surname?: string
}

export interface User {
  id: number
  email: string
  profilePictureFile?: string
  profilePictureFilename?: string
  props: UserProps
  roles: Array<UserRole<RoleName>>
  status: UserStatus
}
