import { CountryIso } from '../country'

export type Lang = 'en' | 'zh' | 'es' | 'fr' | 'ru' | 'ar'

export type AuthType = 'local' | 'google'

export type Role =
  | 'NATIONAL_CORRESPONDENT'
  | 'REVIEWER'
  | 'COLLABORATOR'
  | 'ADMINISTRATOR'
  | 'ALTERNATE_NATIONAL_CORRESPONDENT'

export interface RoleUser {
  countryIso?: null | CountryIso
  role: Role
  assessment: 'fra2020'
}

export interface User {
  id: number
  name: string
  email: string
  loginEmail: null
  institution: null
  position: null
  lang: Lang
  type: AuthType
  active: boolean
  // deprecated
  role: any
  roles: RoleUser[]
}

/*
 * Deprecated
 */
export interface oldRole {
  countryIso: CountryIso
  lastEdit: string
  annualAssessment: 'accepted' | 'editing'
  fra2020Assessment: 'accepted' | 'editing'
  fra2020DeskStudy: boolean
  role: Role
}
