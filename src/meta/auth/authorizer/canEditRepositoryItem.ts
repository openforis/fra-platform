import { Country } from 'meta/area/country'
import { Cycle } from 'meta/assessment/cycle'
import { canEditCountryProps } from 'meta/auth/authorizer/canEditCountryProps'
import { Authorizer } from 'meta/auth/authorizer/index'
import { CollaboratorEditPropertyType } from 'meta/user/role/collaborator'
import { User } from 'meta/user/user'
import { Users } from 'meta/user/users'

export const canEditRepositoryItem = (props: { cycle: Cycle; country: Country; user: User }): boolean => {
  const { country, cycle, user } = props

  const isReviewer = Users.isReviewer(user, country.countryIso, cycle)
  const isRegionalFocalPoint = Users.isRegionalFocalPoint(user, country.countryIso, cycle)

  if (isReviewer || isRegionalFocalPoint) {
    const permission = CollaboratorEditPropertyType.descriptions
    return Authorizer.canEditSectionData({ country, cycle, permission, section: undefined, user })
  }

  return canEditCountryProps({ ...props, allowCollaborator: true })
}
