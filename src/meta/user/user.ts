import { Lang } from 'meta/lang'

import { RoleName, UserRole } from './index'

export enum UserTitles {
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
  title?: UserTitles
  name: string
  surname?: string
  lang: Lang
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
