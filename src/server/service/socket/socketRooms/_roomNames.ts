import { CountryIso } from 'meta/area/countryIso'

export const adminRoom = 'admins'

export const getUserRoom = (userId: number): string => `user-${userId}`

export const getCountryRoom = (props: { countryIso: CountryIso; cycleUuid: string }): string => {
  const { countryIso, cycleUuid } = props
  return `${cycleUuid}-${countryIso}`
}
