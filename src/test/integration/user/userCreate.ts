import { AuthProvider, UserStatus } from '@meta/user'
import { AuthProviderLocalProps } from '@meta/user/userAuth'

import { UserController } from '@server/controller/user'

import { userMockTest, userMockTestPassword } from '@test/integration/mock/user'

export default () =>
  test('Expect user to be created', async () => {
    const user = await UserController.create({
      user: userMockTest,
      provider: {
        provider: AuthProvider.local,
        props: {
          password: userMockTestPassword,
        } as AuthProviderLocalProps,
      },
    })

    expect(user).toHaveProperty('id')
    expect(user.id).toBeTruthy()

    expect(user).toHaveProperty('name')
    expect(user.name).toBe(userMockTest.name)

    expect(user).toHaveProperty('email')
    expect(user.email).toBe(userMockTest.email)

    expect(user.status).toBe(UserStatus.invitationPending)
  })
