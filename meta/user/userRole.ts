import { CountryIso } from '@meta/area'

export enum RoleName {
  ADMINISTRATOR = 'ADMINISTRATOR',
  COLLABORATOR = 'COLLABORATOR',
  NATIONAL_CORRESPONDENT = 'NATIONAL_CORRESPONDENT',
  ALTERNATE_NATIONAL_CORRESPONDENT = 'ALTERNATE_NATIONAL_CORRESPONDENT',
  REVIEWER = 'REVIEWER',
  VIEWER = 'VIEWER',
}

export interface UserRole<N extends RoleName, P = void> {
  id: number
  assessmentId?: number
  cycleUuid?: string
  countryIso?: CountryIso
  name: N
  props: P
  role: RoleName
  userId: number
  invitationUuid: string
  invitedAt: string
  acceptedAt?: string
}

export type Administrator = UserRole<RoleName.ADMINISTRATOR>
export type NationalCorrespondent = UserRole<RoleName.NATIONAL_CORRESPONDENT>
export type Reviewer = UserRole<RoleName.REVIEWER>
export type Viewer = UserRole<RoleName.VIEWER>
export type CollaboratorProps = {
  /**
   * all = all sections enabled for editing
   * none = no sections enabled for editing
   * Record<string, boolean> = key is sectionUuid, value if true enabled for editing, disabled otherwise
   */
  sections: 'all' | 'none' | Record<string, boolean>
}
export type Collaborator = UserRole<RoleName.COLLABORATOR, CollaboratorProps>
