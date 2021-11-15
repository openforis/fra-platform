export enum UserStatus {
  invitationPending = 'invitationPending',
  active = 'active',
  inactive = 'inactive',
}

export interface User {
  institution?: string
  lang: string
  id: number
  profilePictureFilename?: string
  name: string
  status: UserStatus
  profilePictureFile?: string
  position?: string
  email: string
}

export enum AuthProvider {
  google = 'google',
  local = 'local',
}

export interface UserProvider<P = void> {
  id: number
  userId: number
  provider: AuthProvider
  props: P
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
