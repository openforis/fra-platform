import { CountryIso } from 'meta/area'
import { AssessmentStatus, Country } from 'meta/area/country'
import { RoleName, User } from 'meta/user'

import { AssessmentStatusTransition, AssessmentStatusTransitions } from './assessments'
import { Cycle } from './cycle'

const countryIso = 'ATL' as CountryIso
const cycleUuid = '123-XXX-123'

const getUserInfo = (countryIso: CountryIso, role: RoleName) =>
  ({ id: 1, roles: [{ countryIso, role, cycleUuid }] } as User)

const getCountry = (countryIso: CountryIso, status: AssessmentStatus) =>
  ({ countryIso, props: { status }, lastEdit: new Date().toString() } as Country)

const cycle = { uuid: cycleUuid } as Cycle

describe('assessment', () => {
  test('Allows nothing when no role found', () =>
    expect({} as AssessmentStatusTransition).toEqual(
      AssessmentStatusTransitions.getAllowedTransition({
        country: getCountry(countryIso, AssessmentStatus.editing),
        countryIso,
        user: null,
        cycle,
      })
    ))

  // editing state
  test('Allows nothing when role is COLLABORATOR and state is editing', () =>
    expect({} as AssessmentStatusTransition).toEqual(
      AssessmentStatusTransitions.getAllowedTransition({
        country: getCountry(countryIso, AssessmentStatus.editing),
        countryIso,
        user: getUserInfo(countryIso, RoleName.COLLABORATOR),
        cycle,
      })
    ))

  test('Returns review as next when user in NATIONAL_CORRESPONDENT and state is editing', () =>
    expect({ next: AssessmentStatus.review } as AssessmentStatusTransition).toEqual(
      AssessmentStatusTransitions.getAllowedTransition({
        country: getCountry(countryIso, AssessmentStatus.editing),
        countryIso,
        user: getUserInfo(countryIso, RoleName.NATIONAL_CORRESPONDENT),
        cycle,
      })
    ))

  test('Allows nothing when user is REVIEWER and state in in editing', () =>
    expect({} as AssessmentStatusTransition).toEqual(
      AssessmentStatusTransitions.getAllowedTransition({
        country: getCountry(countryIso, AssessmentStatus.editing),
        countryIso,
        user: getUserInfo(countryIso, RoleName.REVIEWER),
        cycle,
      })
    ))

  test('Returns review as next when user in ADMINISTRATOR and state is editing', () =>
    expect({ next: AssessmentStatus.review } as AssessmentStatusTransition).toEqual(
      AssessmentStatusTransitions.getAllowedTransition({
        country: getCountry(countryIso, AssessmentStatus.editing),
        countryIso,
        user: getUserInfo(countryIso, RoleName.ADMINISTRATOR),
        cycle,
      })
    ))

  // review state
  test('Allows nothing when role is COLLABORATOR and state is review', () =>
    expect({} as AssessmentStatusTransition).toEqual(
      AssessmentStatusTransitions.getAllowedTransition({
        country: getCountry(countryIso, AssessmentStatus.review),
        countryIso,
        user: getUserInfo(countryIso, RoleName.COLLABORATOR),
        cycle,
      })
    ))

  test('Allows nothing when user is NATIONAL_CORRESPONDENT and state is review', () =>
    expect({} as AssessmentStatusTransition).toEqual(
      AssessmentStatusTransitions.getAllowedTransition({
        country: getCountry(countryIso, AssessmentStatus.review),
        countryIso,
        user: getUserInfo(countryIso, RoleName.NATIONAL_CORRESPONDENT),
        cycle,
      })
    ))

  test('Returns approval as next and editing as previous when user is REVIEWER and state is review', () =>
    expect({
      next: AssessmentStatus.approval,
      previous: AssessmentStatus.editing,
    } as AssessmentStatusTransition).toEqual(
      AssessmentStatusTransitions.getAllowedTransition({
        country: getCountry(countryIso, AssessmentStatus.review),
        countryIso,
        user: getUserInfo(countryIso, RoleName.REVIEWER),
        cycle,
      })
    ))

  test('Returns approval as next and editing as previous when user is ADMINISTRATOR and state is review', () =>
    expect({
      next: AssessmentStatus.approval,
      previous: AssessmentStatus.editing,
    } as AssessmentStatusTransition).toEqual(
      AssessmentStatusTransitions.getAllowedTransition({
        country: getCountry(countryIso, AssessmentStatus.review),
        countryIso,
        user: getUserInfo(countryIso, RoleName.ADMINISTRATOR),
        cycle,
      })
    ))

  // approval state
  test('Allows nothing when role is COLLABORATOR and state is approval', () =>
    expect({} as AssessmentStatusTransition).toEqual(
      AssessmentStatusTransitions.getAllowedTransition({
        country: getCountry(countryIso, AssessmentStatus.approval),
        countryIso,
        user: getUserInfo(countryIso, RoleName.COLLABORATOR),
        cycle,
      })
    ))

  test('Allows nothing when user is NATIONAL_CORRESPONDENT and state is in approval', () =>
    expect({} as AssessmentStatusTransition).toEqual(
      AssessmentStatusTransitions.getAllowedTransition({
        country: getCountry(countryIso, AssessmentStatus.approval),
        countryIso,
        user: getUserInfo(countryIso, RoleName.NATIONAL_CORRESPONDENT),
        cycle,
      })
    ))

  test('Allows nothing when user is REVIEWER and state is in approval', () =>
    expect({} as AssessmentStatusTransition).toEqual(
      AssessmentStatusTransitions.getAllowedTransition({
        country: getCountry(countryIso, AssessmentStatus.approval),
        countryIso,
        user: getUserInfo(countryIso, RoleName.REVIEWER),
        cycle,
      })
    ))

  test('Returns review as previous and accepted as next when user is ADMINISTRATOR and state is in approval', () =>
    expect({
      next: AssessmentStatus.accepted,
      previous: AssessmentStatus.review,
    } as AssessmentStatusTransition).toEqual(
      AssessmentStatusTransitions.getAllowedTransition({
        country: getCountry(countryIso, AssessmentStatus.approval),
        countryIso,
        user: getUserInfo(countryIso, RoleName.ADMINISTRATOR),
        cycle,
      })
    ))

  // accepted state
  test('Allows nothing when role is COLLABORATOR and state is accepted', () =>
    expect({} as AssessmentStatusTransition).toEqual(
      AssessmentStatusTransitions.getAllowedTransition({
        country: getCountry(countryIso, AssessmentStatus.accepted),
        countryIso,
        user: getUserInfo(countryIso, RoleName.COLLABORATOR),
        cycle,
      })
    ))

  test('Allows nothing when user is NATIONAL_CORRESPONDENT and state is accepted', () =>
    expect({} as AssessmentStatusTransition).toEqual(
      AssessmentStatusTransitions.getAllowedTransition({
        country: getCountry(countryIso, AssessmentStatus.accepted),
        countryIso,
        user: getUserInfo(countryIso, RoleName.NATIONAL_CORRESPONDENT),
        cycle,
      })
    ))

  test('Allows nothing when user is REVIEWER and state is accepted', () =>
    expect({} as AssessmentStatusTransition).toEqual(
      AssessmentStatusTransitions.getAllowedTransition({
        country: getCountry(countryIso, AssessmentStatus.accepted),
        countryIso,
        user: getUserInfo(countryIso, RoleName.REVIEWER),
        cycle,
      })
    ))

  test('Returns review as previous when user is ADMINISTRATOR and state is accepted', () =>
    expect({
      previous: AssessmentStatus.review,
    } as AssessmentStatusTransition).toEqual(
      AssessmentStatusTransitions.getAllowedTransition({
        country: getCountry(countryIso, AssessmentStatus.accepted),
        countryIso,
        user: getUserInfo(countryIso, RoleName.ADMINISTRATOR),
        cycle,
      })
    ))
})
