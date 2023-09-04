import { CountryIso } from 'meta/area'
import { AssessmentUuid, CycleUuid } from 'meta/assessment'
import { Lang } from 'meta/lang'

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
  lang: Lang
  preferences?: {
    cycleUuid?: CycleUuid
    assessmentUuid: AssessmentUuid
    countryIso: CountryIso
  }
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
