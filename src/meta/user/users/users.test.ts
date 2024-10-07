import { CountryIso } from 'meta/area'
import { Cycle } from 'meta/assessment'

import { User } from '../user'
import { RoleName } from '../userRole'
import { Users } from '.'

const countryIso = 'ATL' as CountryIso
const cycleUuid = '123-XXX-123'

const getUserInfo = (countryIso: CountryIso, role: RoleName) =>
  ({ id: 1, roles: [{ countryIso, role, cycleUuid }] } as User)
const cycle = { uuid: cycleUuid } as Cycle

describe('User allowance tests:', () => {
  test('Admins can do anything', () => {
    const res = Users.getRolesAllowedToEdit({
      countryIso,
      user: getUserInfo(countryIso, RoleName.ADMINISTRATOR),
      cycle,
    })
    expect(res).toHaveLength(5)
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
