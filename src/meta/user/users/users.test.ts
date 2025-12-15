import { CountryIso } from 'meta/area/countryIso'
import { Cycle } from 'meta/assessment/cycle'
import { RoleName } from 'meta/user/role/name'
import { User } from 'meta/user/user'
import { Users } from 'meta/user/users'

const countryIso = 'ATL' as CountryIso
const cycleUuid = '123-XXX-123'

const getUserInfo = (countryIso: CountryIso, role: RoleName): User =>
  ({ id: 1, roles: [{ countryIso, role, cycleUuid }] }) as User
const cycle = { uuid: cycleUuid } as Cycle

describe('User allowance tests:', () => {
  test('Admins can do anything', () => {
    const res = Users.getRolesAllowedToEdit({
      countryIso,
      user: getUserInfo(countryIso, RoleName.ADMINISTRATOR),
      cycle,
    })
    expect(res).toHaveLength(6)
  })

  test('National Correspondent can edit', () => {
    const res = Users.getRolesAllowedToEdit({
      countryIso,
      user: getUserInfo(countryIso, RoleName.NATIONAL_CORRESPONDENT),
      cycle,
    })
    expect(res).toHaveLength(2)
  })
})
