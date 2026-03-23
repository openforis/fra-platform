import { Mock, vi } from 'vitest'

import { CountryIso } from 'meta/area/countryIso'
import { Cycle } from 'meta/assessment/cycle'
import { canExportUsers } from 'meta/auth/authorizer/canExportUsers'
import { User } from 'meta/user/user'
import { Users } from 'meta/user/users'

vi.mock('meta/user/users')

describe('canExportUsers', () => {
  const countryIso = 'X01' as CountryIso
  const cycle = { uuid: 'cycle-uuid' } as Cycle
  const user = { id: 1 } as User

  beforeEach(() => {
    vi.resetAllMocks()
    ;(Users.isAdministrator as Mock).mockReturnValue(false)
    ;(Users.isRegionalFocalPoint as Mock).mockReturnValue(false)
  })

  test('should return true when user is admin', () => {
    ;(Users.isAdministrator as Mock).mockReturnValue(true)
    expect(canExportUsers({ countryIso, cycle, user })).toBe(true)
  })

  test('should return true when user is regional focal point', () => {
    ;(Users.isRegionalFocalPoint as Mock).mockReturnValue(true)
    expect(canExportUsers({ countryIso, cycle, user })).toBe(true)
  })

  test('should return false when user is reviewer', () => {
    expect(canExportUsers({ countryIso, cycle, user })).toBe(false)
  })
})
