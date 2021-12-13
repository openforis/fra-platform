import { UserController } from '@server/controller/user'
import { UserStatus } from '@meta/user'

export default () =>
  test('Expect user to be status === inactive', async () => {
    const userParams = {
      email: 'test@fra-platform.com',
    }

    const user = await UserController.read({
      user: userParams,
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
    expect(user.email).toBe(userParams.email)
    expect(inactiveUser).toHaveProperty('email')
    expect(user.email).toBe(inactiveUser.email)

    expect(user).toHaveProperty('status')
    expect(inactiveUser).toHaveProperty('status')
    expect(inactiveUser.status).toBe(UserStatus.inactive)
  })
