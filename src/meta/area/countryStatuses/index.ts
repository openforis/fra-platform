// TODO: Rename in CountryStatusTransition
import { Objects } from 'utils/objects'

import { Areas } from 'meta/area/areas'
import { Country } from 'meta/area/country'
import { CountryStatus } from 'meta/area/status'
import { Cycle } from 'meta/assessment/cycle'
import { Cycles } from 'meta/assessment/cycles'
import { RoleName, User, Users } from 'meta/user'

export type CountryStatusTransition = {
  next?: CountryStatus
  previous?: CountryStatus
}

const statusTransitions: { [status in CountryStatus]?: CountryStatusTransition } = {
  // notStarted: no transitions,
  [CountryStatus.editing]: { next: CountryStatus.review },
  [CountryStatus.review]: { next: CountryStatus.approval, previous: CountryStatus.editing },
  [CountryStatus.approval]: { next: CountryStatus.accepted, previous: CountryStatus.review },
  [CountryStatus.accepted]: { next: CountryStatus.published, previous: CountryStatus.review },
  [CountryStatus.published]: { previous: CountryStatus.accepted },
}

const statusRolesAllowed: { [status in CountryStatus]?: Array<RoleName> } = {
  [CountryStatus.editing]: [
    RoleName.ADMINISTRATOR,
    RoleName.NATIONAL_CORRESPONDENT,
    RoleName.ALTERNATE_NATIONAL_CORRESPONDENT,
  ],
  [CountryStatus.review]: [RoleName.ADMINISTRATOR, RoleName.REVIEWER],
  [CountryStatus.approval]: [RoleName.ADMINISTRATOR],
  [CountryStatus.accepted]: [RoleName.ADMINISTRATOR],
  [CountryStatus.published]: [RoleName.ADMINISTRATOR],
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

    // When a cycle is published, a country cannot be moved back to previous steps
    if (Cycles.isPublished(cycle)) {
      return { next: transitions.next }
    }

    if (!Objects.isNil(transitions) && rolesAllowed?.includes(roleName)) {
      return transitions
    }

    return {}
  },
}
