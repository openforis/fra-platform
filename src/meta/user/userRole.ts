import { CountryIso } from 'meta/area'

export enum RoleName {
  ADMINISTRATOR = 'ADMINISTRATOR',
  COLLABORATOR = 'COLLABORATOR',
  NATIONAL_CORRESPONDENT = 'NATIONAL_CORRESPONDENT',
  ALTERNATE_NATIONAL_CORRESPONDENT = 'ALTERNATE_NATIONAL_CORRESPONDENT',
  REVIEWER = 'REVIEWER',
  VIEWER = 'VIEWER',
}

export enum UserContactPreferenceMethod {
  primaryEmail = 'primaryEmail',
  secondaryEmail = 'secondaryEmail',
  skype = 'skype',
  primaryPhoneNumber = 'primaryPhoneNumber',
  secondaryPhoneNumber = 'secondaryPhoneNumber',
  platformChat = 'platformChat',
}

export enum UserContactPreferencePhoneOption {
  signal = 'signal',
  whatsapp = 'whatsapp',
}

export type UserContactPreference = {
  method: UserContactPreferenceMethod
  options?: {
    phone?: UserContactPreferencePhoneOption
  }
}

export type UserRoleBaseProps = {
  professionalTitle?: string
  organizationalUnit?: string
  organization?: string
}

export type UserRoleExtendedProps = UserRoleBaseProps & {
  address?: {
    street?: string
    zipCode?: string
    poBox?: string
    city?: string
    countryIso?: CountryIso
  }
  primaryEmail?: string
  secondaryEmail?: string
  primaryPhoneNumber?: string
  secondaryPhoneNumber?: string
  skype?: string
  contactPreference?: UserContactPreference
}

export interface UserRole<Name extends RoleName, Props extends UserRoleBaseProps = undefined, Permissions = undefined> {
  assessmentId?: number
  countryIso?: CountryIso
  createdAt: string
  cycleUuid: string
  id: number
  invitationUuid?: string
  permissions: Permissions
  props: Props
  role: Name
  userUuid: string
  uuid: string
}

export type UserRoleExtended<Name extends RoleName> = UserRole<Name, UserRoleExtendedProps>

export type Administrator = UserRole<RoleName.ADMINISTRATOR>
export type NationalCorrespondent = UserRoleExtended<RoleName.NATIONAL_CORRESPONDENT>
export type AlternateNationalCorrespondent = UserRoleExtended<RoleName.ALTERNATE_NATIONAL_CORRESPONDENT>
export type Reviewer = UserRoleExtended<RoleName.REVIEWER>
export type Viewer = UserRole<RoleName.VIEWER>

export enum CollaboratorEditPropertyType {
  tableData = 'tableData',
  descriptions = 'descriptions',
}

export type CollaboratorSectionsPermission =
  /**
   * all = all sections enabled for editing
   * none = no sections enabled for editing
   * Record<string, { tableData: boolean, descriptions: boolean }> = key is sectionUuid, value contains an object which specifies permission by key
   */
  'all' | 'none' | Record<string, { [key in keyof typeof CollaboratorEditPropertyType]?: boolean }>

export type CollaboratorPermissions = {
  sections: CollaboratorSectionsPermission
}

export type Collaborator = UserRole<RoleName.COLLABORATOR, UserRoleBaseProps, CollaboratorPermissions>
