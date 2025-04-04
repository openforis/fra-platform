// TODO: Rename in CountryStatusTransition
import { Objects } from 'utils/objects'

import { Areas } from 'meta/area/areas'
import { Country } from 'meta/area/country'
import { AssessmentStatus } from 'meta/area/status'
import { Cycle } from 'meta/assessment/cycle'
import { RoleName, User, Users } from 'meta/user'

export type CountryStatusTransition = {
  next?: AssessmentStatus
  previous?: AssessmentStatus
}

const statusTransitions: { [status in AssessmentStatus]?: CountryStatusTransition } = {
  // notStarted: no transitions,
  [AssessmentStatus.editing]: { next: AssessmentStatus.review },
  [AssessmentStatus.review]: { next: AssessmentStatus.approval, previous: AssessmentStatus.editing },
  [AssessmentStatus.approval]: { next: AssessmentStatus.accepted, previous: AssessmentStatus.review },
  [AssessmentStatus.accepted]: { previous: AssessmentStatus.review },
}

const statusRolesAllowed: { [status in AssessmentStatus]?: Array<RoleName> } = {
  [AssessmentStatus.editing]: [
    RoleName.ADMINISTRATOR,
    RoleName.NATIONAL_CORRESPONDENT,
    RoleName.ALTERNATE_NATIONAL_CORRESPONDENT,
  ],
  [AssessmentStatus.review]: [RoleName.ADMINISTRATOR, RoleName.REVIEWER],
  [AssessmentStatus.approval]: [RoleName.ADMINISTRATOR],
  [AssessmentStatus.accepted]: [RoleName.ADMINISTRATOR],
}

type PropsAllowedTransition = {
  country: Country
  cycle: Cycle
  user: User
}

export const CountryStatuses = {
  getAllowedTransition: (props: PropsAllowedTransition): CountryStatusTransition => {
    const { country, cycle, user } = props
    const { countryIso } = country

    const status = Areas.getStatus(country)
    const roleName = Users.getRole(user, countryIso, cycle)?.role
    const transitions = statusTransitions[status]
    const rolesAllowed = statusRolesAllowed[status]

    if (!Objects.isNil(transitions) && rolesAllowed?.includes(roleName)) {
      return transitions
    }

    return {}
  },
}
