import { apiPath } from 'meta/api/endpoint/_utils'

export const Area = {
  country: (): string => apiPath('area', 'country'),
  countryProp: (): string => apiPath('area', 'country', 'prop'),
  areas: (): string => apiPath('area', 'areas'),
}
