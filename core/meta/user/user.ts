import { RoleNames, UserRole } from '@core/meta/user/userRoles'

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
  roles: Array<UserRole<RoleNames>>
  status: UserStatus
}

export interface UserInvitation {
  uuid: string
  invitedAt: string
  acceptedAt: string
  userId: number
}

export interface UserResetPassword {
  uuid: string
  changedAt: string
  createdAt: string
  userId: number
}
