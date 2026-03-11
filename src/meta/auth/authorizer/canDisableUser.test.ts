import { Mock, vi } from 'vitest'

import { CountryIso } from 'meta/area/countryIso'
import { Global } from 'meta/area/global'
import { Cycle } from 'meta/assessment/cycle'
import { canDisableUser } from 'meta/auth/authorizer/canDisableUser'
import { RoleName } from 'meta/user/role/name'
import { User } from 'meta/user/user'
import { Users } from 'meta/user/users'

vi.mock('meta/user/users')

describe('canDisableUser', () => {
  const countryIso = 'X01' as CountryIso
  const cycle = { uuid: 'cycle-uuid' } as Cycle
  const user = { id: 1 } as User
  const target = { id: 2 } as User

  beforeEach(() => {
    vi.resetAllMocks()
    ;(Users.isAdministrator as Mock).mockReturnValue(false)
    ;(Users.isRegionalFocalPoint as Mock).mockReturnValue(false)
    ;(Users.getRole as Mock).mockReturnValue(undefined)
  })

  test('should return true when user is admin', () => {
    ;(Users.isAdministrator as Mock).mockReturnValue(true)
    expect(canDisableUser({ countryIso, cycle, user, target })).toBe(true)
  })

  test('should return true when user is admin and countryIso is missing', () => {
    ;(Users.isAdministrator as Mock).mockReturnValue(true)
    expect(canDisableUser({ cycle, user, target })).toBe(true)
  })

  test('should return false when user is not RFP', () => {
    ;(Users.isRegionalFocalPoint as Mock).mockReturnValue(false)
    ;(Users.getRole as Mock).mockReturnValue({ role: RoleName.REVIEWER })
    expect(canDisableUser({ countryIso, cycle, user, target })).toBe(false)
  })

  test('should return false when user is not admin and countryIso is missing', () => {
    ;(Users.isRegionalFocalPoint as Mock).mockReturnValue(true)
    ;(Users.getRole as Mock).mockReturnValue({ role: RoleName.REVIEWER })
    expect(canDisableUser({ cycle, user, target })).toBe(false)
  })

  test('should return false when user is not admin and countryIso is not an ISO country', () => {
    ;(Users.isRegionalFocalPoint as Mock).mockReturnValue(true)
    ;(Users.getRole as Mock).mockReturnValue({ role: RoleName.REVIEWER })
    expect(canDisableUser({ countryIso: Global.WO, cycle, user, target })).toBe(false)
  })

  test('should return true when user is RFP and target has a disableable role', () => {
    ;(Users.isRegionalFocalPoint as Mock).mockReturnValue(true)
    ;(Users.getRole as Mock).mockReturnValue({ role: RoleName.REVIEWER })
    expect(canDisableUser({ countryIso, cycle, user, target })).toBe(true)
  })
})
