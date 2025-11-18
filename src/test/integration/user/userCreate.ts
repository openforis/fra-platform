import { AuthProvider, AuthProviderLocalProps } from 'meta/user/auth'
import { UserStatus } from 'meta/user/user'

import { UserController } from 'server/controller/user'

import { userMockTest, userMockTestPassword } from 'test/integration/mock/user'

export default (): void =>
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

    expect(user).toHaveProperty('email')
    expect(user.email).toBe(userMockTest.email)

    expect(user.props).toHaveProperty('name')
    expect(user.props.name).toBe(userMockTest.props.name)

    expect(user.status).toBe(UserStatus.invitationPending)
  })
