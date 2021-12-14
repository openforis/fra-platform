import { UserController } from '@server/controller/user'
import { userMockUnknown } from '@test/integration/mock/user'

export default () =>
  test('Expect user to be removed', async () => {
    const userParams = {
      email: 'test@fra-platform.com',
    }

    const user = await UserController.read({
      user: userParams,
    })

    const removedUser = await UserController.remove({
      user,
    })

    await UserController.remove({ user: await UserController.read({ user: userMockUnknown }) })

    // Ids match
    expect(user).toHaveProperty('id')
    expect(removedUser).toHaveProperty('id')
    expect(user.id).toBe(removedUser.id)

    // Emails match
    expect(user).toHaveProperty('email')
    expect(user.email).toBe(userParams.email)
    expect(removedUser).toHaveProperty('email')
    expect(user.email).toBe(removedUser.email)
  })
