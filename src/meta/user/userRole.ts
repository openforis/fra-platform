import { CountryIso } from '@meta/area'

export enum RoleName {
  ADMINISTRATOR = 'ADMINISTRATOR',
  COLLABORATOR = 'COLLABORATOR',
  NATIONAL_CORRESPONDENT = 'NATIONAL_CORRESPONDENT',
  ALTERNATE_NATIONAL_CORRESPONDENT = 'ALTERNATE_NATIONAL_CORRESPONDENT',
  REVIEWER = 'REVIEWER',
  VIEWER = 'VIEWER',
}

export type UserRoleBaseInfo = {
  professionalTitle?: string
  organizationalUnit?: string
  organization?: string
}

export type UserRoleExtendedInfo = UserRoleBaseInfo & {
  address?: {
    street?: string
    zipCode?: string
    poBox?: string
    city?: string
    country?: CountryIso
  }
  primaryEmail?: string
  secondaryEmail?: string
  primaryPhoneNo?: string
  secondaryPhoneNo?: string
  skype?: string
  preferredWayOfContacting?: string
}

export interface UserRole<
  N extends RoleName,
  P = undefined,
  I extends UserRoleBaseInfo | UserRoleExtendedInfo = UserRoleExtendedInfo
> {
  id: number
  assessmentId?: number
  cycleUuid: string
  countryIso?: CountryIso
  name: N
  props: P
  info: I
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

export enum CollaboratorEditPropertyType {
  tableData = 'tableData',
  descriptions = 'descriptions',
}

export type CollaboratorSectionsProp =
  /**
   * all = all sections enabled for editing
   * none = no sections enabled for editing
   * Record<string, { tableData: boolean, descriptions: boolean }> = key is sectionUuid, value contains an object which specifies permission by key
   */
  'all' | 'none' | Record<string, { [key in keyof typeof CollaboratorEditPropertyType]?: boolean }>

export type CollaboratorProps = {
  sections: CollaboratorSectionsProp
}

export type Collaborator = UserRole<RoleName.COLLABORATOR, CollaboratorProps, UserRoleBaseInfo>
