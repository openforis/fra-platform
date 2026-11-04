import { CountryIso } from 'meta/area/countryIso'
import { Cycle } from 'meta/assessment/cycle'
import { RoleName } from 'meta/user/role/name'
import { User } from 'meta/user/user'

import { getCountryRooms } from './getCountryRooms'
import { getUserRooms } from './getUserRooms'

const countryIso = 'X01' as CountryIso
const cycle2020 = { uuid: 'cycle-2020-uuid' } as Cycle
const cycle2025 = { uuid: 'cycle-2025-uuid' } as Cycle

describe('getCountryRooms', () => {
  test('returns the country room of the cycle and the admins room', () => {
    expect(getCountryRooms({ countryIso, cycle: cycle2025 })).toEqual(['cycle-2025-uuid-X01', 'admins'])
  })

  test('user with a role in the country gets its events only for the cycle of the role', () => {
    const user = {
      id: 1,
      roles: [{ countryIso, cycleUuid: cycle2025.uuid, role: RoleName.NATIONAL_CORRESPONDENT }],
    } as User
    const userRooms = getUserRooms(user)

    const [countryRoom2025] = getCountryRooms({ countryIso, cycle: cycle2025 })
    const [countryRoom2020] = getCountryRooms({ countryIso, cycle: cycle2020 })

    expect(userRooms).toContain(countryRoom2025)
    expect(userRooms).not.toContain(countryRoom2020)
  })
})
