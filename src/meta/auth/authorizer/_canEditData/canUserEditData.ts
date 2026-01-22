import { Areas } from 'meta/area/areas'
import { CountryStatus } from 'meta/area/countryStatus'
import { areCanEditDataPropsValid } from 'meta/auth/authorizer/_canEditData/areCanEditDataPropsValid'
import { canCollaboratorEditData } from 'meta/auth/authorizer/_canEditData/canCollaboratorEditData'
import { CanEditDataProps } from 'meta/auth/authorizer/_canEditData/types'
import { CollaboratorEditPropertyType } from 'meta/user/role/collaborator'
import { Users } from 'meta/user/users'

export const canUserEditData = (props: CanEditDataProps): boolean => {
  const { country, cycle, permission, section, user } = props

  if (areCanEditDataPropsValid({ country, cycle, user })) {
    const { countryIso } = country
    const status = Areas.getStatus(country)

    const isAdministrator = Users.isAdministrator(user)
    const isCollaborator = Users.isCollaborator(user, countryIso, cycle)
    const isAlternateNationalCorrespondent = Users.isAlternateNationalCorrespondent(user, countryIso, cycle)
    const isNationalCorrespondent = Users.isNationalCorrespondent(user, countryIso, cycle)
    const isRegionalFocalPoint = Users.isRegionalFocalPoint(user, countryIso, cycle)
    const isReviewer = Users.isReviewer(user, countryIso, cycle)

    if (isAdministrator) return true

    // RFC can always edit metadata (descriptions). instead can edit data like Reviewer
    if (isRegionalFocalPoint && permission === CollaboratorEditPropertyType.descriptions) return true

    // Reviewer can always edit metadata (descriptions)
    if (isReviewer && permission === CollaboratorEditPropertyType.descriptions) return true

    if (isRegionalFocalPoint || isReviewer) {
      return [CountryStatus.notStarted, CountryStatus.editing, CountryStatus.review].includes(status)
    }

    if (isNationalCorrespondent || isAlternateNationalCorrespondent) {
      return [CountryStatus.notStarted, CountryStatus.editing].includes(status)
    }

    if (isCollaborator && [CountryStatus.notStarted, CountryStatus.editing].includes(status)) {
      return canCollaboratorEditData({ country, cycle, permission, section, user })
    }
  }

  return false
}
