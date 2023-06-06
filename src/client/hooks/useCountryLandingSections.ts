// TODO implement useCountryLandingSections
import React from 'react'

import { CountryIso } from 'meta/area'
import { User } from 'meta/user'

import { useUser } from 'client/store/user'

import { useCountryIso } from './useCountryIso'

type Section = {
  name: string
  component: React.FC
}

const getSections = (countryIso: CountryIso, user: User): Array<Section> => {
  // eslint-disable-next-line no-console
  console.debug({ countryIso })
  // eslint-disable-next-line no-console
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
