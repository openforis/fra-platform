import { Country } from 'meta/area/country'
import { CountryIso } from 'meta/area/countryIso'
import { CountryStatuses, CountryStatusTransition } from 'meta/area/countryStatuses/index'
import { CountryStatus } from 'meta/area/status'
import { Cycle } from 'meta/assessment/cycle'
import { RoleName, User } from 'meta/user'

const countryIso = 'ATL' as CountryIso
const cycleUuid = '123-XXX-123'

const getUserInfo = (countryIso: CountryIso, role: RoleName) =>
  ({ id: 1, roles: [{ countryIso, role, cycleUuid }] } as User)

const getCountry = (countryIso: CountryIso, status: CountryStatus) =>
  ({ countryIso, props: { status }, lastEdit: new Date().toString() } as Country)

const cycle = { uuid: cycleUuid } as Cycle

describe('assessment', () => {
  test('Allows nothing when no role found', () =>
    expect({} as CountryStatusTransition).toEqual(
      CountryStatuses.getAllowedTransition({
        country: getCountry(countryIso, CountryStatus.editing),
        user: null,
        cycle,
      })
    ))

  // editing state
  test('Allows nothing when role is COLLABORATOR and state is editing', () =>
    expect({} as CountryStatusTransition).toEqual(
      CountryStatuses.getAllowedTransition({
        country: getCountry(countryIso, CountryStatus.editing),
        user: getUserInfo(countryIso, RoleName.COLLABORATOR),
        cycle,
      })
    ))

  test('Returns review as next when user in NATIONAL_CORRESPONDENT and state is editing', () =>
    expect({ next: CountryStatus.review } as CountryStatusTransition).toEqual(
      CountryStatuses.getAllowedTransition({
        country: getCountry(countryIso, CountryStatus.editing),
        user: getUserInfo(countryIso, RoleName.NATIONAL_CORRESPONDENT),
        cycle,
      })
    ))

  test('Allows nothing when user is REVIEWER and state in in editing', () =>
    expect({} as CountryStatusTransition).toEqual(
      CountryStatuses.getAllowedTransition({
        country: getCountry(countryIso, CountryStatus.editing),
        user: getUserInfo(countryIso, RoleName.REVIEWER),
        cycle,
      })
    ))

  test('Returns review as next when user in ADMINISTRATOR and state is editing', () =>
    expect({ next: CountryStatus.review } as CountryStatusTransition).toEqual(
      CountryStatuses.getAllowedTransition({
        country: getCountry(countryIso, CountryStatus.editing),
        user: getUserInfo(countryIso, RoleName.ADMINISTRATOR),
        cycle,
      })
    ))

  // review state
  test('Allows nothing when role is COLLABORATOR and state is review', () =>
    expect({} as CountryStatusTransition).toEqual(
      CountryStatuses.getAllowedTransition({
        country: getCountry(countryIso, CountryStatus.review),
        user: getUserInfo(countryIso, RoleName.COLLABORATOR),
        cycle,
      })
    ))

  test('Allows nothing when user is NATIONAL_CORRESPONDENT and state is review', () =>
    expect({} as CountryStatusTransition).toEqual(
      CountryStatuses.getAllowedTransition({
        country: getCountry(countryIso, CountryStatus.review),
        user: getUserInfo(countryIso, RoleName.NATIONAL_CORRESPONDENT),
        cycle,
      })
    ))

  test('Returns approval as next and editing as previous when user is REVIEWER and state is review', () =>
    expect({
      next: CountryStatus.approval,
      previous: CountryStatus.editing,
    } as CountryStatusTransition).toEqual(
      CountryStatuses.getAllowedTransition({
        country: getCountry(countryIso, CountryStatus.review),
        user: getUserInfo(countryIso, RoleName.REVIEWER),
        cycle,
      })
    ))

  test('Returns approval as next and editing as previous when user is ADMINISTRATOR and state is review', () =>
    expect({
      next: CountryStatus.approval,
      previous: CountryStatus.editing,
    } as CountryStatusTransition).toEqual(
      CountryStatuses.getAllowedTransition({
        country: getCountry(countryIso, CountryStatus.review),
        user: getUserInfo(countryIso, RoleName.ADMINISTRATOR),
        cycle,
      })
    ))

  // approval state
  test('Allows nothing when role is COLLABORATOR and state is approval', () =>
    expect({} as CountryStatusTransition).toEqual(
      CountryStatuses.getAllowedTransition({
        country: getCountry(countryIso, CountryStatus.approval),
        user: getUserInfo(countryIso, RoleName.COLLABORATOR),
        cycle,
      })
    ))

  test('Allows nothing when user is NATIONAL_CORRESPONDENT and state is in approval', () =>
    expect({} as CountryStatusTransition).toEqual(
      CountryStatuses.getAllowedTransition({
        country: getCountry(countryIso, CountryStatus.approval),
        user: getUserInfo(countryIso, RoleName.NATIONAL_CORRESPONDENT),
        cycle,
      })
    ))

  test('Allows nothing when user is REVIEWER and state is in approval', () =>
    expect({} as CountryStatusTransition).toEqual(
      CountryStatuses.getAllowedTransition({
        country: getCountry(countryIso, CountryStatus.approval),
        user: getUserInfo(countryIso, RoleName.REVIEWER),
        cycle,
      })
    ))

  test('Returns review as previous and accepted as next when user is ADMINISTRATOR and state is in approval', () =>
    expect({
      next: CountryStatus.accepted,
      previous: CountryStatus.review,
    } as CountryStatusTransition).toEqual(
      CountryStatuses.getAllowedTransition({
        country: getCountry(countryIso, CountryStatus.approval),
        user: getUserInfo(countryIso, RoleName.ADMINISTRATOR),
        cycle,
      })
    ))

  // accepted state
  test('Allows nothing when role is COLLABORATOR and state is accepted', () =>
    expect({} as CountryStatusTransition).toEqual(
      CountryStatuses.getAllowedTransition({
        country: getCountry(countryIso, CountryStatus.accepted),
        user: getUserInfo(countryIso, RoleName.COLLABORATOR),
        cycle,
      })
    ))

  test('Allows nothing when user is NATIONAL_CORRESPONDENT and state is accepted', () =>
    expect({} as CountryStatusTransition).toEqual(
      CountryStatuses.getAllowedTransition({
        country: getCountry(countryIso, CountryStatus.accepted),
        user: getUserInfo(countryIso, RoleName.NATIONAL_CORRESPONDENT),
        cycle,
      })
    ))

  test('Allows nothing when user is REVIEWER and state is accepted', () =>
    expect({} as CountryStatusTransition).toEqual(
      CountryStatuses.getAllowedTransition({
        country: getCountry(countryIso, CountryStatus.accepted),
        user: getUserInfo(countryIso, RoleName.REVIEWER),
        cycle,
      })
    ))

  test('Returns review as previous when user is ADMINISTRATOR and state is accepted', () =>
    expect({
      previous: CountryStatus.review,
    } as CountryStatusTransition).toEqual(
      CountryStatuses.getAllowedTransition({
        country: getCountry(countryIso, CountryStatus.accepted),
        user: getUserInfo(countryIso, RoleName.ADMINISTRATOR),
        cycle,
      })
    ))
})
