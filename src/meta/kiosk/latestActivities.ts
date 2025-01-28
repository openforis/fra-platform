import { CountryIso } from 'meta/area'

export type Activity = {
  countryIso: CountryIso
  countryName: string
  date: string
  description: string
  id: string
  lat: number
  lng: number
}
