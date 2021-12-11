import { UserController } from '@server/controller/user'
import { UserStatus } from '@meta/user'

export default () =>
  test('Expect user to be status === active', async () => {
    const userParams = {
      email: 'test@fra-platform.com',
    }

    const user = await UserController.read({
      user: userParams,
    })

    const activeUser = await UserController.update({
      user: {
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
    expect(user.email).toBe(userParams.email)
    expect(activeUser).toHaveProperty('email')
    expect(user.email).toBe(activeUser.email)

    expect(user).toHaveProperty('status')
    expect(activeUser).toHaveProperty('status')
    expect(activeUser.status).toBe(UserStatus.active)
  })
