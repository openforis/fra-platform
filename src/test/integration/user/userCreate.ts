import { AuthProvider, UserStatus } from 'meta/user'
import { AuthProviderLocalProps } from 'meta/user/userAuth'

import { UserController } from 'server/controller/user'

import { userMockTest, userMockTestPassword } from 'test/integration/mock/user'

import { DB } from '../../../server/db'

export default () =>
  test('Expect user to be created', async () => {
    console.log('-----------------')
    console.log(DB.$config)
    console.log('-----------------')
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
