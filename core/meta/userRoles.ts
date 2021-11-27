export enum RoleNames {
  ADMINISTRATOR = 'ADMINISTRATOR',
  COLLABORATOR = 'COLLABORATOR',
  NATIONAL_CORRESPONDENT = 'NATIONAL_CORRESPONDENT',
  REVIEWER = 'REVIEWER',
  VIEWER = 'VIEWER',
}

export interface UserRole<N extends RoleNames, P = void> {
  name: N
  props: P
}

export type Administrator = UserRole<RoleNames.ADMINISTRATOR>
export type NationalCorrespondent = UserRole<RoleNames.NATIONAL_CORRESPONDENT>
export type Reviewer = UserRole<RoleNames.REVIEWER>
export type Viewer = UserRole<RoleNames.VIEWER>
export type CollaboratorProps = {
  /**
   * all = all sections enabled for editing
   * none = no sections enabled for editing
   * Record<string, boolean> = key is sectionUuid, value if true enabled for editing, disabled otherwise
   */
  sections: 'all' | 'none' | Record<string, boolean>
}
export type Collaborator = UserRole<RoleNames.COLLABORATOR, CollaboratorProps>

export interface UserRoles {
  // id: number
  countryIso?: string
  userId: number
  assessmentId?: number
  /**
   * roles can be either ADMIN or a Record indexed by cycleUuid
   */
  roles: RoleNames.ADMINISTRATOR | Record<string, UserRole<RoleNames>>
}
