import { CountryIso } from 'meta/area'

export type Activity = {
  countryIso: CountryIso
  countryName: string
  date: string
  description: string
  lat: number
  lng: number
}
