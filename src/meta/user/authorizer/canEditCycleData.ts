import { Areas, Country, CountryStatus } from 'meta/area'
import { Cycle } from 'meta/assessment/cycle'
import { User } from 'meta/user/user'
import { Collaborator } from 'meta/user/userRole'
import { Users } from 'meta/user/users'

export const canEditCycleData = (props: { cycle: Cycle; country: Country; user: User }): boolean => {
  const { country, cycle, user } = props
  const { countryIso } = country ?? {}
  const status = Areas.getStatus(country)

  if (!user) return false
  if (Users.isViewer(user, countryIso, cycle)) return false
  if (Users.isAdministrator(user)) return true

  const nationalCorrespondent = Users.isNationalCorrespondent(user, countryIso, cycle)
  const alternateNationalCorrespondent = Users.isAlternateNationalCorrespondent(user, countryIso, cycle)
  const collaborator = Users.isCollaborator(user, countryIso, cycle)
  const reviewer = Users.isReviewer(user, countryIso, cycle)

  if (nationalCorrespondent || alternateNationalCorrespondent) {
    return [CountryStatus.notStarted, CountryStatus.editing].includes(status)
  }

  if (collaborator) {
    const collaboratorPermissions = (user as unknown as Collaborator).permissions
    const collaboratorCanEdit =
      !collaboratorPermissions?.tableData?.includes('none') && !collaboratorPermissions?.descriptions?.includes('none')
    return [CountryStatus.notStarted, CountryStatus.editing].includes(status) && collaboratorCanEdit
  }

  if (reviewer) {
    return [CountryStatus.notStarted, CountryStatus.editing, CountryStatus.review].includes(status)
  }

  return false
}
