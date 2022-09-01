import { userMockTest } from '@test/integration/mock/user'

import { UserStatus } from '@meta/user'

import { UserController } from '@server/controller/user'

export default () =>
  test('Expect user to be status === active', async () => {
    const user = await UserController.getOne({
      email: userMockTest.email,
    })

    const activeUser = await UserController.update({
      userToUpdate: {
        ...user,
        status: UserStatus.active,
      },
    })

    // Ids match
    expect(user).toHaveProperty('id')
    expect(activeUser).toHaveProperty('id')
    expect(user.id).toBe(activeUser.id)

    // Emails match
    expect(user).toHaveProperty('email')
    expect(user.email).toBe(userMockTest.email)
    expect(activeUser).toHaveProperty('email')
    expect(user.email).toBe(activeUser.email)

    expect(user).toHaveProperty('status')
    expect(activeUser).toHaveProperty('status')
    expect(activeUser.status).toBe(UserStatus.active)
  })
