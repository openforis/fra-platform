import { RoleName, UserRole } from './index'

export enum UserStatus {
  invitationPending = 'invitationPending',
  active = 'active',
  inactive = 'inactive',
}

export interface User {
  id: number
  uuid: string
  institution?: string
  email: string
  lang: string
  name: string
  position?: string
  profilePictureFile?: string
  profilePictureFilename?: string
  roles: Array<UserRole<RoleName>>
  status: UserStatus
}
