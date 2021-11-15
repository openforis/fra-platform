import { UserService } from '@server/service/user'

export default () =>
  test('Expect user to be status === active', async () => {
    const userParams = {
      email: 'test@fra-platform.com',
    }

    const user = await UserService.read({
      user: userParams,
    })

    const removedUser = await UserService.remove({
      user,
    })

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
