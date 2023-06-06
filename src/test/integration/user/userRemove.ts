import { UserRepository } from 'server/repository/public/user'

import { userMockTest } from 'test/integration/mock/user'

export default () =>
  test('Expect user to be removed', async () => {
    const user = await UserRepository.getOne({
      email: userMockTest.email,
    })

    const removedUser = await UserRepository.remove({ user })

    // Ids match
    expect(user).toHaveProperty('id')
    expect(removedUser).toHaveProperty('id')
    expect(user.id).toBe(removedUser.id)

    // Emails match
    expect(user).toHaveProperty('email')
    expect(user.email).toBe(userMockTest.email)
    expect(removedUser).toHaveProperty('email')
    expect(user.email).toBe(userMockTest.email)
  })
