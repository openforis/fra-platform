// TODO implement useCountryLandingSections
import React from 'react'
import { useUser } from 'client/store/user'
import { User } from 'meta/user'
import { CountryIso } from 'meta/area'
import { useCountryIso } from './useCountryIso'

type Section = {
  name: string
  component: React.FC
}

const getSections = (countryIso: CountryIso, user: User): Array<Section> => {
  console.debug({ countryIso })
  console.debug({ user })
  return []
}

export const useCountryLandingSections = (): Array<Section> => {
  const user = useUser()
  const countryIso = useCountryIso()

  if (user) {
    return getSections(countryIso, user)
  }
  return []
}
