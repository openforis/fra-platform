import { CountryIso } from 'meta/area/countryIso'

export enum UserContactPreferenceMethod {
  primaryEmail = 'primaryEmail',
  secondaryEmail = 'secondaryEmail',
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
  contactPreference?: UserContactPreference
}
