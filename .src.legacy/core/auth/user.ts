import { Lang } from 'meta/lang'

import { AssessmentType } from '../assessment'
import { Role } from './role'

export enum UserType {
  local = 'local',
  google = 'google',
}

export interface UserRole {
  countryIso?: string
  role: Role
  assessment: AssessmentType
}

export interface User {
  id: number
  name: string
  email: string
  loginEmail?: string
  institution?: string
  position?: string
  lang?: Lang
  type: UserType
  active: boolean
  roles: Array<UserRole>
  // deprecated
  role: any
}

/*
 * Deprecated
 */
export interface oldRole {
  countryIso: string
  lastEdit: string
  annualAssessment: 'accepted' | 'editing'
  fra2020Assessment: 'accepted' | 'editing'
  fra2020DeskStudy: boolean
  role: Role
}
