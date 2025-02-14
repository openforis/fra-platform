import { CountryIso } from 'meta/area'

export type Activity = {
  countryIso: CountryIso
  countryName: string
  description: string
  endDate: string
  id: string
  lat: number
  link: string
  lng: number
  startDate: string
  title: string
}
