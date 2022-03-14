import { UserController } from '@server/controller/user'
import { UserStatus } from '@meta/user'
import { userMockTest } from '@test/integration/mock/user'

export default () =>
  test('Expect user to be status === inactive', async () => {
    const user = await UserController.getOne({
      user: userMockTest,
    })

    const inactiveUser = await UserController.update({
      user: {
        ...user,
        status: UserStatus.inactive,
      },
    })

    // Ids match
    expect(user).toHaveProperty('id')
    expect(inactiveUser).toHaveProperty('id')
    expect(user.id).toBe(inactiveUser.id)

    // Emails match
    expect(user).toHaveProperty('email')
    expect(user.email).toBe(userMockTest.email)
    expect(inactiveUser).toHaveProperty('email')
    expect(user.email).toBe(inactiveUser.email)

    expect(user).toHaveProperty('status')
    expect(inactiveUser).toHaveProperty('status')
    expect(inactiveUser.status).toBe(UserStatus.inactive)
  })
