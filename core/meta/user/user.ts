import { RoleName, UserRole } from '@core/meta/user'

export enum UserStatus {
  invitationPending = 'invitationPending',
  active = 'active',
  inactive = 'inactive',
}

export interface User {
  id: number
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

export interface UserResetPassword {
  uuid: string
  changedAt: string
  createdAt: string
  userId: number
}
