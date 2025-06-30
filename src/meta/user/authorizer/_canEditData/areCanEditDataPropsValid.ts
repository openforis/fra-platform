import { Objects } from 'utils/objects'

import { Areas } from 'meta/area'
import { CanEditDataProps } from 'meta/user/authorizer/_canEditData/types'

export const areCanEditDataPropsValid = (props: Pick<CanEditDataProps, 'country' | 'cycle' | 'user'>): boolean => {
  const { country, cycle, user } = props

  return [country, cycle, user].every((c) => !Objects.isNil(c)) && Areas.isISOCountry(country.countryIso)
}
