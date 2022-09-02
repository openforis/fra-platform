import { CountryIso } from '@meta/area'

import { User } from './user'
import { RoleName } from './userRole'
import { Users } from './users'

const countryIso = 'ATL' as CountryIso

const getUserInfo = (countryIso: CountryIso, role: RoleName) => ({ id: 1, roles: [{ countryIso, role }] } as User)

describe('User allowance tests:', () => {
  test('Admins can do anything', () => {
    const res = Users.getRolesAllowedToEdit({ countryIso, user: getUserInfo(countryIso, RoleName.ADMINISTRATOR) })
    expect(res).toHaveLength(5)
  })

  test('National Corrispondent can edit', () => {
    const res = Users.getRolesAllowedToEdit({
      countryIso,
      user: getUserInfo(countryIso, RoleName.NATIONAL_CORRESPONDENT),
    })
    expect(res).toHaveLength(2)
  })
})
