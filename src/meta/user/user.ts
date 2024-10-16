import { Lang } from 'meta/lang'

import { RoleName, UserRole } from './index'

export enum UserTitle {
  mr = 'mr',
  mrs = 'mrs',
  ms = 'ms',
  other = 'other',
}

export enum UserStatus {
  invitationPending = 'invitationPending',
  active = 'active',
  disabled = 'disabled',
}

export type UserProps = {
  title?: UserTitle
  name: string
  surname?: string
  lang: Lang
}

export interface User {
  readonly id: number
  readonly uuid: string
  email: string
  profilePictureFileUuid?: string
  props: UserProps
  roles: Array<UserRole<RoleName>>
  status: UserStatus
}
