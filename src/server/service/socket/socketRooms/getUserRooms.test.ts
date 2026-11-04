import { RoleName } from 'meta/user/role/name'
import { User } from 'meta/user/user'

import { getUserRooms } from './getUserRooms'

const cycle2020Uuid = 'cycle-2020-uuid'
const cycle2025Uuid = 'cycle-2025-uuid'

describe('getUserRooms', () => {
  test('admin joins the user room and the admins room', () => {
    const user = { id: 1, roles: [{ role: RoleName.ADMINISTRATOR }] } as User

    expect(getUserRooms(user)).toEqual(['user-1', 'admins'])
  })

  test('user without roles joins only the user room', () => {
    const user = { id: 2, roles: [] } as User

    expect(getUserRooms(user)).toEqual(['user-2'])
  })

  test('user joins one room per role, by cycle and country', () => {
    const user = {
      id: 3,
      roles: [
        { countryIso: 'X01', cycleUuid: cycle2020Uuid, role: RoleName.NATIONAL_CORRESPONDENT },
        { countryIso: 'X01', cycleUuid: cycle2025Uuid, role: RoleName.NATIONAL_CORRESPONDENT },
        { countryIso: 'X02', cycleUuid: cycle2025Uuid, role: RoleName.VIEWER },
      ],
    } as User

    expect(getUserRooms(user)).toEqual([
      'user-3',
      `${cycle2020Uuid}-X01`,
      `${cycle2025Uuid}-X01`,
      `${cycle2025Uuid}-X02`,
    ])
  })
})
