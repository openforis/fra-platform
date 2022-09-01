import { CountryIso } from '@meta/area'
import { AssessmentStatus, Country } from '@meta/area/country'
import { RoleName, User } from '@meta/user'

import { AssessmentStatusTransition, AssessmentStatusTransitions } from './assessments'

const countryIso = 'ATL' as CountryIso

const getUserInfo = (countryIso: CountryIso, role: RoleName) => ({ id: 1, roles: [{ countryIso, role }] } as User)

const getCountry = (countryIso: CountryIso, status: AssessmentStatus) => ({ countryIso, props: { status } } as Country)

describe('assessment', () => {
  test('Allows nothing when no role found', () =>
    expect({} as AssessmentStatusTransition).toEqual(
      AssessmentStatusTransitions.getAllowedTransition({
        country: getCountry(countryIso, AssessmentStatus.editing),
        countryIso,
        user: null,
      })
    ))

  // editing state
  test('Allows nothing when role is COLLABORATOR and state is editing', () =>
    expect({} as AssessmentStatusTransition).toEqual(
      AssessmentStatusTransitions.getAllowedTransition({
        country: getCountry(countryIso, AssessmentStatus.editing),
        countryIso,
        user: getUserInfo(countryIso, RoleName.COLLABORATOR),
      })
    ))

  test('Returns review as next when user in NATIONAL_CORRESPONDENT and state is editing', () =>
    expect({ next: AssessmentStatus.review } as AssessmentStatusTransition).toEqual(
      AssessmentStatusTransitions.getAllowedTransition({
        country: getCountry(countryIso, AssessmentStatus.editing),
        countryIso,
        user: getUserInfo(countryIso, RoleName.NATIONAL_CORRESPONDENT),
      })
    ))

  test('Allows nothing when user is REVIEWER and state in in editing', () =>
    expect({} as AssessmentStatusTransition).toEqual(
      AssessmentStatusTransitions.getAllowedTransition({
        country: getCountry(countryIso, AssessmentStatus.editing),
        countryIso,
        user: getUserInfo(countryIso, RoleName.REVIEWER),
      })
    ))

  test('Returns review as next when user in ADMINISTRATOR and state is editing', () =>
    expect({ next: AssessmentStatus.review } as AssessmentStatusTransition).toEqual(
      AssessmentStatusTransitions.getAllowedTransition({
        country: getCountry(countryIso, AssessmentStatus.editing),
        countryIso,
        user: getUserInfo(countryIso, RoleName.ADMINISTRATOR),
      })
    ))

  // review state
  test('Allows nothing when role is COLLABORATOR and state is review', () =>
    expect({} as AssessmentStatusTransition).toEqual(
      AssessmentStatusTransitions.getAllowedTransition({
        country: getCountry(countryIso, AssessmentStatus.review),
        countryIso,
        user: getUserInfo(countryIso, RoleName.COLLABORATOR),
      })
    ))

  test('Allows nothing when user is NATIONAL_CORRESPONDENT and state is review', () =>
    expect({} as AssessmentStatusTransition).toEqual(
      AssessmentStatusTransitions.getAllowedTransition({
        country: getCountry(countryIso, AssessmentStatus.review),
        countryIso,
        user: getUserInfo(countryIso, RoleName.NATIONAL_CORRESPONDENT),
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
      })
    ))

  // approval state
  test('Allows nothing when role is COLLABORATOR and state is approval', () =>
    expect({} as AssessmentStatusTransition).toEqual(
      AssessmentStatusTransitions.getAllowedTransition({
        country: getCountry(countryIso, AssessmentStatus.approval),
        countryIso,
        user: getUserInfo(countryIso, RoleName.COLLABORATOR),
      })
    ))

  test('Allows nothing when user is NATIONAL_CORRESPONDENT and state is in approval', () =>
    expect({} as AssessmentStatusTransition).toEqual(
      AssessmentStatusTransitions.getAllowedTransition({
        country: getCountry(countryIso, AssessmentStatus.approval),
        countryIso,
        user: getUserInfo(countryIso, RoleName.NATIONAL_CORRESPONDENT),
      })
    ))

  test('Allows nothing when user is REVIEWER and state is in approval', () =>
    expect({} as AssessmentStatusTransition).toEqual(
      AssessmentStatusTransitions.getAllowedTransition({
        country: getCountry(countryIso, AssessmentStatus.approval),
        countryIso,
        user: getUserInfo(countryIso, RoleName.REVIEWER),
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
      })
    ))

  // accepted state
  test('Allows nothing when role is COLLABORATOR and state is accepted', () =>
    expect({} as AssessmentStatusTransition).toEqual(
      AssessmentStatusTransitions.getAllowedTransition({
        country: getCountry(countryIso, AssessmentStatus.accepted),
        countryIso,
        user: getUserInfo(countryIso, RoleName.COLLABORATOR),
      })
    ))

  test('Allows nothing when user is NATIONAL_CORRESPONDENT and state is accepted', () =>
    expect({} as AssessmentStatusTransition).toEqual(
      AssessmentStatusTransitions.getAllowedTransition({
        country: getCountry(countryIso, AssessmentStatus.accepted),
        countryIso,
        user: getUserInfo(countryIso, RoleName.NATIONAL_CORRESPONDENT),
      })
    ))

  test('Allows nothing when user is REVIEWER and state is accepted', () =>
    expect({} as AssessmentStatusTransition).toEqual(
      AssessmentStatusTransitions.getAllowedTransition({
        country: getCountry(countryIso, AssessmentStatus.accepted),
        countryIso,
        user: getUserInfo(countryIso, RoleName.REVIEWER),
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
      })
    ))
})
