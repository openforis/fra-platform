import { UserStatus } from '@core/meta/user'
import { AuthProvider } from '@core/meta/user/userAuth'
import { UserController } from '@server/controller/user'

export default () =>
  test('Expect user to be created', async () => {
    const userParams = {
      email: 'test@fra-platform.com',
      name: 'Test User',
    }

    const user = await UserController.create({
      user: userParams,
      provider: {
        provider: AuthProvider.local,
        props: {
          // password: 'test'
          password: '$2b$10$F8FvZYivtznQD.heHv7dcu8WPOY3S/astp4uHwwHFw8woz5INEj/K',
        },
      },
    })

    expect(user).toHaveProperty('id')
    expect(user.id).toBeTruthy()

    expect(user).toHaveProperty('name')
    expect(user.name).toBe(userParams.name)

    expect(user).toHaveProperty('email')
    expect(user.email).toBe(userParams.email)

    expect(user.status).toBe(UserStatus.invitationPending)
  })
